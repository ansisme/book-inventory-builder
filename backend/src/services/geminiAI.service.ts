import { GoogleGenerativeAI } from "@google/generative-ai";
import { BookExtractionResult } from "../models/bookExtraction.model";
import { BOOKS } from "../db.collections";
import { generateMatchKey } from "../utils/book.utils";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const extractBookDetails = async (
  imageBuffer: Buffer,
  mimeType: string
): Promise<BookExtractionResult> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageBase64 = imageBuffer.toString("base64");

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };

    const prompt = `Extract the following details from this book cover image:
      - Title (most important, never leave blank)
      - Author (most important, never leave blank)
      - Grade level
      - Subject(any theme, topic, or message the book conveys — not restricted to academic fields; can be a phrase or sentence found on the cover)
      - Series

      Only return a JSON object with the following structure:

      {
        "title": "...",
        "author": "...",
        "gradeLevel": "...",
        "subject": "...",
        "series": "..."
      }

      Use null if any information is not available.Try to extract as much information as possible.`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as BookExtractionResult;
  } catch (error) {
    console.error("Gemini Flash Vision Error:", error);
    throw new Error("Failed to extract book details.");
  }
};

export const saveBookDetails = async (
  updatedData: BookExtractionResult
): Promise<any> => {
  try {
    const currentTimestamp = Date.now();
    const timestamp = Math.floor(currentTimestamp / 1000); //seconds
    const title = updatedData.title?.trim().toLowerCase() || "";
    const author = updatedData.author?.trim().toLowerCase() || "";
    const series = updatedData.series?.trimEnd().toLowerCase() || "";
    const matchKey = generateMatchKey(title, author, series);

    const bookData = {
      ...updatedData,
      timestamp,
      matchKey,
    };
    // Save bookData to MongoDB
    const doc = await BOOKS.updateOne(
      { matchKey },
      { $set: bookData },
      { upsert: true }
    );

    return { success: true, message: "Book details saved successfully." };
  } catch (error) {
    console.error("Error saving book details:", error);
    throw new Error("Failed to save book details.");
  }
};

export const getAllBooks = async (): Promise<any | null> => {
  try {
    const book = await BOOKS.find({}).sort({ timestamp: -1 }).toArray();
    if (!book || book.length === 0) {
      return null;
    }
    return book;
  } catch (error) {
    throw new Error("Failed to retrieve book details.");
  }
};
