import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, default: "Anonymous" },
  productId: { type: String, required: true },
  rating: { type: Number, default: 5 },
  comment: { type: String, required: true },
  date: { type: Number, default: Date.now },
});

const commentModel = mongoose.models.comment || mongoose.model("Comment", commentSchema);
export default commentModel;