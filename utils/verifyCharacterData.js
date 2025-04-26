/**
 * Verifies that character data has the correct types before API submission
 * @param {Object} data - The character data to verify
 * @returns {Object} - Object containing validation result and any errors
 */
export const verifyCharacterData = (data) => {
  const errors = [];
  const validatedData = { ...data };

  // Helper function to check if a value is a valid number
  const isValidNumber = (value) => {
    return typeof value === "number" && !isNaN(value);
  };

  // Helper function to check if a value is a valid string
  const isValidString = (value) => {
    return typeof value === "string";
  };

  // Helper function to check if a value is a valid boolean
  const isValidBoolean = (value) => {
    return typeof value === "boolean";
  };

  // Helper function to convert string to number if needed
  const convertToNumber = (value) => {
    if (typeof value === "string" && !isNaN(Number(value))) {
      return Number(value);
    }
    return value;
  };

  // Helper function to convert number to string if needed
  const convertToString = (value) => {
    if (typeof value === "number") {
      return String(value);
    }
    return value;
  };

  // Check basicInfo fields
  if (data.basicInfo) {
    // Convert level to number if it's a string
    if (data.basicInfo.level) {
      validatedData.basicInfo.level = convertToNumber(data.basicInfo.level);
      if (!isValidNumber(validatedData.basicInfo.level)) {
        errors.push("Level must be a number");
      }
    }

    // Ensure other basicInfo fields are strings
    ["name", "race", "class", "alignment", "background", "playerName"].forEach(
      (field) => {
        if (data.basicInfo[field]) {
          if (!isValidString(data.basicInfo[field])) {
            errors.push(`${field} must be a string`);
          }
        }
      }
    );
  }

  // Check abilities (all should be numbers)
  if (data.abilities) {
    [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ].forEach((ability) => {
      if (data.abilities[ability]) {
        validatedData.abilities[ability] = convertToNumber(
          data.abilities[ability]
        );
        if (!isValidNumber(validatedData.abilities[ability])) {
          errors.push(`${ability} must be a number`);
        }
      }
    });
  }

  // Check stats (all should be numbers)
  if (data.stats) {
    [
      "initiative",
      "speed",
      "armorClass",
      "hitPointsCurrent",
      "hitPointsTotal",
      "hitPointsTemp",
    ].forEach((stat) => {
      if (data.stats[stat]) {
        validatedData.stats[stat] = convertToNumber(data.stats[stat]);
        if (!isValidNumber(validatedData.stats[stat])) {
          errors.push(`${stat} must be a number`);
        }
      }
    });

    // Check hitDice
    if (data.stats.hitDice) {
      ["remaining", "diceType", "total"].forEach((hitDiceField) => {
        if (data.stats.hitDice[hitDiceField]) {
          validatedData.stats.hitDice[hitDiceField] = convertToNumber(
            data.stats.hitDice[hitDiceField]
          );
          if (!isValidNumber(validatedData.stats.hitDice[hitDiceField])) {
            errors.push(`${hitDiceField} must be a number`);
          }
        }
      });
    }
  }

  // Check savingThrows
  if (data.savingThrows) {
    [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ].forEach((ability) => {
      if (data.savingThrows[ability]) {
        // Check value
        if (data.savingThrows[ability].value) {
          validatedData.savingThrows[ability].value = convertToNumber(
            data.savingThrows[ability].value
          );
          if (!isValidNumber(validatedData.savingThrows[ability].value)) {
            errors.push(`${ability} must be a number`);
          }
        }

        // Check hasProficiency
        if (data.savingThrows[ability].hasProficiency) {
          if (!isValidBoolean(data.savingThrows[ability].hasProficiency)) {
            errors.push(
              `savingThrows.${ability}.hasProficiency must be a boolean`
            );
          }
        }
      }
    });
  }

  // Check skills
  if (data.skills) {
    const skillNames = [
      "acrobatics",
      "animalHandling",
      "arcana",
      "athletics",
      "deception",
      "history",
      "insight",
      "intimidation",
      "investigation",
      "medicine",
      "nature",
      "perception",
      "performance",
      "persuasion",
      "religion",
      "sleightOfHand",
      "stealth",
      "survival",
    ];

    skillNames.forEach((skill) => {
      if (data.skills[skill]) {
        // Check value
        if (data.skills[skill].value) {
          validatedData.skills[skill].value = convertToNumber(
            data.skills[skill].value
          );
          if (!isValidNumber(validatedData.skills[skill].value)) {
            errors.push(`${skill} must be a number`);
          }
        }

        // Check ability
        if (data.skills[skill].ability) {
          if (!isValidString(data.skills[skill].ability)) {
            errors.push(`skills.${skill}.ability must be a string`);
          }
        }

        // Check hasProficiency
        if (data.skills[skill].hasProficiency) {
          if (!isValidBoolean(data.skills[skill].hasProficiency)) {
            errors.push(`skills.${skill}.hasProficiency must be a boolean`);
          }
        }

        // Check hasExpertise
        if (data.skills[skill].hasExpertise) {
          if (!isValidBoolean(data.skills[skill].hasExpertise)) {
            errors.push(`skills.${skill}.hasExpertise must be a boolean`);
          }
        }
      }
    });
  }

  // Check deathSaves
  if (data.deathSaves) {
    ["success", "failure"].forEach((save) => {
      if (data.deathSaves[save]) {
        validatedData.deathSaves[save] = convertToNumber(data.deathSaves[save]);
        if (!isValidNumber(validatedData.deathSaves[save])) {
          errors.push(`${save} must be a number`);
        }
      }
    });
  }

  // Check inventory
  if (data.inventory) {
    ["gold", "weight"].forEach((field) => {
      if (data.inventory[field]) {
        validatedData.inventory[field] = convertToNumber(data.inventory[field]);
        if (!isValidNumber(validatedData.inventory[field])) {
          errors.push(`${field} must be a number`);
        }
      }
    });
  }

  // Check appearance (all should be strings)
  if (data.appearance) {
    ["age", "height", "weight", "eyes", "hair", "skin", "photo"].forEach(
      (field) => {
        if (data.appearance[field]) {
          validatedData.appearance[field] = convertToString(
            data.appearance[field]
          );
          if (!isValidString(validatedData.appearance[field])) {
            errors.push(`${field} must be a string`);
          }
        }
      }
    );
  }

  // Check spellcasting
  if (data.spellcasting) {
    ["spellcastingClass", "spellcastingAbility"].forEach((field) => {
      if (data.spellcasting[field]) {
        if (!isValidString(data.spellcasting[field])) {
          errors.push(`${field} must be a string`);
        }
      }
    });

    ["spellSaveDC", "spellAttackBonus"].forEach((field) => {
      if (data.spellcasting[field]) {
        validatedData.spellcasting[field] = convertToNumber(
          data.spellcasting[field]
        );
        if (!isValidNumber(validatedData.spellcasting[field])) {
          errors.push(`${field} must be a number`);
        }
      }
    });
  }

  // Check spellSlots and spellSlotsExpanded
  ["spellSlots", "spellSlotsExpanded"].forEach((slotType) => {
    if (data[slotType]) {
      for (let i = 1; i <= 9; i++) {
        const field = `level${i}`;
        if (data[slotType][field]) {
          validatedData[slotType][field] = convertToNumber(
            data[slotType][field]
          );
          if (!isValidNumber(validatedData[slotType][field])) {
            errors.push(`${slotType}.${field} must be a number`);
          }
        }
      }
    }
  });

  // Check other numeric fields
  if (data.passiveWisdom) {
    validatedData.passiveWisdom = convertToNumber(data.passiveWisdom);
    if (!isValidNumber(validatedData.passiveWisdom)) {
      errors.push("passiveWisdom must be a number");
    }
  }

  if (data.inspiration) {
    validatedData.inspiration = convertToNumber(data.inspiration);
    if (!isValidNumber(validatedData.inspiration)) {
      errors.push("inspiration must be a number");
    }
  }

  // Check string fields
  ["otherProficiencies", "languages", "characterBackstory", "notes"].forEach(
    (field) => {
      if (data[field]) {
        if (!isValidString(data[field])) {
          errors.push(`${field} must be a string`);
        }
      }
    }
  );

  // Check array fields
  ["personalityTraits", "ideals", "bonds", "flaws"].forEach((field) => {
    if (data[field]) {
      if (!isValidString(data[field])) {
        errors.push(`${field} must be a string`);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    validatedData,
  };
};
