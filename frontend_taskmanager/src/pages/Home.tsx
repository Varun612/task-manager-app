import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  completed: boolean; 
}

const API_URL = "http://localhost:5000/tasks"; // backend url

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((response) => {
        const updatedTasks = response.data.map((task: Task) => ({
          ...task, 
          completed: task.completed ?? false, //set default value if missing
        }));
      setTasks(updatedTasks);
    })
      .catch(() => console.error("Failed to load tasks"));
  }, []);

  // Function to Toggle Task Completion
  const toggleCompletion = (taskId: string) => {
    axios
      .put(`${API_URL}/${taskId}`)
      .then(() => {
        setTasks((allTasks) =>
          allTasks.map((task) =>
            task._id === taskId ? {...task, completed: !task.completed} : task
            )
          );
      })
      .catch(() => console.error("Failed to update task"));
  };

  // Function to delete a Task
  const deleteTask = (taskId: string) => {
    axios
      .delete(`${API_URL}/${taskId}`)
      .then(() => {
        setTasks((allTasks) => allTasks.filter((task) => task._id !== taskId));
      })
      .catch(() => console.error("Failed to delete task"));
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span>{task.title}</span>
            <div>
              <button className="button button-toggle" onClick={() => toggleCompletion(task._id)}>
                {task.completed ? "Undo": "Complete"}
              </button>
              <button className="button button-delete" onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;