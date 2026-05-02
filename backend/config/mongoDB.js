import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL?.replace(/^["']|["']$/g, "");
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
export default connectDB;
