import express from "express";
import { validateCoupon, createCoupon, listCoupons, deleteCoupon } from "../controllers/couponController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";

const couponRouter = express.Router();

couponRouter.post("/validate", authMiddleware, validateCoupon);
couponRouter.post("/create", adminMiddleware, createCoupon);
couponRouter.get("/list", adminMiddleware, listCoupons);
couponRouter.delete("/:id", adminMiddleware, deleteCoupon);

export default couponRouter;
