import { Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import AddTask from "./pages/AddTask";
import "./styles.css";


function App() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="navbar-brand">Task Manager</h2>
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add-task" className="nav-link">Add Task</Link>
        </div>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </>
  );
}
export default App;
