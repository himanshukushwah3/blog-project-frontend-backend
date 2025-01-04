import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.e64um.mongodb.net/blog-app`;
  try {
    await mongoose.connect(URL);
    console.log("Database connection established...");
  } catch (error) {
    console.log("Error While Connecting to Database", error);
  }
};

export default Connection;
