import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandlerr } from "./middlewares/errorHandlers.js";
import User from "./models/User.js";
dotenv.config();

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
  });

const app = express();
app.use(express.json());

// routes
app.use("/posts", postRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is working...");
});

// 404 + error handlers (must after routes)
app.use(notFound);
app.use(errorHandlerr);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
