import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const leftBgColor = "bg-teal-200"; // Background color for the left side
  const rightBgColor = "bg-gray-100"; // Background color for the right side

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Allow sending cookies
        }
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role); // Store user role in local storage
      localStorage.setItem("employeeID", user.employeeID);

      setMessage("Login successful!");
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div
        className={`w-1/2 ${leftBgColor} flex flex-col justify-center items-center text-black p-10`}
      >
        <h1 className="text-5xl font-bold mb-4">Employee Connect Suite</h1>
        <p className="italic text-center">
          Empowering Connections, Elevating Success.
        </p>
        <img src="/employee.png" alt="Employee" className="mt-8" />
      </div>

      {/* Right Side */}
      <div
        className={`w-1/2 ${rightBgColor} flex flex-col justify-center items-center p-10 text-black`}
      >
        <h2 className="text-4xl font-bold mb-4">Login</h2>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        {/* Form */}
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6 w-full">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 w-full relative">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2 text-left"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 mr-2"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 mb-4"
          >
            Log In
          </button>

          {/* Forgot Password */}
          <p className="text-sm mt-4">
            <Link
              to="/general/ForgotPassword"
              className="text-blue-500 underline"
            >
              Forgot your password?
            </Link>
          </p>

          {/* Sign Up */}
          <p className="text-gray-500 text-sm mt-4">
            Don't have an account?
            <Link to="/general/SignUp" className="text-black underline ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
