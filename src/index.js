import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

// configure dotenv
dotenv.config();

// connect mongodb
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT :: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`ERROR MONGODB CONNECTION FAILED :: ${err}`);
  });
