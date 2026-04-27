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
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a strong password" });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = generateAuthToken(existingUser._id);
    res.status(200).json({ message: "User loggedIn Successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  res.json({ message: "Admin loggedIn Successfully" });
};

export { loginUser, registerUser, loginAdmin };
