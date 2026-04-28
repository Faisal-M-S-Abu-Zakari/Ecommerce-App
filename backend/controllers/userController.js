import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Generate a JWT token with the user's ID as the payload and a secret key from the environment variables
const generateAuthToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
  return token;
};

// Route For user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = generateAuthToken(existingUser._id);
    res.json({ success: true, message: "User loggedIn Successfully", token, user: { name: existingUser.name, email: existingUser.email } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route For user registration
const registerUser = async (req, res) => {
  try {
    // destructuring the request body :
    const { name, email, password } = req.body;

    // validating the request body :
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // checking user already exists or not :
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // validate email format and strong password :
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a strong password" });
    }

    // hashing the password :
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user :
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // creating a JWT token for the user :
    const token = generateAuthToken(user._id);

    // return response to the client :
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route For admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, isAdmin: true });
    if (!user) {
      return res.json({ success: false, message: "Invalid admin credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = generateAuthToken(user._id);
    res.json({ success: true, token, email: user.email });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for getting admin profile
const getAdminProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user || !user.isAdmin) {
      return res.json({ success: false, message: "Admin not found" });
    }
    res.json({ success: true, admin: { email: user.email, name: user.name, avatar: user.avatar || "" } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for uploading admin avatar
const uploadAdminAvatar = async (req, res) => {
  try {
    const avatar = req.body.avatar;
    console.log("Avatar upload - user:", req.user._id);
    console.log("Avatar upload - has avatar:", !!avatar);
    if (!avatar) {
      return res.json({ success: false, message: "No image provided" });
    }
    const uploadedImage = await cloudinary.uploader.upload(avatar, {
      folder: "admin_avatars",
      transformation: [{ width: 200, height: 200, crop: "fill" }],
    });
    console.log("Cloudinary upload success:", uploadedImage.secure_url);
    await userModel.findByIdAndUpdate(req.user._id, { avatar: uploadedImage.secure_url });
    res.json({ success: true, avatar: uploadedImage.secure_url });
  } catch (error) {
    console.log("Avatar upload error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for getting user cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for updating user cart
const updateCart = async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, loginAdmin, getCart, updateCart, getAdminProfile, uploadAdminAvatar };
