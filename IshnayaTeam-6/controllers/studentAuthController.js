const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const StudentRegistration = require("../models/studentregister");

const ApprovedStudent = require("../models/approvestudent"); 
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "babbar";

exports.studentSignup = async (req, res) => {
  try {
    const { parent_name, parent_email, password, contact_number, address, student_name, dob, blood_group, gender, disability_type, disability_description, udid } = req.body;

    // Check if email or UDID already exists
    const existingStudent = await StudentRegistration.findOne({ 
      $or: [{ parent_email }, { udid }]
    });
    if (existingStudent) return res.status(400).json({ message: "Email or UDID already registered" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Student Registration Entry
    const newStudent = new StudentRegistration({
      parent_name,
      parent_email,
      password: hashedPassword,
      contact_number,
      address,
      student_name,
      dob,
      blood_group,
      gender,
      disability_type,
      disability_description,
      udid // ✅ Save UDID in DB
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully, pending approval" });

  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


exports.studentLogin = async (req, res) => {
  try {
    const { parent_email, password } = req.body;

    // Check if student is approved
    const student = await ApprovedStudent.findOne({ parent_email });
    if (!student) return res.status(400).json({ message: "You are not approved yet. Please wait for admin approval." });

    // Compare Password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate Token
    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getOverallAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student by ID
    const student = await ApprovedStudent.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Use the attendance array from the student document
    const attendanceRecords = student.attendance || [];
    const totalRecords = attendanceRecords.length;

    // Count how many records are marked as "Present"
    const presentRecords = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;

    // Calculate attendance percentage
    const attendancePercentage =
      totalRecords > 0 ? ((presentRecords / totalRecords) * 100).toFixed(2) : 0;

    // Respond with a summary of the attendance details
    res.json({
      student_id: student.student_id,
      student_name: student.student_name,
      join_date: student.join_date,
      total_attendance_records: totalRecords,
      present_records: presentRecords,
      attendance_percentage: attendancePercentage,
    });
  } catch (error) {
    console.error("Error computing attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const Announcement = require("../models/announcement");

exports.getFutureAnnouncements = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to start of the day

    // ✅ Delete announcements that are older than today
    await Announcement.deleteMany({ date: { $lt: currentDate } });

    // ✅ Fetch announcements for today and the future
    const futureAnnouncements = await Announcement.find(
      { date: { $gte: currentDate } }, 
      { title: 1, description: 1, date: 1, category: 1 } // Only required fields
    ).sort({ date: 1 });

    res.status(200).json({
      count: futureAnnouncements.length,
      announcements: futureAnnouncements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getStudentReport = async (req, res) => {
  try {
    const studentId = req.student.id || req.student._id; // JWT id


    const student = await ApprovedStudent.findById(studentId)
      .populate("teacher_id", "name email")
      .populate("courses", "course_name course_code");


    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    // Return student document as-is, with populated fields
    const report = {
      student_id: student.student_id,
      student_name: student.student_name,
      dob: student.dob,
      disability_type: student.disability_type,
      disability_description: student.disability_description,
      join_date: student.join_date,
      teacher: student.teacher_id, // populated teacher
      courses: student.courses,    // populated courses
      attendance: student.attendance, // full attendance array
      monthly_evaluation: student.monthly_evaluation, // full monthly evaluation array
    };


    res.status(200).json({
      message: "Report generated successfully",
      report,
    });


  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



