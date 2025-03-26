import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authslice";

function Auth() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Basic validation
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    // Clear any previous errors
    setError("");

    // Dispatch login action
    dispatch(login(username.trim()));
  };

  const handleLogout = () => {
    dispatch(logout());
    // Reset username and any potential errors on logout
    setUsername("");
    setError("");
  };

  return (
    <div className="flex justify-center items-center pt-10">
      {isAuthenticated ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-medium">Hi! {username}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(""); // Clear error when user starts typing
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Auth;
