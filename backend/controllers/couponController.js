import couponModel from "../models/couponModel.js";

const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    if (!code) return res.json({ success: false, message: "Coupon code required" });

    const coupon = await couponModel.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) return res.json({ success: false, message: "Invalid coupon code" });

    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return res.json({ success: false, message: "Coupon has expired" });
    }
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return res.json({ success: false, message: "Coupon usage limit reached" });
    }
    if (orderAmount < coupon.minOrderAmount) {
      return res.json({
        success: false,
        message: `Minimum order amount is ${coupon.minOrderAmount} to use this coupon`,
      });
    }

    const discount =
      coupon.type === "percentage"
        ? Math.round((orderAmount * coupon.discount) / 100)
        : coupon.discount;

    res.json({ success: true, coupon: { code: coupon.code, discount, type: coupon.type, percentage: coupon.discount } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const { code, discount, type, minOrderAmount, maxUses, expiryDate } = req.body;
    const existing = await couponModel.findOne({ code: code.toUpperCase() });
    if (existing) return res.json({ success: false, message: "Coupon code already exists" });

    const coupon = new couponModel({ code, discount, type, minOrderAmount, maxUses, expiryDate });
    await coupon.save();
    res.json({ success: true, message: "Coupon created", coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find({});
    res.json({ success: true, coupons });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await couponModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const incrementCouponUse = async (code) => {
  await couponModel.findOneAndUpdate({ code }, { $inc: { usedCount: 1 } });
};

export { validateCoupon, createCoupon, listCoupons, deleteCoupon, incrementCouponUse };
