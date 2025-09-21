// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const StudentRegistration = require("../models/studentregister");

// const ApprovedStudent = require("../models/approvestudent"); 
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || "babbar";

// // exports.studentSignup = async (req, res) => {
// //   try {
// //     const { parent_name, parent_email, password, contact_number, address, student_name, dob, blood_group, gender, disability_type, disability_description } = req.body;

// //     // Check if email already exists
// //     const existingStudent = await StudentRegistration.findOne({ parent_email });
// //     if (existingStudent) return res.status(400).json({ message: "Email already registered" });

// //     // Hash Password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create Student Registration Entry
// //     const newStudent = new StudentRegistration({
// //       parent_name,
// //       parent_email,
// //       password: hashedPassword,
// //       contact_number,
// //       address,
// //       student_name,
// //       dob,
// //       blood_group,
// //       gender,
// //       disability_type,
// //       disability_description
// //     });

// //     await newStudent.save();
// //     res.status(201).json({ message: "Student registered successfully, pending approval" });

// //   } catch (error) {
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // };

// exports.studentSignup = async (req, res) => {
//   try {
//     const { parent_name, parent_email, password, contact_number, address, student_name, dob, blood_group, gender, disability_type, disability_description, udid } = req.body;

//     // Check if email or UDID already exists
//     const existingStudent = await StudentRegistration.findOne({ 
//       $or: [{ parent_email }, { udid }]
//     });
//     if (existingStudent) return res.status(400).json({ message: "Email or UDID already registered" });

//     // Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create Student Registration Entry
//     const newStudent = new StudentRegistration({
//       parent_name,
//       parent_email,
//       password: hashedPassword,
//       contact_number,
//       address,
//       student_name,
//       dob,
//       blood_group,
//       gender,
//       disability_type,
//       disability_description,
//       udid // ✅ Save UDID in DB
//     });

//     await newStudent.save();
//     res.status(201).json({ message: "Student registered successfully, pending approval" });

//   } catch (error) {
//     console.error("Error registering student:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// };




// exports.studentLogin = async (req, res) => {
//   try {
//     const { parent_email, password } = req.body;

//     // Check if student is approved
//     const student = await ApprovedStudent.findOne({ parent_email });
//     if (!student) return res.status(400).json({ message: "You are not approved yet. Please wait for admin approval." });

//     // Compare Password
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     // Generate Token
//     const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful", token });

//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// exports.getOverallAttendance = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     // Find the student by ID
//     const student = await ApprovedStudent.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Use the attendance array from the student document
//     const attendanceRecords = student.attendance || [];
//     const totalRecords = attendanceRecords.length;

//     // Count how many records are marked as "Present"
//     const presentRecords = attendanceRecords.filter(
//       (record) => record.status === "Present"
//     ).length;

//     // Calculate attendance percentage
//     const attendancePercentage =
//       totalRecords > 0 ? ((presentRecords / totalRecords) * 100).toFixed(2) : 0;

//     // Respond with a summary of the attendance details
//     res.json({
//       student_id: student.student_id,
//       student_name: student.student_name,
//       join_date: student.join_date,
//       total_attendance_records: totalRecords,
//       present_records: presentRecords,
//       attendance_percentage: attendancePercentage,
//     });
//   } catch (error) {
//     console.error("Error computing attendance:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const Announcement = require("../models/announcement");

// // exports.getFutureAnnouncements = async (req, res) => {
// //   try {
// //     const currentDate = new Date();
// //     currentDate.setHours(0, 0, 0, 0); // Normalize the date to avoid time mismatches

// //     // Fetch announcements where the date is in the future
// //     const futureAnnouncements = await Announcement.find({ date: { $gt: currentDate } }).sort({ date: 1 });

// //     res.status(200).json({ announcements: futureAnnouncements });
// //   } catch (error) {
// //     console.error("Error fetching future announcements:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };
// exports.getFutureAnnouncements = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0); // Normalize the date to avoid time mismatches

//     // Fetch future announcements including category
//     const futureAnnouncements = await Announcement.find(
//       { date: { $gt: currentDate } }, 
//       { title: 1, description: 1, date: 1, category: 1 } // Only select necessary fields
//     ).sort({ date: 1 });

//     res.status(200).json({ announcements: futureAnnouncements });
//   } catch (error) {
//     console.error("Error fetching future announcements:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.getStudentReport = async (req, res) => {
//     try {
//         const { studentId } = req.params;

//         // Fetch student details with required fields
//         const student = await ApprovedStudent.findOne({ student_id: studentId }).select(
//             "student_id student_name attendance monthly_evaluation area_to_improve"
//         );

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         // Calculate Monthly Attendance
//         const attendanceSummary = {};
//         student.attendance.forEach(({ date, status }) => {
//             const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
//             if (!attendanceSummary[monthYear]) {
//                 attendanceSummary[monthYear] = { total: 0, present: 0 };
//             }
//             attendanceSummary[monthYear].total++;
//             if (status === "Present") {
//                 attendanceSummary[monthYear].present++;
//             }
//         });

//         // Convert attendance data to percentage
//         const attendanceReport = Object.entries(attendanceSummary).map(([month, { total, present }]) => ({
//             month,
//             attendancePercentage: total > 0 ? ((present / total) * 100).toFixed(2) + "%" : "0%"
//         }));

