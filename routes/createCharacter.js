import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
import { requiredFields } from "../constants.js";

const router = express.Router();

const validateCharacterData = (data) => {
  const errors = [];

  // Check each required field group
  Object.entries(requiredFields).forEach(([group, fields]) => {
    if (!data[group]) {
      errors.push(`Missing required group: ${group}`);
      return;
    }

    fields.forEach((field) => {
      if (!data[group][field]) {
        errors.push(`Missing required field: ${group}.${field}`);
      }
    });
  });

  return errors;
};

/**
 * @route POST /create-character
 * @desc Create a new character
 * @access Private
 */
router.post("/create-character", protect, async (req, res) => {
  try {
    // Validate request body
    const validationErrors = validateCharacterData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
      });
    }

    // Create character with all fields from schema
    const character = new Character({
      basicInfo: req.body.basicInfo,
      abilities: req.body.abilities,
      stats: req.body.stats,
      savingThrows: req.body.savingThrows,
      skills: req.body.skills,
      deathSaves: req.body.deathSaves || { success: 0, failure: 0 },
      inventory: req.body.inventory || { gold: 0, items: [], weight: 0 },
      appearance: req.body.appearance || {},
      spellcasting: req.body.spellcasting || {},
      spellSlots: req.body.spellSlots || {},
      spellSlotsExpanded: req.body.spellSlotsExpanded || {},
      passiveWisdom: req.body.passiveWisdom,
      featuresAndTraits: req.body.featuresAndTraits || [],
      attacks: req.body.attacks || [],
      feats: req.body.feats || [],
      spells: req.body.spells || [],
      personalityTraits: req.body.personalityTraits || [],
      ideals: req.body.ideals || [],
      bonds: req.body.bonds || [],
      flaws: req.body.flaws || [],
      otherProficiencies: req.body.otherProficiencies || "",
      languages: req.body.languages || "",
      inspiration: req.body.inspiration || 0,
      characterBackstory: req.body.characterBackstory || "",
      notes: req.body.notes || "",
      userId: req.user.userId,
    });

    // Save character
    await character.save();

    // Return success response
    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error("Character creation error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the character",
      error: error.message,
    });
  }
});

export default router;
