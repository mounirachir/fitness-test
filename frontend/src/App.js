import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Programs from "./pages/Programs";

import "./index.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    workout: null,
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    age: 18,
    gender: "",
    weight: 60,
    height: 160,
    activityLevel: "",
    program: [],
  });
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      console.log("token is true");
    }
    console.log("run useeffect");
  }, [token]);

  return (
    <Router>
      <div className="bg-black italic  overflow-x-hidden">
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userData={userData}
                setUserData={setUserData}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/about"
            element={<About userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/contact"
            element={<Contact userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/login"
            element={
              <Login
                userData={userData}
                setUserData={setUserData}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                userData={userData}
                setUserData={setUserData}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                token={token}
                setToken={setToken}
                userData={userData}
                setUserData={setUserData}
                msg={msg}
                setMsg={setMsg}
              />
            }
          />
          <Route
            path="/programs"
            element={<Programs userData={userData} setUserData={setUserData} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
