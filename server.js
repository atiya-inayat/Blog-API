import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

app.get("/", (req, res) => {
  res.send("API is working...");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
