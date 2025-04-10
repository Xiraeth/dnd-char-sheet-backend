import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route GET /:userId/characters
 * @desc Get all characters for a specific user
 * @access Private
 */
router.get("/:userId/characters", protect, async (req, res) => {
  try {
    console.log(req.params);
    // Check if the requested user ID matches the authenticated user
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access these characters",
      });
    }

    // Find all characters for the user
    const characters = await Character.find({ userId: req.params.userId });

    // Return the characters
    res.status(200).json({
      success: true,
      count: characters.length,
      data: characters,
    });
  } catch (error) {
    console.error("Error fetching user characters:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching characters",
      error: error.message,
    });
  }
});

export default router;
