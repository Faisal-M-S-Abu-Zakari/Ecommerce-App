import commentModel from "../models/commentModel.js";
import productModel from "../models/productModel.js";

const addComment = async (req, res) => {
  try {
    const { productId, rating, comment, userId, userName } = req.body;
    const newComment = new commentModel({
      userId,
      userName: userName || "Anonymous",
      productId,
      rating: rating || 5,
      comment,
      date: Date.now(),
    });
    await newComment.save();
    res.json({ success: true, message: "Comment added", comment: newComment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProductComments = async (req, res) => {
  try {
    const { productId } = req.body;
    const comments = await commentModel.find({ productId }).sort({ date: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find({}).sort({ date: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all comments with product info for admin panel
const getAllCommentsForAdmin = async (req, res) => {
  try {
    const comments = await commentModel.find({}).sort({ date: -1 });
    
    // For each comment, get product info
    const commentsWithProduct = await Promise.all(
      comments.map(async (comment) => {
        const product = await productModel.findById(comment.productId);
        return {
          reviewId: comment._id,
          productId: comment.productId,
          productName: product?.name || "Product not found",
          name: comment.userName,
          rating: comment.rating,
          comment: comment.comment,
          createdAt: comment.date,
        };
      })
    );
    
    res.json({ success: true, comments: commentsWithProduct });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await commentModel.findByIdAndDelete(commentId);
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addComment, getProductComments, getAllComments, getAllCommentsForAdmin, deleteComment };