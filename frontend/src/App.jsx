import { useEffect, useState } from "react";
import api from "./Api";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  const [auth, setAuth] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const fetchTasks = async () => {
    try {
      const res = await api.get("tasks/");
      setTasks(res.data.results || res.data || []);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) fetchTasks();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, status };
    try {
      if (editingId) {
        await api.put(`tasks/${editingId}/`, payload);
        setEditingId(null);
      } else {
        await api.post("tasks/", payload);
      }
      setTitle("");
      setDescription("");
      setStatus("Pending");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filter === "All" ? true : task.status === filter));

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (!auth) return <Login setAuth={setAuth} />;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Manager</h2>
        <Logout setAuth={setAuth} />
      </div>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select
          className="form-select mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="btn btn-primary">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {currentTasks.map((task) => (
        <div key={task.id} className="card mb-3">
          <div className="card-body">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <span className="badge bg-secondary me-2">{task.status}</span>
            <button className="btn btn-warning btn-sm me-2" onClick={() => editTask(task)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-outline-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span className="align-self-center">Page {currentPage} of {totalPages || 1}</span>
        <button className="btn btn-outline-primary ms-2" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;