import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.delete("/:characterId/delete", protect, async (req, res) => {
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

    const deletedCharacter = await Character.findByIdAndDelete(characterId);

    res.status(200).json({
      success: true,
      message: "Character deleted successfully",
      character: deletedCharacter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting character",
    });
  }
});

export default router;
