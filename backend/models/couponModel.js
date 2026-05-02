import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true },
  type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
  minOrderAmount: { type: Number, default: 0 },
  maxUses: { type: Number, default: null },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  expiryDate: { type: Date, default: null },
});

const couponModel = mongoose.models.coupon || mongoose.model("Coupon", couponSchema);
export default couponModel;
