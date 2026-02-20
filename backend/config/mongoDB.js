import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/myVirtualDatabase`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
export default connectDB;
