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
// const allowedOrigins = [
//   "https://ishanayaconnect-gwde.vercel.app", // your Vercel frontend
//   "https://ishanayaconnect-2.onrender.com",  // existing allowed origin
//   "http://localhost:3000"                    // local testing
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

app.use(cors({
  origin: true,
  credentials: true
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
