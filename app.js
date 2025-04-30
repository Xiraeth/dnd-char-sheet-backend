import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";
import logoutRoute from "./routes/logout.js";
import createCharacterRoute from "./routes/createCharacter.js";
import getUserCharactersRoute from "./routes/getUserCharacters.js";
import getCharacterRoute from "./routes/getCharacter.js";
import deleteCharacterRoute from "./routes/deleteCharacter.js";
import updateCharacterRoute from "./routes/updateCharacter.js";
import expendFeatureRoute from "./routes/expendFeature.js";
import cookieParser from "cookie-parser";

import Character from "./models/Character.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.ALLOWED_ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/", loginRoute);
app.use("/", signupRoute);
app.use("/", logoutRoute);
app.use("/", createCharacterRoute);
app.use("/", getUserCharactersRoute);
app.use("/", deleteCharacterRoute);
app.use("/", getCharacterRoute);
app.use("/", updateCharacterRoute);
app.use("/", expendFeatureRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(
    process.env.NODE_ENV === "production"
      ? `Production server is running`
      : `Development server is running on port ${PORT}`
  );
});
