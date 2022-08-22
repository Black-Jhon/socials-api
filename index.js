import authRoute from "./Routes/AuthRoute.js";

dotenv.config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/UserRoute.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);


// DB Configuration
mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));

// Server Configuration
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
