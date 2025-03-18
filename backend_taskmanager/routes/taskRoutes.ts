import express, { Request, Response, Router } from "express";
import Task from "../models/taskModel";

const router: Router = express.Router();

// ✅ Create a Task (POST /tasks)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received POST request at /tasks");
    console.log("Request Body:", req.body);

    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const newTask = new Task({ title, completed: false });
    const savedTask = await newTask.save();

    console.log("✅ Task Created Successfully:", savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("❌ Error Creating Task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
});

// ✅ Get All Tasks (GET /tasks)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// ✅ Update a Task (PUT /tasks/:id)
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// ✅ Delete a Task (DELETE /tasks/:id)
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json({ message: "Task Deleted", deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default router;