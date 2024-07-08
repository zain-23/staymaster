import mongoose from "mongoose";

export const connectDB = async () => {
  const readyState = mongoose.connection.readyState;
  if (readyState === 1) {
    console.log("ALREADY CONNECTED");
    return;
  }
  if (readyState === 2) {
    console.log("CONNECTING");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "staymaster",
      bufferCommands: true,
    });
  } catch (error: any) {
    console.error("ERROR CONNECTING DATABASE", error);
    throw new Error(error);
  }
};
