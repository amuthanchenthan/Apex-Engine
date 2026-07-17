import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
import executionRoutes from "./routes/executionRoutes.js";
app.use("/api/executions", executionRoutes);
import strategyStageRoutes from "./routes/strategyStageRoutes.js";
app.use("/api/stages", strategyStageRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Apex Engine API is running.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});