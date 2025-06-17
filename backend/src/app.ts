import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import bookRoutes from "./routes/geminiAI.routes";
import dotenv from "dotenv";
dotenv.config();
const createApp = async () => {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Database connection
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  app.use("/user", bookRoutes);

  return app;
};

export default createApp;
