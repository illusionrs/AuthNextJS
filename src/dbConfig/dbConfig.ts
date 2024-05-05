import mongoose from "mongoose";

export async function connect() {
  try {
    console.log("connecting to db")
    mongoose.connect("mongodb+srv://rajeev267:LUyflpv2cEoDTjO4@cluster0.ch65saj.mongodb.net/db-auth");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
