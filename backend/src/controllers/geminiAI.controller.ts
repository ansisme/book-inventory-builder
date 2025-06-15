import { Request, Response } from "express";
import { extractBookDetails } from "../services/geminiAI.service";
import { BookExtractionResult } from "../models/bookExtraction.model";

const geminiAI = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }

    const { buffer, mimetype } = req.file;
    const bookData: BookExtractionResult = await extractBookDetails(
      buffer,
      mimetype
    );

    // Basic validation
    if (!bookData.title) {
      res.status(400).json({ error: "Could not determine book title" });
      return;
    }

    res.json(bookData);
  } catch (error) {
    console.error("Book processing error:", error);
    res.status(500).json({ error: "Failed to process book image" });
  }
};

export default {
  geminiAI,
};
