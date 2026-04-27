import express from "express";
import { addComment, getProductComments, getAllComments, deleteComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/add", addComment);
commentRouter.post("/product", getProductComments);
commentRouter.get("/all", getAllComments);
commentRouter.delete("/:commentId", authMiddleware, deleteComment);

export default commentRouter;