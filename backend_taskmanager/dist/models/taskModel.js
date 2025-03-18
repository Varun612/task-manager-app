"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define Task Schema
const TaskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
// Log every new task creation
TaskSchema.post("save", function (doc) {
    console.log("✅ New Task Saved in MongoDB:", doc);
});
// Create and export Task Model
const Task = mongoose_1.default.model("Task", TaskSchema);
exports.default = Task;
