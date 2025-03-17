import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import mongoose from "mongoose";


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log("MongoDB Connection Error.", err));

// Middleware
app.use(cors({
	origin: "http://localhost:5173"
}));
app.use(express.json()); // Allow JSON data in requests
app.use("/api/tasks", taskRoutes);

// ✅ Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Task Manager API is running..." });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});