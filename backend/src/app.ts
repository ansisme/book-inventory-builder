import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
// import bookRoutes from "./routes/bookRoutes";
// import { extractBookDetails } from "./controllers/aiController";
const createApp = async () => {
  const app = express();
  const upload = multer();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Database connection
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  // // Routes
  // app.use("/api/books", bookRoutes);
  // app.post("/api/extract", upload.single("image"), extractBookDetails);

  // Error handling middleware
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
    }
  );
  return app;
};

export default createApp;
