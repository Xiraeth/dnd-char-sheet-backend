import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route POST /logout
 * @desc Logout user by clearing the auth cookie
 * @access Private
 */
router.post("/logout", protect, (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
});

export default router;
