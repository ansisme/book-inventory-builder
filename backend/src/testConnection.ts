import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Successfully connected to MongoDB Atlas");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Connection failed", error);
  }
}

testConnection();
