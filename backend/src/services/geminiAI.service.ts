import { GoogleGenerativeAI } from "@google/generative-ai";
import { BookExtractionResult } from "../models/bookExtraction.model";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const extractBookDetails = async (
  imageBuffer: Buffer,
  mimeType: string
): Promise<BookExtractionResult> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Convert image to Gemini-compatible format
    const imageBase64 = imageBuffer.toString("base64");
    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };

    const prompt = `Extract the following details from this book cover with high accuracy:
    - Title (most important, never leave blank)
    - Author (if available)
    - Grade level (if educational book)
    - Subject (if educational book)
    - Series (if part of a series)
    
    Return ONLY a JSON object with these fields. If information is missing, use null.
    Example output:
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "gradeLevel": null,
      "subject": null,
      "series": null
    }`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // Clean the response (remove markdown backticks if present)
    const jsonString = text.replace(/```json|```/g, "");
    return JSON.parse(jsonString) as BookExtractionResult;
  } catch (error) {
    console.error("Gemini extraction error:", error);
    throw new Error("Failed to extract book details");
  }
};
