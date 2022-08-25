// @ts-nocheck
import authRoute from "./Routes/AuthRoute.js";

dotenv.config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/UserRoute.js";
import postRoute from "./Routes/PostRoute.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

// DB Configuration
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

// Server Configuration
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
