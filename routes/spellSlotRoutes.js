import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

/**
 * @route PUT /:characterId/expendSpellSlot
 * @desc Expend a spell slot by reducing its current by 1
 * @access Private
 */
router.put("/:characterId/expendSpellSlot", protect, async (req, res) => {
  try {
    // Find character
    const character = await Character.findById(req.params.characterId);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    // Check if user is authorized to modify this character
    const userIdFromCharacter = character.userId.toString();

    if (userIdFromCharacter !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this character",
      });
    }

    const spellSlotLevel = req.body.spellSlotLevel;

    const spellSlot = character.spellSlots[`level${spellSlotLevel}`];

    // Check if the feature has uses left
    if (spellSlot.current <= 0) {
      return res.status(400).json({
        success: false,
        message: "This level of spell slot is already at 0  ",
      });
    }

    // Reduce the current spell slot by 1
    spellSlot.current -= 1;

    // Save the character
    await character.save();

    // Return success response
    res.status(200).json({
      success: true,
      spellSlot,
      character,
    });
  } catch (error) {
    console.error("Spell slot expend error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while expending the spell slot",
      error: error.message,
    });
  }
});

/**
 * @route PUT /:characterId/gainSpellSlot
 * @desc Gain a spell slot by increasing its current by 1
 * @access Private
 */
router.put("/:characterId/gainSpellSlot", protect, async (req, res) => {
  try {
    // Find character
    const character = await Character.findById(req.params.characterId);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    // Check if user is authorized to modify this character
    const userIdFromCharacter = character.userId.toString();

    if (userIdFromCharacter !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this character",
      });
    }

    const spellSlotLevel = req.body.spellSlotLevel;

    const spellSlot = character.spellSlots[`level${spellSlotLevel}`];

    if (!spellSlot) {
      return res.status(404).json({
        success: false,
        message: "Spell slot not found",
      });
    }

    // Check if the feature has uses left
    if (spellSlot.current >= spellSlot.total) {
      return res.status(400).json({
        success: false,
        message: "You cannot gain more spell slots for this level",
      });
    }

    // Increase usesLeft by 1
    spellSlot.current += 1;

    // Save character
    await character.save();

    // Return success response
    res.status(200).json({
      success: true,
      spellSlot,
      character,
    });
  } catch (error) {
    console.error("Spell slot restore error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while restoring the spell slot",
      error: error.message,
    });
  }
});

export default router;
