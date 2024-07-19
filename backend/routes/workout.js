const express = require("express");
const router = express.Router();
const { Workout } = require("../models/workoutModel");

// Get workout plan by ID
router.get("/:slug", async (req, res) => {
  try {
    const name = req.params.slug.split("-").join("/");
    const workout = await Workout.findOne({ name });
    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }
    res.json(workout);
  } catch (err) {
    console.error(err); // Log the full error for debugging
    res.status(500).send("Server Error");
  }
});

module.exports = router;
