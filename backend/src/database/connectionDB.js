import mongoose from "mongoose";

const connectDB = async () => {
    try {
      console.log();
      
    // await mongoose.connect(`${process.env.MONGO}/Hospital`);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1);
  }
};
export default connectDB;