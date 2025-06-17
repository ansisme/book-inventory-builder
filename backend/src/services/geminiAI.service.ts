import { GoogleGenerativeAI } from "@google/generative-ai";
import { BookExtractionResult } from "../models/bookExtraction.model";
import { BOOKS } from "../db.collections";
import { generateMatchKey } from "../utils/bookFunctions";
import dotenv from "dotenv";
dotenv.config(); //
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
      - Author (if available)
      - Grade level (if educational book)
      - Subject (if educational book)
      - Series (if part of a series)

      Only return a JSON object with the following structure:

      {
        "title": "...",
        "author": "...",
        "gradeLevel": "...",
        "subject": "...",
        "series": "..."
      }

      Use null if any information is not available.`;

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

// export const getBookDetails = async (
//   matchKey: string
// ): Promise<BookExtractionResult | null> => {
//   try {
//     const book = await BOOKS.findOne({ matchKey });
//     if (!book) {
//       return null;
//     }
//     return {
//       title: book.title || null,
//       author: book.author || null,
//       gradeLevel: book.gradeLevel || null,
//       subject: book.subject || null,
//       series: book.series || null,
//       timestamp: book.timestamp || null,
//     };
//   } catch (error) {
//     console.error("Error retrieving book details:", error);
//     throw new Error("Failed to retrieve book details.");
//   }
// };

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
