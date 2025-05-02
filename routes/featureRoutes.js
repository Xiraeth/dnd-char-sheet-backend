import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

/**
 * @route PUT /:characterId/expendFeature/:featureId
 * @desc Expend a feature by reducing its usesLeft by 1
 * @access Private
 */
router.put(
  "/:characterId/expendFeature/:featureId",
  protect,
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

      // Check if user is authorized to modify this character
      const userIdFromCharacter = character.userId.toString();

      if (userIdFromCharacter !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to modify this character",
        });
      }

      // Find the feature in the character's featuresAndTraits array
      const featureIndex = character.featuresAndTraits.findIndex(
        (feature) => feature._id.toString() === req.params.featureId
      );

      if (featureIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Feature not found",
        });
      }

      const feature = character.featuresAndTraits[featureIndex];

      // Check if the feature is expendable
      if (!feature.isExpendable) {
        return res.status(400).json({
          success: false,
          message: "This feature is not expendable",
        });
      }

      // Check if the feature has uses left
      if (feature.usesLeft <= 0) {
        return res.status(400).json({
          success: false,
          message: "No uses left for this feature",
        });
      }

      // Reduce usesLeft by 1
      character.featuresAndTraits[featureIndex].usesLeft -= 1;

      // Save character
      await character.save();

      // Return success response
      res.status(200).json({
        success: true,
        feature: character.featuresAndTraits[featureIndex],
        character,
      });
    } catch (error) {
      console.error("Feature expend error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while expending the feature",
        error: error.message,
      });
    }
  }
);

/**
 * @route PUT /:characterId/gainFeature/:featureId
 * @desc Gain a single use of a feature by increasing its usesLeft by 1
 * @access Private
 */
router.put(
  "/:characterId/gainFeature/:featureId",
  protect,
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

      // Check if user is authorized to modify this character
      const userIdFromCharacter = character.userId.toString();

      if (userIdFromCharacter !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to modify this character",
        });
      }

      // Find the feature in the character's featuresAndTraits array
      const featureIndex = character.featuresAndTraits.findIndex(
        (feature) => feature._id.toString() === req.params.featureId
      );

      if (featureIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Feature not found",
        });
      }

      const feature = character.featuresAndTraits[featureIndex];

      // Check if the feature is expendable
      if (!feature.isExpendable) {
        return res.status(400).json({
          success: false,
          message: "This feature is not expendable",
        });
      }

      // Check if the feature has uses left
      if (feature.usesLeft >= feature.usesTotal) {
        return res.status(400).json({
          success: false,
          message: "Feature is already at max uses",
        });
      }

      // Increase usesLeft by 1
      character.featuresAndTraits[featureIndex].usesLeft += 1;

      // Save character
      await character.save();

      // Return success response
      res.status(200).json({
        success: true,
        feature: character.featuresAndTraits[featureIndex],
        character,
      });
    } catch (error) {
      console.error("Feature restore error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while restoring the feature",
        error: error.message,
      });
    }
  }
);

export default router;
