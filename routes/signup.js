import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const doesUserExist = await User.findOne({ username });

  if (doesUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPassword });

  res.status(201).json(user);
});

export default router;
