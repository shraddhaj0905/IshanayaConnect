const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeAuthControllers"); // ✅ Fixed file name
const EmployeeAuth = require("../middlewares/employeeauth");

// Employee authentication routes
router.post("/signup", employeeController.employeeSignup);
router.post("/login", employeeController.employeeLogin);

// Fetch assigned students for an employee
router.get("/assigned-students/:empID", EmployeeAuth, employeeController.getStudentsByEmployeeId); // ✅ Pluralized route name

module.exports = router;
