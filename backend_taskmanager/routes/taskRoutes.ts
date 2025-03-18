import  express , {Request,Response, Router} from "express";
import Task from "../models/taskModel";

const router: Router = express.Router()

//Create a task (POST /tasks)  - add a new task
router.post("/", async (req:Request, res: Response) => {
	try {
		console.log("Received POST request at /tasks"); // Log request
    	console.log("Request Headers:", req.headers); // Log headers
    	console.log("Request Body:", req.body); // Log body
		const { title } = req.body;
		if (!title) {
			// console.log("❌ Missing title in request body");
			return res.status(400).json({ error: "Title is required"});
		}

		const newTask = new Task({ title, completed: false });
		const savedTask = await newTask.save();

		console.log(" Task Created Scuccessfully: ", savedTask);
		res.status(201).json(savedTask);
	} catch (error) {
		console.error("Error Creating Task:", error);
		res.status(500).json({ error: "Error creating task"});
	}
});

// 2. Get All Tasks (GET /tasks) - get all tasks
router.get("/", async (req: Request, res: Response) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Error fetching tasks"});
	}
});

// 3. Update a Task (PUT /tasks/:id) - update a task(mark complete/imcomplete)
router.put("/:id", async (req: Request, res: Response) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ error: "Task not found" });

		task.completed = !task.completed; // toggle completion status
		const updatedTask = await task.save();

		res.json(updatedTask);
	} catch (error) {
		res.status(500).json({ error: "Error updating task"});
	}
});

// 4. Delete a Task (DELETE /tasks/:id) remove a task
router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const deletedTask = await Task.findByIdAndDelete(req.params.id);
		if(!deletedTask) return res.status(404).json({ error: "Task not found" });

		res.json({ message: "Task Deleted", deletedTask });
	} catch (error) {
		res.status(500).json({ error: "Error deleting task" });
	}
});

export default router;