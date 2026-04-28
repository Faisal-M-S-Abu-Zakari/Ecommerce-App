import express from "express";
import {
  registerUser,
  loginAdmin,
  loginUser,
  getCart,
  updateCart,
  getAdminProfile,
  uploadAdminAvatar,
} from "../controllers/userController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/admin/profile", adminMiddleware, getAdminProfile);
userRouter.post("/admin/avatar", adminMiddleware, uploadAdminAvatar);
userRouter.post("/getcart", authMiddleware, getCart);
userRouter.post("/updatecart", authMiddleware, updateCart);

export default userRouter;
