const express = require("express");
const router = express.Router();
const {studentSignup,studentLogin,getOverallAttendance,getFutureAnnouncements,getStudentReport} = require("../controllers/studentAuthController");
const {studentAuth}=require("../middlewares/studentauth")

router.post("/signup", studentSignup);
router.post("/login", studentLogin);
router.get("/attendance/:studentId",studentAuth, getOverallAttendance);
router.get("/announcements", getFutureAnnouncements);
router.get("/report", studentAuth, getStudentReport); // remove :studentId
module.exports = router;
