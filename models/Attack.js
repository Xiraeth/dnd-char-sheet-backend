import mongoose from "mongoose";
const { Schema } = mongoose;

export const attackSchema = new Schema({
  name: { type: String, required: true },
  attackRoll: {
    type: {
      modifier: { type: Number, required: true },
    },
  },
  damageRoll: {
    type: {
      numberOfDice: { type: Number, required: true },
      diceType: { type: String, required: true },
      abilityUsed: { type: String },
    },
  },
  damageType: { type: String, required: true },
  range: { type: String, required: true },
  description: { type: String },
  abilitySave: { type: String },
  areaOfEffect: { type: String },
  otherAttackRollModifier: { type: Number },
  otherDamageModifier: { type: Number },
  isProficient: { type: Boolean },
});
