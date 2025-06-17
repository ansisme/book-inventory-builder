import { Request, Response } from "express";
import {
  extractBookDetails,
  saveBookDetails,
  getAllBooks,
} from "../services/geminiAI.service";
import { BookExtractionResult } from "../models/bookExtraction.model";

const extractBookDetailsController = async (req: Request, res: Response) => {
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

    res.json(bookData);
  } catch (error) {
    console.error("Book processing error:", error);
    res.status(500).json({ error: "Failed to process book image" });
  }
};

const saveBookDetailsController = async (req: Request, res: Response) => {
  try {
    const bookDetails = req.body;
    const response: BookExtractionResult = await saveBookDetails(bookDetails);
    res
      .status(200)
      .json({ message: "Book details saved successfully", data: response });
  } catch (error: any) {
    res
      .status(400)
      .json({ error: error.message || "Failed to save book details" });
  }
};

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const bookDetails: any[] | null = await getAllBooks();
    if (!bookDetails) {
      res.status(404).json({ error: "No books found" });
      return;
    }

    res.status(200).json(bookDetails);
  } catch (error: any) {
    console.error("Error retrieving book details:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve book details" });
  }
};

export default {
  extractBookDetailsController,
  saveBookDetailsController,
  // getBookDetailsController,
  getAllBooksController,
};
