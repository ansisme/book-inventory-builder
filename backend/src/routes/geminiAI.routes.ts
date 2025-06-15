import { Router } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import geminiAIController from "../controllers/geminiAI.controller";

const router = Router();
const upload = multer();

router.post(
  "/get_book",
  upload.single("image"),
  asyncHandler(geminiAIController.geminiAI)
);

export default router;
