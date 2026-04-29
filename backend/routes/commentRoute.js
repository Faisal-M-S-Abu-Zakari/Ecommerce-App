import express from "express";
import { addComment, getProductComments, getAllComments, deleteComment, getAllCommentsForAdmin } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/add", addComment);
commentRouter.post("/product", getProductComments);
commentRouter.get("/all", getAllComments);
commentRouter.get("/list-all", getAllCommentsForAdmin); // For admin panel
commentRouter.delete("/:commentId", authMiddleware, deleteComment);

export default commentRouter;