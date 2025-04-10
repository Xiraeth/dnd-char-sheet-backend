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
      if (data[group][field] === undefined) {
        errors.push(`Missing required field: ${group}.${field}`);
      }
    });
  });

  return errors;
};

/**
 * @route PUT /update-character/:id
 * @desc Update a character
 * @access Private
 */
router.put("/update-character/:id", protect, async (req, res) => {
  try {
    // Validate request body
    const validationErrors = validateCharacterData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
      });
    }

    // Find and update character
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    // Update character with all fields from schema
    character.basicInfo = req.body.basicInfo;
    character.abilities = req.body.abilities;
    character.stats = req.body.stats;
    character.savingThrows = req.body.savingThrows;
    character.skills = req.body.skills;
    character.deathSaves = req.body.deathSaves || { success: 0, failure: 0 };
    character.inventory = req.body.inventory || {
      gold: 0,
      items: [],
      weight: 0,
    };
    character.appearance = req.body.appearance || {};
    character.spellcasting = req.body.spellcasting || {};
    character.spellSlots = req.body.spellSlots || {};
    character.spellSlotsExpanded = req.body.spellSlotsExpanded || {};
    character.passiveWisdom = req.body.passiveWisdom;
    character.featuresAndTraits = req.body.featuresAndTraits || [];
    character.attacks = req.body.attacks || [];
    character.feats = req.body.feats || [];
    character.spells = req.body.spells || [];
    character.personalityTraits = req.body.personalityTraits || [];
    character.ideals = req.body.ideals || [];
    character.bonds = req.body.bonds || [];
    character.flaws = req.body.flaws || [];
    character.otherProficienciesAndLanguages =
      req.body.otherProficienciesAndLanguages || [];
    character.inspiration = req.body.inspiration || 0;
    character.characterBackstory = req.body.characterBackstory || "";
    character.notes = req.body.notes || "";

    // Save character
    await character.save();

    // Return success response
    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error("Character update error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the character",
      error: error.message,
    });
  }
});

export default router;
