const express = require("express");
const router = express.Router();
const {employeeSignup,employeeLogin,getStudentsByEmployeeId,updateMonthlyEvaluation ,getStudentById,markAttendance } = require("../controllers/employeeAuthControllers"); // ✅ Fixed file name
const EmployeeAuth = require("../middlewares/employeeauth");

// Employee authentication routes
router.post("/signup", employeeSignup);
router.post("/login", employeeLogin);

// Fetch assigned students for an employee
router.get("/assigned-students/:empID", EmployeeAuth, getStudentsByEmployeeId);
router.get("/get-student/:studentId", EmployeeAuth, getStudentById); // ✅ Pluralized route name
router.post("/update-evaluation/:studentId", EmployeeAuth, updateMonthlyEvaluation);

router.post("/mark-attendance", EmployeeAuth, markAttendance);
module.exports = router;