//         // Construct the report
//         const report = {
//             student_id: student.student_id,
//             student_name: student.student_name,
//             attendance: attendanceReport,
//             monthly_evaluation: student.monthly_evaluation,
//             area_to_improve: student.area_to_improve
//         };

//         res.status(200).json({ message: "Student report generated successfully", report });

//     } catch (error) {
//         console.error("Error generating student report:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };


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
    currentDate.setHours(0, 0, 0, 0); // Normalize the date to avoid time mismatches

    // Fetch future announcements including category
    const futureAnnouncements = await Announcement.find(
      { date: { $gt: currentDate } }, 
      { title: 1, description: 1, date: 1, category: 1 } // Only select necessary fields
    ).sort({ date: 1 });

    res.status(200).json({ announcements: futureAnnouncements });
  } catch (error) {
    console.error("Error fetching future announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.getStudentReport = async (req, res) => {
//     try {
//         const { studentId } = req.params;

//         // Fetch student details with required fields
//         const student = await ApprovedStudent.findOne({ student_id: studentId }).select(
//             "student_id student_name attendance monthly_evaluation area_to_improve"
//         );

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         // Calculate Monthly Attendance
//         const attendanceSummary = {};
//         student.attendance.forEach(({ date, status }) => {
//             const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
//             if (!attendanceSummary[monthYear]) {
//                 attendanceSummary[monthYear] = { total: 0, present: 0 };
//             }
//             attendanceSummary[monthYear].total++;
//             if (status === "Present") {
//                 attendanceSummary[monthYear].present++;
//             }
//         });

//         // Convert attendance data to percentage
//         const attendanceReport = Object.entries(attendanceSummary).map(([month, { total, present }]) => ({
//             month,
//             attendancePercentage: total > 0 ? ((present / total) * 100).toFixed(2) + "%" : "0%"
//         }));

//         // Construct the report
//         const report = {
//             student_id: student.student_id,
//             student_name: student.student_name,
//             attendance: attendanceReport,
//             monthly_evaluation: student.monthly_evaluation,
//             area_to_improve: student.area_to_improve
//         };

//         res.status(200).json({ message: "Student report generated successfully", report });

//     } catch (error) {
//         console.error("Error generating student report:", error);
//         res.status(500).json({ message: "Server error" });
//     }
//     res.status(200).json({ message: "Student report generated successfully", report });

// };
// exports.getStudentReport = async (req, res) => {
//   try {
//     const studentId = req.student.id; // matches JWT

//     console.log("Fetching report for studentId:", studentId);

//     const student = await ApprovedStudent.findById(studentId).select(
//       "student_id student_name attendance monthly_evaluation area_to_improve"
//     );

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     let totalPresent = 0;
//     let totalAbsent = 0;
//     student.attendance.forEach(({ status }) => {
//       if (status === "Present") totalPresent++;
//       else totalAbsent++;
//     });

//     const totalDays = totalPresent + totalAbsent;
//     const attendancePercentage = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(2) : 0;

//     const report = {
//       student_id: student.student_id,
//       student_name: student.student_name,
//       attendance: { present: totalPresent, absent: totalAbsent, percentage: attendancePercentage },
//       monthly_evaluation: student.monthly_evaluation,
//       area_to_improve: student.area_to_improve,
//     };

//     res.status(200).json({ message: "Student report generated successfully", report });
//   } catch (error) {
//     console.error("Error generating student report:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// getStudentReport controller
exports.getStudentReport = async (req, res) => {
  try {
    const studentId = req.student.id || req.student._id; // use JWT id

    const student = await ApprovedStudent.findById(studentId)
      .populate("teacher_id", "name email")
      .populate("courses", "course_name course_code");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // --- Attendance Stats ---
    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(a => a.status === "Present").length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

    // --- Monthly Evaluation ---
    const months = student.monthly_evaluation.map(e => e.month);
    const communicationScores = student.monthly_evaluation.map(e => e.communication.score);
    const cognitionScores = student.monthly_evaluation.map(e => e.cognition.score);
    const academicsScores = student.monthly_evaluation.map(e => e.academics_OBE_Level_A.score);
    const functionalScores = student.monthly_evaluation.map(e => e.functional_skills.score);

    const comments = student.monthly_evaluation.map(e => ({
      month: e.month,
      communication: e.communication.comments,
      cognition: e.cognition.comments,
      academics_OBE_Level_A: e.academics_OBE_Level_A.comments,
      functional_skills: e.functional_skills.comments
    }));

    const report = {
      student_id: student.student_id,
      student_name: student.student_name,
      dob: student.dob,
      disability_type: student.disability_type,
      disability_description: student.disability_description,
      join_date: student.join_date,
      teacher: student.teacher_id,
      courses: student.courses,
      attendance: { totalDays, presentDays, absentDays, attendancePercentage },
      monthlyEvaluation: {
        months,
        communicationScores,
        cognitionScores,
        academicsScores,
        functionalScores,
        comments
      },
      area_to_improve: student.area_to_improve
    };

    res.status(200).json({ message: "Report generated successfully", report });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

