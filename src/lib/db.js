import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      
    );
    console.log("Connected to Database")
  } catch (err) {
    console.log(err)
  }
};

export default connectDB;
