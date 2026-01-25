import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route PUT /:characterId/gainItem/:itemId
 * @desc Obtain an item - increase its numberLeft by the custom gain amount or 1
 * @access Private
 * @queryParam {number} gainAmount - The amount of the item to gain
 */
router.put(
  "/:characterId/gainItem/:itemId",
  protect,
  async (req, res) => {
    try {
      const gainAmount = req?.query?.gainAmount ? +req?.query?.gainAmount : undefined;

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
      const itemIndex = character.inventory.items.findIndex(
        (item) => item._id.toString() === req.params.itemId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      const item = character.inventory.items[itemIndex];

      // Check if the item is consumable
      if (!item.isConsumable) {
        return res.status(400).json({
          success: false,
          message: "This item is not consumable",
        });
      }

      if (gainAmount && gainAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Custom gain amount cannot be less than or equal to 0",
        });
      }

      // Increase usesLeft by the custom charge amount or 1
      character.inventory.items[itemIndex].amount += gainAmount || 1;

      // Save character
      await character.save();

      // Return success response
      res.status(200).json({
        success: true,
        item: character.inventory.items[itemIndex],
        character,
      });
    } catch (error) {
      console.error("Item gain error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while gaining the item",
        error: error.message,
      });
    }
  }
);

/**
 * @route PUT /:characterId/gainItem/:itemId
 * @desc Use an item - decrease its amount by the amountToUse amount
 * @access Private
 * @queryParam {number} amountToUse - The amount of the item to use
 */
router.put(
  "/:characterId/useItem/:itemId",
  protect,
  async (req, res) => {
    try {
      const amountToUse = req?.query?.amountToUse ? +req?.query?.amountToUse : undefined;

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
      const itemIndex = character.inventory.items.findIndex(
        (item) => item._id.toString() === req.params.itemId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      const item = character.inventory.items[itemIndex];

      // Check if the item is consumable
      if (!item.isConsumable) {
        return res.status(400).json({
          success: false,
          message: "This item is not consumable",
        });
      }

      // Check if the feature has uses left
      if (item.amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Item amount is already at 0",
        });
      }

      if (amountToUse && amountToUse > item.amount) {
        return res.status(400).json({
          success: false,
          message: "Amount to use cannot be greater than the item's remaining count",
        });
      }


      // Decrease amount by the amountToUse amount or 1
      character.inventory.items[itemIndex].amount -= amountToUse || 1;

      // Save character
      await character.save();

      // Return success response
      res.status(200).json({
        success: true,
        item: character.inventory.items[itemIndex],
        character,
      });
    } catch (error) {
      console.error("Item use error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while using the item",
        error: error.message,
      });
    }
  }
);

export default router;