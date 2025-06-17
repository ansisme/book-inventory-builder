import { Router } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import geminiAIController from "../controllers/geminiAI.controller";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/extract_book",
  upload.single("file"),
  asyncHandler(geminiAIController.extractBookDetailsController)
);

router.post(
  "/save_book_details",
  asyncHandler(geminiAIController.saveBookDetailsController)
);

router.get(
  "/get_all_books",
  asyncHandler(geminiAIController.getAllBooksController)
);

export default router;
