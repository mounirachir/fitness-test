import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userData, setUserData, token, setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setUserData({
      workout: null,
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      activityLevel: "",
      program: [],
    });
  }, []);
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

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const res = await response.json();
        setToken(res.token);
        localStorage.setItem("token", res.token);
        setUserData(res.user);
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        const { msg } = await response.json();
        alert(msg); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error"); // Handle server errors
    }
  };

  return (
    <section id="login" className="min-h-screen min-w-full p-10 ">
      <div className="flex flex-col p-4">
        <h1 className="font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            CONTINUE
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
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleOnChange}
            required
            className=" p-2 md:p-3 text-xl rounded border-2 border-gray-300 mb-4"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleOnChange}
              required
              className="w-full p-2 md:p-3 text-xl rounded border-2 border-gray-300 mb-4 pr-12"
            />
            <div
              className="absolute top-4 md:top-5 right-0 flex items-center px-3 cursor-pointer hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="md:text-2xl lg:text-xl bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
