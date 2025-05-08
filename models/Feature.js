import mongoose from "mongoose";
const { Schema } = mongoose;

export const featureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String },
  isExpendable: { type: Boolean },
  usesTotal: { type: Number },
  usesLeft: { type: Number },
  areUsesTotalEqualToProfBonus: { type: Boolean },

  // can be daily, longRest, shortRest, or longOrShortRest
  rechargeOn: { type: String },

  // can be action, bonusAction, or reaction
  actionType: { type: String },
});
