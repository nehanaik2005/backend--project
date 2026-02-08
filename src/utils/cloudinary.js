import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  if (!filePath) throw new Error("File path is required");

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "user_images",
  });

  fs.unlinkSync(filePath);
  return result;
};
