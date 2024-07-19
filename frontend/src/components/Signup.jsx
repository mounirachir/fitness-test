import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Signup = ({ userData, setUserData, token, setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (userData.password.length < 8) {
      alert("Password should be composed of 8 characters");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Signup successful!");
        localStorage.setItem("token", data.token); // Store token in localStorage
        setToken(data.token);
        navigate("/dashboard"); // Redirect to dashboard after successful signup
      } else {
        alert(data.msg); // Display error message from server
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error"); // Handle server errors
    }
  };

  // Password visibility toggler
  const togglePasswordVisibility = (field) => {
    if (field === "password") setShowPassword((prev) => !prev);
    else setShowConfirmPassword((prev) => !prev);
  };

  // Check if the user should navigate away
  if (userData.program.length !== 3) {
    alert("Click on the start now button");
    return <Navigate to="/" replace />;
  }

  return (
    <section id="signup" className="min-h-screen m-auto">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap ">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            START
          </span>{" "}
          YOUR{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            JOURNEY
          </span>
        </h1>
      </div>
      <form
        className="flex flex-col justify-center items-center p-4"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col md:w-[50%]">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleOnChange}
            required
            className="p-2 md:p-3 text-xl rounded border-2 border-gray-300 mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleOnChange}
            required
            className="p-2 md:p-3 text-xl rounded border-2 border-gray-300 mb-4"
          />
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleOnChange}
              required
              className="w-full p-3 text-xl rounded border-2 border-gray-300 mb-4 pr-12"
            />
            <div
              className="absolute top-5 right-0 flex items-center px-3 cursor-pointer hover:text-gray-600"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={handleOnChange}
              required
              className="w-full p-3 text-xl rounded border-2 border-gray-300 mb-2 pr-12"
            />
            <div
              className="absolute top-5 right-0 flex items-center px-3 cursor-pointer hover:text-gray-600"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-white m-1">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
          <button
            className="bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
