import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
export default connectDB;
