import mongoose from "mongoose";
const { Schema } = mongoose;

export const featureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String },
});
