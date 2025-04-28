import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route POST /login
 * @desc Login a user and return a JWT token
 * @access Public
 */
router.post("/login", async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    console.log("Login attempt:", req.body);
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      console.log("Missing username or password");
      return res.status(400).json({
        success: false,
        message: "Please provide both username and password",
      });
    }

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password for user:", username);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Log response headers
    console.log("Response headers:", res.getHeaders());

    // Return success response with token
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
});

export default router;
