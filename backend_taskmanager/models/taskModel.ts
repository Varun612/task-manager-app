import mongoose from "mongoose";

// Define Task Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Log every new task creation
TaskSchema.post("save", function (doc) {
  console.log("✅ New Task Saved in MongoDB:", doc);
});

// Create and export Task Model
const Task = mongoose.model("Task", TaskSchema);
export default Task;