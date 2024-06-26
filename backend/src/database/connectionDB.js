import mongoose from "mongoose";

const DBName = 'Hospital';

const connectDB = async () => {
    try {
      
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URL}/${DBName}`
        );
        console.log(
          "Connected to MongoDB !! Host: ",
          connectionInstance.connection.host
        );
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;