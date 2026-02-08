// controllers/user.js
import handler from "../utils/acynchandle.js";
import ApiError from "../utils/apierror.js";
import User from "../models/users.js";
import { uploadImage } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiresponse.js";

const registerUser = handler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    throw new ApiError("All fields are required", 400);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const avatarPath = req.files?.avatar?.[0]?.path;
  const coverPath = req.files?.coverImage?.[0]?.path;

  if (!avatarPath || !coverPath) {
    throw new ApiError("Avatar and Cover Image are required", 400);
  }

  const avatar = await uploadImage(avatarPath);
  const coverImage = await uploadImage(coverPath);

  const newUser = new User({
    fullName,
    email,
    username,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url,
  });

  await newUser.save();

  const createdUser = await User.findById(newUser._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
