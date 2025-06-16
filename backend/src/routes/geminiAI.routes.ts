import { Router } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import geminiAIController from "../controllers/geminiAI.controller";
import saveBookDetailsController from "../controllers/geminiAI.controller";
const router = Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer();
router.post(
  "/extract_book",
  upload.single("file"),
  asyncHandler(geminiAIController.extractBookDetailsController)
);

router.post(
  "/save_book_details",
  asyncHandler(geminiAIController.saveBookDetailsController)
);

export default router;
