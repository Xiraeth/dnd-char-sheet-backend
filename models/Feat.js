import mongoose from "mongoose";
const { Schema } = mongoose;

export const featSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
