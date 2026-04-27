import express from "express";
import cors from "cors";
import "dotenv/config"; // this import will five me the support to use the .env file

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // this middleware will allow us to parse the incoming request body as JSON
app.use(cors()); // this middleware will allow us access to the backend from any IP .

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

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
      message: dbState === "Connected" ? "Data coming from MongoDB" : "Using fallback data"
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
