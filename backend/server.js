const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workouts", require("./routes/workout")); // Register the new workout route

app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
