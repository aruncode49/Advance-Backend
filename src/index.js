import connectDB from "./db/index.js";
import dotenv from "dotenv";

// configure dotenv
dotenv.config();

// connect mongodb
connectDB();
