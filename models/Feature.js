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

  // when does the feature recharge?
  // can be daily, longRest, shortRest, or longOrShortRest, other (string)
  rechargeOn: { type: String },
  customRechargeOn: { type: String },

  // how many charges are restored?
  rechargeDice: {
    typeOfDice: { type: Number },
    amountOfDice: { type: Number },
    modifier: { type: Number } // in case the amount is something like 1d4+1
  },
  rechargeAmount: { type: Number }, // in case the amount is an arbitrary number

  chargesRestored: { type: String }, // in any case, we will implement this field to help with the UI. no matter what, this is required and will always be populated. this is a string because it can be either 'all', 'dice', or 'arbitraryNumber'.

  // can be action, bonusAction, or reaction
  actionType: { type: String },
});
