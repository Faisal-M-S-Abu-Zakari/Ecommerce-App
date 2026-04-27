import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    // optional avatar URL for user profile photo
    avatar: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  //   here i am setting minimize to false to ensure that empty objects are stored in the database instead of being removed. This is important for the cartData field, which is initialized as an empty object and may be updated with user cart information later on.
  // By default, Mongoose removes empty objects from the database, but setting minimize to false allows us to keep the cartData field even when it's empty, ensuring that we can easily update it with cart information as needed.
  // لما انشا مستخدم راح ينشأ اله اوبجيكت للسلة و لكن لانه بالبداية بيكون فارغ الاوبجيكت فبيتم حذفه , لحتى احافظ على الاوبجيكت حتى لو كان فارغ لازم اضيف السطر يلي تحت
  { minimize: false },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
// This code defines a Mongoose schema and model for user data in a MongoDB database.
