import express from "express";
import {
  registerUser,
  loginAdmin,
  loginUser,
  getCart,
  updateCart,
  getAdminProfile,
  uploadAdminAvatar,
  getUserProfile,
} from "../controllers/userController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/admin/profile", adminMiddleware, getAdminProfile);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.post("/admin/avatar", adminMiddleware, upload.single("avatar"), uploadAdminAvatar);
userRouter.post("/getcart", authMiddleware, getCart);
userRouter.post("/updatecart", authMiddleware, updateCart);

export default userRouter;
