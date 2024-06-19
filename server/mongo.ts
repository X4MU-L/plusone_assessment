import mongoose from "mongoose";

export const mongoConnect = async (): Promise<void> => {
  const DB_URL = process.env.MONGODB_URL;
  if (!DB_URL) {
    process.exit(1);
  }
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB_URL);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default mongoConnect;
