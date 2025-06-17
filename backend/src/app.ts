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
  // app.use(
  //   fileUpload({
  //     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  //     abortOnLimit: true,
  //     responseOnLimit: "File size exceeds the 5MB limit",
  //     useTempFiles: true, // Uses temporary files instead of memory
  //     tempFileDir: "/tmp/", // Optional temp directory
  //   })
  // );
  // Database connection
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  app.use("/user", bookRoutes);
  // app.use(
  //   (
  //     err: any,
  //     req: express.Request,
  //     res: express.Response,
  //     next: express.NextFunction
  //   ) => {
  //     console.error(err.stack);
  //     res.status(500).json({ error: "Something went wrong!" });
  //   }
  // );
  return app;
};

export default createApp;
