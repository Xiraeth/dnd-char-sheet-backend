import mongoose from "mongoose";
const { Schema } = mongoose;

export const spellSchema = new Schema({
  source: { type: String },
  name: { type: String, required: true },
  level: { type: String, required: true },
  school: {
    name: { type: String },
    desc: { type: String },
  },
  casting_time: { type: String, required: true },
  actionType: { type: String },
  range: { type: String, required: true },
  components: { type: [String], required: true },
  duration: { type: String, required: true },
  desc: { type: String, required: true },
  higher_level: { type: [String], default: [] },
  healing_at_slot_level: [
    {
      healing: { type: String },
      level: { type: String },
    },
  ],
  damage: {
    damage_type: {
      name: { type: String },
    },
    damage_at_character_level: [
      {
        damage: { type: String },
        level: { type: String },
      },
    ],
  },
});
