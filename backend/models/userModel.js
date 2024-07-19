const mongoose = require("mongoose");
const { workoutSchema } = require("./workoutModel");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    workout: {
      type: workoutSchema,
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    weight: { type: Number },
    height: { type: Number },
    activityLevel: { type: String },
    program: [{ type: String }], // Assuming program can be an array of strings
    score: { type: Number, default: 0 },
    daysPassed: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    workoutUpdated: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
