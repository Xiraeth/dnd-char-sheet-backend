import mongoose from "mongoose";
const { Schema } = mongoose;

export const attackSchema = new Schema({
  name: { type: String, required: true },
  atkBonus: { type: Number, required: true },
  damage: { type: String, required: true },
  type: { type: String, required: true },
  range: { type: String, required: true },
  reach: { type: String, required: true },
  description: { type: String },
});
