import {handler} from '../utils/acynchandle.js';
import {apierror} from '../utils/apierror.js';
import {User} from '../models/user.js';
import {uploadImage} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/apiresponse.js';
const registerUser=handler(async(req,res)=>{

    const {fullName,email,username,password}=req.body;

    if(!fullName || !email || !username || !password){
        throw new apierror("All fields are required",400);
    }

    const existingUser=await User.findOne({$or:[{email},{username}]});

    if(existingUser){
        throw new apierror("User already exists",400);
    }

    const avatar=req.files['avatar'] ? req.files['avatar'][0].path : null;
    const coverImage=req.files['coverImage'] ? req.files['coverImage'][0].path : null;
    if(!avatar || !coverImage){
        throw new apierror("Avatar and Cover Image are required",400);
    }

    const avatarUploadResult=await uploadImage(avatar);
    const coverImageUploadResult=await uploadImage(coverImage);
    if(!avatarUploadResult || !coverImageUploadResult)
    {
        throw new apierror("Image upload failed",500);
    }
    const newUser=new User({
        fullName,
        email,
        username,
        password,
        avatar: avatarUploadResult.url,
        coverImage: coverImageUploadResult.url
    });

    const createdUser = await User.findById(newUser._id).select("-password");
    if(!createdUser){
        throw new apierror("Failed to create user",500);
    }
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered successfully")
    );
    });





export { registerUser };