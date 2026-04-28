import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    const existingOrder = await orderModel.findOne({
      userId,
      status: "Order Placed",
      paymentMethod,
    }).sort({ date: -1 });

    if (existingOrder && existingOrder.date > Date.now() - 300000) {
      const itemMap = {};
      existingOrder.items.forEach((item, idx) => {
        itemMap[`${item.productId}-${item.size}`] = idx;
      });

      items.forEach(newItem => {
        const key = `${newItem.productId}-${newItem.size}`;
        if (itemMap[key] !== undefined) {
          existingOrder.items[itemMap[key]].quantity += newItem.quantity;
        } else {
          existingOrder.items.push(newItem);
        }
      });

      await orderModel.findByIdAndUpdate(existingOrder._id, {
        items: existingOrder.items,
        amount: existingOrder.amount + amount,
        date: Date.now(),
      });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Added to existing order", orderId: existingOrder._id });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    
    res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };