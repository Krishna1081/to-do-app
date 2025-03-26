import React from "react";

function TaskInput({ setTrackTask, AddTask, toggleAddUpdate, trackTask }) {
  return (
    <div className="flex items-center space-x-2 p-4">
      <input
        type="text"
        onChange={(e) => setTrackTask(e.target.value)}
        value={trackTask}
        placeholder="Enter a task"
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => AddTask(trackTask)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        {toggleAddUpdate}
      </button>
    </div>
  );
}

export default TaskInput;
