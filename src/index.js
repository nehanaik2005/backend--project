// src/index.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { dbname } from "./constants.js";

dotenv.config({ path: "../.env" });

console.log("MONGO URL:", process.env.MONGODB_URL);

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
