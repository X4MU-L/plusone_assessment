import mongoose from "mongoose";

export const mongoConnect = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URL!);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default mongoConnect;
