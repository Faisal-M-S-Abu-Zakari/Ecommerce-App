import express from "express";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, getUserOrders);
orderRouter.get("/list", adminMiddleware, getAllOrders);
orderRouter.get("/allorders", adminMiddleware, getAllOrders);
orderRouter.post("/status", adminMiddleware, updateOrderStatus);

export default orderRouter;