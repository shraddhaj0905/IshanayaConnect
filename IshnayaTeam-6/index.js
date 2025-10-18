const express = require("express");


const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const Admin = require("./models/admin"); // Import Admin model

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  // origin: "http://localhost:3000",
  origin:"https://ishanayaconnect-2.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/admin", adminRoutes);

// Connect to Database
require("./config/database").connect();

mongoose.connection.once("open", async () => {
  console.log("Database connected");
  await Admin.initializeAdmin(); // Create default admin
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
