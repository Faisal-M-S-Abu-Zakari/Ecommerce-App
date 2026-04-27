import commentModel from "../models/commentModel.js";

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

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await commentModel.findByIdAndDelete(commentId);
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addComment, getProductComments, getAllComments, deleteComment };