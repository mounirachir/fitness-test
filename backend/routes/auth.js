const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Register (Sign Up) route
router.post("/signup", async (req, res) => {
  try {
    const {
      workout,
      name,
      email,
      password,
      age,
      gender,
      weight,
      height,
      activityLevel,
      program,
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user instance
    user = new User({
      workout,
      name,
      email,
      password,
      age,
      gender,
      weight,
      height,
      activityLevel,
      program,
      score: 0, // Initialize score to 0 during signup
      daysPassed: 0, // Initialize daysPassed
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    const savedUser = await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: savedUser.id,
        score: savedUser.score,
        daysPassed: savedUser.daysPassed,
        name,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: "User registered successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Calculate daysPassed since last login
    const loginDate = Date.now();
    const difference = Math.floor(
      (loginDate - new Date(user.date)) / (1000 * 60 * 60 * 24)
    );

    // Update user's daysPassed
    user.daysPassed = difference;
    const updatedUser = await user.save();

    // Create JWT token with updated score and daysPassed
    const payload = {
      user: {
        id: user.id,
        score: updatedUser.score,
        daysPassed: updatedUser.daysPassed,
        name: user.name,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: updatedUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update user progress route
router.put("/user/:id", async (req, res) => {
  const { score, daysPassed, workout } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.score = score;
    user.daysPassed = daysPassed;
    user.workout = workout; // Update workout field
    user.workoutUpdated = Date.now();

    await user.save();
    res.json({ user, msg: "Workout updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get user data route
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const requestDate = Date.now();
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const dateDifference =
      (requestDate - new Date(user.workoutUpdated)) / (1000 * 60 * 60 * 24);

    if (dateDifference < 1) {
      return res.json({
        user,
        msg: "Your Progress Has Been Saved. Come Back Tomorrow For More Gains!",
      });
    }
    res.json({
      user,
      msg: "",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
