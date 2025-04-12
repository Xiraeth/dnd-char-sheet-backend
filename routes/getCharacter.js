import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:characterId", protect, async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findById(characterId);

    const userIdFromCharacter = character.userId.toString();

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }
    if (userIdFromCharacter !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this character",
      });
    }
    res.status(200).json({
      success: true,
      character: character.toJSON({ virtuals: true }),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching character",
    });
  }
});

export default router;
