import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentRouter from "./routes/commentRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";
import couponRouter from "./routes/couponRoute.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import orderModel from "./models/orderModel.js";
import commentModel from "./models/commentModel.js";

const app = express();
const port = process.env.PORT || 4000;

const initCollections = async () => {
  try {
    await userModel.createCollection();
    await productModel.createCollection();
    await orderModel.createCollection();
    await commentModel.createCollection();
    console.log("Collections created in MongoDB Atlas");
  } catch (error) {
    console.log("Collections may already exist:", error.message);
  }
};

connectDB().then(() => initCollections());
connectCloudinary();

app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/comment", commentRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/coupon", couponRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/api/health", async (req, res) => {
  try {
    const mongoose = (await import("mongoose")).default;
    const state = mongoose.connection.readyState;
    const dbState = state === 1 ? "Connected" : "Disconnected";
    res.json({
      status: "ok",
      database: dbState,
      message: dbState === "Connected" ? "Data coming from MongoDB" : "Using fallback data",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
