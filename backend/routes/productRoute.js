import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRouter.get("/list", listProducts);
productRouter.get("/single/:id", singleProduct);
productRouter.delete("/remove/:id", adminMiddleware, removeProduct);

export default productRouter;
