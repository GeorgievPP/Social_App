// Dependencies (packages)
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// IMPORT MAIN ROUTES
import postRouter from "./routes/posts.js"
import userRouter from "./routes/users.js"

// CONFIG APP
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// USE ROUTES
app.use("/posts", postRouter)
app.use("/user", userRouter)

const PORT = process.env.PORT || 7077;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
