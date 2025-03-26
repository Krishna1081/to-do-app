import TaskList from "./components/TaskList";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import axios from "axios";
import Auth from "./Auth";

function App() {
  const [trackTask, setTrackTask] = useState("");

  // Local storage get Items
  const savedTasks = localStorage.getItem("tasks");
  const parsed = savedTasks ? JSON.parse(savedTasks) : [];

  const [tasks, setTasks] = useState(parsed);
  const [toggleAddUpdate, setToggleAddUpdate] = useState("Add Task");
  const [editTaskId, setEditTaskId] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Local Storage set items
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const fetchData = async (city) => {
    try {
      const api = "f4949b82beb22c65488c0a61e30b765a";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      );
      setWeatherData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  function AddTask(trackTask) {
    if (trackTask.trim() === "") return;
    else if (toggleAddUpdate === "Add Task") {
      const obj = {
        id: Date.now(),
        taskName: trackTask,
        completed: false,
        priority: "low",
      };
      setTasks([...tasks, obj]);
      setTrackTask("");
    } else if (toggleAddUpdate === "Update Task" && editTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, taskName: trackTask } : task
        )
      );
      setToggleAddUpdate("Add Task");
      setEditTaskId(null);
    }
    setTrackTask("");
  }

  function DeleteTask(taskId) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskId;
      })
    );
  }

  function UpdateTask(task) {
    setTrackTask(task.taskName);
    setEditTaskId(task.id);
    setToggleAddUpdate("Update Task");
  }
  function ToggleCompleted(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }
  function ChangePriority(id, priority) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, priority: priority };
        } else {
          return task;
        }
      })
    );
  }

  function handleSubmition(city) {
    fetchData(city);
  }

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Auth />
        {isAuthenticated ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              To Do App
            </h1>

            <TaskInput
              setTrackTask={setTrackTask}
              AddTask={AddTask}
              toggleAddUpdate={toggleAddUpdate}
              trackTask={trackTask}
            />

            <TaskList
              sortedTasks={sortedTasks}
              UpdateTask={UpdateTask}
              AddTask={AddTask}
              DeleteTask={DeleteTask}
              ToggleCompleted={ToggleCompleted}
              ChangePriority={ChangePriority}
            />

            <div className="mt-6 flex space-x-2">
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSubmition(city)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Get Weather
              </button>
            </div>

            {weatherData !== null ? (
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Weather Information
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {weatherData.name}
                  </p>
                  <p>
                    <span className="font-medium">Temperature:</span>{" "}
                    {weatherData.main.temp}°C
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {weatherData.weather[0].description}
                  </p>
                  <p>
                    <span className="font-medium">Feels Like:</span>{" "}
                    {weatherData.main.feels_like}°C
                  </p>
                  <p>
                    <span className="font-medium">Humidity:</span>{" "}
                    {weatherData.main.humidity}%
                  </p>
                  <p>
                    <span className="font-medium">Pressure:</span>{" "}
                    {weatherData.main.pressure}
                  </p>
                  <p>
                    <span className="font-medium">Wind Speed:</span>{" "}
                    {weatherData.wind.speed}m/s
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">Loading...</p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Please log in to view todos
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
