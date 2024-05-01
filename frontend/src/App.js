
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);
  
  // for fetching data from database
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getTasks");
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };
// post request to add new data to task list
  const addTask = async () => {
    if (task.trim() === "") {
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", { task });
      fetchTasks();
      setTask("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // delete 

  const deleteTask = async (taskId) => {
    try {
      await axios.post("http://localhost:5000/delete", { id: taskId });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
      <h1 className="my-3">To Do List App</h1>
      <div className="container d-flex justify-content-center align-items-center flex-column flex-sm-column flex-md-column flex-lg-row my-2">
        <button className="btn bg-light btn-class">Enter The Task</button>
        <input
          className="form-control fw-bold btn-class"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-success btn-class" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="container d-flex justify-content-center align-items-center flex-column w-100">
        {tasks.map((task) => (
          <li
            className="list d-flex justify-content-between align-items-center mt-2 fs-2 text-white fw-bold"
            key={task.id}
          >
            {task.task}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-white bg-dark btn py-1 fs-5 m-1"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;