import wishlistModel from "../models/wishlistModel.js";

const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const wishlist = await wishlistModel.findOne({ userId });
    res.json({ success: true, productIds: wishlist?.productIds || [] });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) return res.json({ success: false, message: "Product ID required" });

    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = new wishlistModel({ userId, productIds: [productId] });
      await wishlist.save();
      return res.json({ success: true, added: true, productIds: wishlist.productIds });
    }

    const isInWishlist = wishlist.productIds.includes(productId);
    if (isInWishlist) {
      wishlist.productIds = wishlist.productIds.filter((id) => id !== productId);
    } else {
      wishlist.productIds.push(productId);
    }
    await wishlist.save();
    res.json({ success: true, added: !isInWishlist, productIds: wishlist.productIds });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getWishlist, toggleWishlist };
