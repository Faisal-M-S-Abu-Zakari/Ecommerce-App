import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  productIds: { type: [String], default: [] },
});

const wishlistModel = mongoose.models.wishlist || mongoose.model("Wishlist", wishlistSchema);
export default wishlistModel;
