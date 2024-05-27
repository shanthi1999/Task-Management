import mongoose from "mongoose";
require("dotenv").config();

const MONGO_DB_CONNECTION_STRING: string = (
  process.env.MONGO_DB_URI || ""
).replace("<password>", process.env.MONGO_DB_PASSWORD || "");

mongoose.connect(MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

const connection = mongoose.connection;

export default connection;
