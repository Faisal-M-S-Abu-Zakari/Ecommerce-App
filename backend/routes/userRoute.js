import express from "express";
import {
  registerUser,
  loginAdmin,
  loginUser,
  getCart,
  updateCart,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/getcart", authMiddleware, getCart);
userRouter.post("/updatecart", authMiddleware, updateCart);

export default userRouter;
