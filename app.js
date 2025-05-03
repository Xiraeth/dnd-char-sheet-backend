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
import featureRoutes from "./routes/featureRoutes.js";
import spellSlotRoutes from "./routes/spellSlotRoutes.js";
import cookieParser from "cookie-parser";

import Character from "./models/Character.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Function to determine allowed origins based on environment
const allowedOrigins = () => {
  const origins = [];

  // Always allow backend calls from localhost development
  origins.push("http://localhost:3000");

  // Add production origin if available
  if (process.env.PRODUCTION_CLIENT_URL) {
    origins.push(process.env.PRODUCTION_CLIENT_URL);
  }

  return origins;
};

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      const origins = allowedOrigins();

      if (
        origins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/", featureRoutes);
app.use("/", spellSlotRoutes);
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
