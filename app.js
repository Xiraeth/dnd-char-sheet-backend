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
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dnd-char-sheet-backend-production.up.railway.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
  console.log(`Server is running on port ${PORT}`);
});
