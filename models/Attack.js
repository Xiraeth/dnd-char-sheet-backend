import mongoose from "mongoose";
const { Schema } = mongoose;

export const attackSchema = new Schema({
  name: { type: String, required: true },
  attackRoll: { type: String },
  damageRoll: { type: String },
  damageType: { type: String },
  range: { type: String },
  description: { type: String },
  abilitySave: { type: String },
  areaOfEffect: { type: String },
});
