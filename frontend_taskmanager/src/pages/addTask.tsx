import { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) return;
    axios
      .post("http://localhost:5000/tasks", { title })
      .then(() => {
        setTitle("");
        window.location.reload();
      })
      .catch(() => console.error("Failed to add task"));
  };

  return (
    <div className="container">
      <h3>Add New Task</h3>
      <input
        type="text"
        className="input-task"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="button button-add" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;