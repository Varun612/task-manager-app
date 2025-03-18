"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const router = express_1.default.Router();
//Create a task (POST /tasks)  - add a new task
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received POST request at /tasks"); // Log request
        console.log("Request Headers:", req.headers); // Log headers
        console.log("Request Body:", req.body); // Log body
        const { title } = req.body;
        if (!title) {
            // console.log("❌ Missing title in request body");
            return res.status(400).json({ error: "Title is required" });
        }
        const newTask = new taskModel_1.default({ title, completed: false });
        const savedTask = yield newTask.save();
        console.log(" Task Created Scuccessfully: ", savedTask);
        res.status(201).json(savedTask);
    }
    catch (error) {
        console.error("Error Creating Task:", error);
        res.status(500).json({ error: "Error creating task" });
    }
}));
// 2. Get All Tasks (GET /tasks) - get all tasks
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
}));
// 3. Update a Task (PUT /tasks/:id) - update a task(mark complete/imcomplete)
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.default.findById(req.params.id);
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        task.completed = !task.completed; // toggle completion status
        const updatedTask = yield task.save();
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
}));
// 4. Delete a Task (DELETE /tasks/:id) remove a task
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield taskModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask)
            return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task Deleted", deletedTask });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting task" });
    }
}));
exports.default = router;
