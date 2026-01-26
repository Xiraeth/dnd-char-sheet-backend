import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
import { validateCharacterData } from "../middleware/validateCharacterData.js";
import { getRandomNumber } from "../utils/randomNumber.js";
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

router.put("/:characterId/shortRest", protect, async (req, res) => {
  try {
    let restoredHitpoints = 0;
    // Find character
    const character = await Character.findById(req.params.characterId);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    // get number of hit dice expended when short resting
    const hitDiceExpended = req.body.hitDiceExpended;

    if (hitDiceExpended && typeof hitDiceExpended !== "number") {
      return res.status(400).json({
        success: false,
        message: "Hit dice expended must be a number",
      });
    }

    if (hitDiceExpended && typeof hitDiceExpended === "number") {
      if (hitDiceExpended > character.stats.hitDice.remaining) {
        return res.status(400).json({
          success: false,
          message: "You cannot expend more hit dice than you have remaining",
        });
      }
      character.stats.hitDice.remaining -= hitDiceExpended;

      const diceType = character.stats.hitDice.diceType;
      restoredHitpoints = getRandomNumber(1, diceType) * hitDiceExpended;

      character.stats.hitPointsCurrent += restoredHitpoints;
      if (character.stats.hitPointsCurrent > character.stats.hitPointsTotal) {
        character.stats.hitPointsCurrent = character.stats.hitPointsTotal;
      }
    }

    const expendableFeatures =
      character?.featuresAndTraits?.filter((feature) => feature.isExpendable) ||
      [];

    for (const feature of expendableFeatures) {
      if (["shortrest", "longorshortrest"].includes(feature.rechargeOn?.toLowerCase()?.trim())) {
        feature.usesLeft = feature.usesTotal;
      }
    }

    await character.save();

    res.status(200).json({
      success: true,
      message: "Short rest completed",
      character,
      ...(!!restoredHitpoints && { restoredHitpoints }),
    });
  } catch (error) {
    console.error("Character short rest error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while short resting the character",
      error: error.message,
    });
  }
});

router.post("/:characterId/longRest", protect, async (req, res) => {
  try {
    // Find character
    const character = await Character.findById(req.params.characterId);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    const expendableFeatures =
      character?.featuresAndTraits?.filter((feature) => feature.isExpendable) ||
      [];

    for (const feature of expendableFeatures) {
      if (["longrest", "longorshortrest"].includes(feature.rechargeOn?.toLowerCase()?.trim())) {
        feature.usesLeft = feature.usesTotal;
      }
    }

    const spellSlots = character.spellSlots;
    const newSpellSlots = Object.values(spellSlots).reduce(
      (acc, cur, index) => {
        acc[`level${index + 1}`] = {
          current: cur.total,
          total: cur.total,
        };
        return acc;
      },
      {}
    );

    character.spellSlots = newSpellSlots;
    character.stats.hitPointsCurrent = character.stats.hitPointsTotal;
    character.stats.hitPointsTemp = 0;
    character.stats.hitDice.remaining = character.stats.hitDice.total;

    await character.save();

    res.status(200).json({
      success: true,
      message: "Long rest completed",
      character,
    });
  } catch (error) {
    console.error("Character short rest error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while short resting the character",
      error: error.message,
    });
  }
});

export default router;
