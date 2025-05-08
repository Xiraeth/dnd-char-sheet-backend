import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

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
