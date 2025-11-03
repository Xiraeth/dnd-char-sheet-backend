import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route GET /user
 * @desc Get current user information (if they are logged in)
 * @access Private
 */
router.get("/user", protect, async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    // Find user by ID
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user information
    res.status(200).json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user",
      error: error.message,
    });
  }
});

/**
 * @route GET /userEcho
 * @desc Get current user status (if they are logged in)
 * @access Private
 */
router.get("/userEcho", protect, async (req, res) => {
  try {
    // check if the user is logged in
    if (!req.user.userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    // Return the characters
    res.status(200).json({
      success: true,
      message: "You are logged in",
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user status",
      error: error.message,
    });
  }
});

export default router;
