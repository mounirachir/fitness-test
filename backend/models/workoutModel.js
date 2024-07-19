const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: mongoose.Mixed, required: true }, // Using Mixed to allow both numbers and strings
  rest: { type: String, required: true },
  weight: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [exerciseSchema],
  slug: { type: String },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout, workoutSchema };
