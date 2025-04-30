import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
import { validateCharacterData } from "../middleware/validateCharacterData.js";
const router = express.Router();

/**
 * @route PUT /:characterId/update
 * @desc Update a character
 * @access Private
 */
router.put(
  "/:characterId/update",
  protect,
  validateCharacterData,
  async (req, res) => {
    try {
      // Find character
      const character = await Character.findById(req.params.characterId);

      if (!character) {
        return res.status(404).json({
          success: false,
          message: "Character not found",
        });
      }

      // Update character with validated data from req.body
      // The validateCharacterData middleware has already validated and converted types
      Object.assign(character, req.body);

      // Save character
      await character.save();

      // Return success response
      res.status(200).json({
        success: true,
        character,
      });
    } catch (error) {
      console.error("Character update error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the character",
        error: error.message,
      });
    }
  }
);

export default router;
