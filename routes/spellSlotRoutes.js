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
    const customAmount = req?.query?.customAmount ? +req?.query?.customAmount : undefined;

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

    if (customAmount && customAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Custom amount cannot be less than or equal to 0",
      });
    }

    const spellSlotLevel = req.body.spellSlotLevel;

    const spellSlot = character.spellSlots[`level${spellSlotLevel}`];

    // Check if the feature has uses left
    if (spellSlot.current <= 0) {
      return res.status(400).json({
        success: false,
        message: "This level of spell slot is already at 0",
      });
    }

    if (customAmount && customAmount > spellSlot.current) {
      return res.status(400).json({
        success: false,
        message: "Custom amount cannot be greater than the spell slot's current amount",
      });
    }

    // Reduce the current spell slot by the custom amount or 1
    spellSlot.current -= customAmount || 1;

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
    const customAmount = req?.query?.customAmount ? +req?.query?.customAmount : undefined;

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

    if (customAmount && customAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Custom amount cannot be less than or equal to 0",
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

    if (customAmount && customAmount > spellSlot.total) {
      return res.status(400).json({
        success: false,
        message: "Custom amount cannot exceed the spell slot's total slots",
      });
    }

    if (customAmount && customAmount > spellSlot.total - spellSlot.current) {
      return res.status(400).json({
        success: false,
        message: "Custom amount cannot exceed the spell slot's missing slots",
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
    spellSlot.current += customAmount || 1;

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
