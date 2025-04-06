import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  characters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Character",
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
