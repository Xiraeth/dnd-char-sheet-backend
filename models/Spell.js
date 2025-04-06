import mongoose from "mongoose";
const { Schema } = mongoose;

export const spellSchema = new Schema({
  source: { type: String },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  components: {
    verbal: { type: Boolean, required: true },
    somatic: { type: Boolean, required: true },
    material: { type: [String] },
  },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  descriptionAtHigherLevels: { type: String },
});
