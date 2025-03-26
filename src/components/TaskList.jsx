import React from "react";

function TaskList({
  sortedTasks,
  UpdateTask,
  DeleteTask,
  ToggleCompleted,
  ChangePriority,
}) {
  return (
    <ul className="space-y-2 p-4">
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => ToggleCompleted(task.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              } flex-grow`}
            >
              {task.taskName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={task.priority}
              onChange={(e) => ChangePriority(task.id, e.target.value)}
              className="form-select text-sm px-2 py-1 rounded bg-white border border-gray-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              onClick={() => UpdateTask(task)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition"
            >
              Update
            </button>

            <button
              onClick={() => DeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
