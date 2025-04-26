import express from "express";
import Character from "../models/Character.js";
import { protect } from "../middleware/auth.js";
import { requiredFields } from "../constants.js";
import { validateCharacterData } from "../middleware/validateCharacterData.js";

const router = express.Router();

const checkRequiredFields = (data) => {
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
router.post(
  "/create-character",
  protect,
  validateCharacterData,
  async (req, res) => {
    try {
      // Check for required fields after type validation
      const requiredFieldErrors = checkRequiredFields(req.body);

      if (requiredFieldErrors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: requiredFieldErrors,
        });
      }

      // Create character with validated data from req.body
      const character = new Character({
        ...req.body,
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
  }
);

export default router;
