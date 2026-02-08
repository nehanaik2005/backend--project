// src/index.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 FORCE ROOT .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import app from "./app.js";
import { dbname } from "./constants.js";

console.log("MONGO URL:", process.env.MONGODB_URL);
console.log("CLOUDINARY KEY:", process.env.CLOUDINARY_API_KEY);

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${dbname}`);
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT} 🚀`);
    });
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
}

connectDB();
