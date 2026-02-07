import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import { dbname } from "./constants.js";

dotenv.config({ path: "../.env" }); // ✅ correct

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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