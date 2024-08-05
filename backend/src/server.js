import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messageRoutes.js"
import { randomPort } from "./utils/randomPort.js"

const app = express();
const port = randomPort();
dotenv.config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentilas: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/messages", messagesRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });

export default app;
