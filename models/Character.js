import mongoose from "mongoose";
const { Schema } = mongoose;

import { spellSchema } from "./Spell.js";
import { attackSchema } from "./Attack.js";
import { featSchema } from "./Feat.js";
import { featureSchema } from "./Feature.js";

// Define the Item schema for inventory items
const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const characterSchema = new Schema(
  {
    basicInfo: {
      name: { type: String, required: true },
      race: { type: String, required: true },
      class: { type: String, required: true },
      level: { type: Number, required: true },
      alignment: { type: String, required: true },
      background: { type: String, required: true },
      playerName: { type: String, required: true },
    },
    abilities: {
      strength: { type: Number, required: true },
      dexterity: { type: Number, required: true },
      constitution: { type: Number, required: true },
      intelligence: { type: Number, required: true },
      wisdom: { type: Number, required: true },
      charisma: { type: Number, required: true },
    },
    stats: {
      initiative: { type: Number, required: true },
      speed: { type: Number, required: true },
      armorClass: { type: Number, required: true },
      hitPointsCurrent: { type: Number, required: true },
      hitPointsTotal: { type: Number, required: true },
      hitPointsTemp: { type: Number },
      hitDice: {
        remaining: { type: Number, required: true },
        diceType: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    },
    savingThrows: {
      strength: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
      dexterity: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
      constitution: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
      intelligence: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
      wisdom: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
      charisma: {
        value: { type: Number, required: true },
        hasProficiency: { type: Boolean, required: true, default: false },
      },
    },
    skills: {
      acrobatics: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "dexterity" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      animalHandling: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "wisdom" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      arcana: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "intelligence" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      athletics: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "strength" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      deception: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "charisma" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      history: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "intelligence" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      insight: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "wisdom" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      intimidation: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "charisma" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      investigation: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "intelligence" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      medicine: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "wisdom" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      nature: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "intelligence" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      perception: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "wisdom" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      performance: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "charisma" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      persuasion: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "charisma" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      religion: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "intelligence" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      sleightOfHand: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "dexterity" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      stealth: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "dexterity" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
      survival: {
        value: { type: Number, required: true },
        ability: { type: String, required: true, default: "wisdom" },
        hasProficiency: { type: Boolean, required: true, default: false },
        hasExpertise: { type: Boolean, required: true, default: false },
        otherModifier: { type: Number, default: 0 },
      },
    },
    deathSaves: {
      success: { type: Number },
      failure: { type: Number },
    },
    inventory: {
      gold: { type: Number },
      items: { type: [itemSchema] },
      weight: { type: Number },
    },
    appearance: {
      age: { type: String },
      height: { type: String },
      weight: { type: String },
      eyes: { type: String },
      hair: { type: String },
      skin: { type: String },
      photo: { type: String },
    },
    spellcasting: {
      spellcastingClass: { type: String },
      spellcastingAbility: { type: String },
      spellSaveDC: { type: Number },
      spellAttackBonus: { type: Number },
    },
    spellSlots: {
      level1: { type: Number },
      level2: { type: Number },
      level3: { type: Number },
      level4: { type: Number },
      level5: { type: Number },
      level6: { type: Number },
      level7: { type: Number },
      level8: { type: Number },
      level9: { type: Number },
    },
    spellSlotsExpanded: {
      level1: { type: Number },
      level2: { type: Number },
      level3: { type: Number },
      level4: { type: Number },
      level5: { type: Number },
      level6: { type: Number },
      level7: { type: Number },
      level8: { type: Number },
      level9: { type: Number },
    },
    passiveWisdom: { type: Number },
    featuresAndTraits: { type: [featureSchema], default: [] },
    attacks: { type: [attackSchema], default: [] },
    feats: { type: [featSchema], default: [] },
    spells: { type: [spellSchema], default: [] },
    personalityTraits: { type: String, default: "" },
    ideals: { type: String, default: "" },
    bonds: { type: String, default: "" },
    flaws: { type: String, default: "" },
    otherProficiencies: { type: String, default: "" },
    languages: { type: String, default: "" },
    inspiration: { type: Number },
    characterBackstory: { type: String },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

characterSchema.virtual("proficiencyBonus", function () {
  return Math.ceil(this.level / 4) + 1;
});

characterSchema.pre("save", async function (next) {
  this.updatedAt = new Date();
  next();
});

const Character = mongoose.model("Character", characterSchema);

export default Character;
