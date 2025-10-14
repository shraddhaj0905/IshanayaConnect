const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const StudentRegistration = require("../models/studentregister"); // Pending students database
const ApprovedStudent = require("../models/approvestudent"); // Approved students database
const EmployeeRegistration = require("../models/employeeregister"); // Registered employees
const ApprovedEmployee = require("../models/approveemployee"); // Approved employees
const Admin = require("../models/admin");
const Course = require("../models/course");
const Announcement = require("../models/announcement");



exports.approveStudent = async (req, res) => {
  try {
    const { udid } = req.params;

    const student = await StudentRegistration.findOne({ udid });
    if (!student) return res.status(404).json({ message: "Student not found for the given UDID." });

    const alreadyApproved = await ApprovedStudent.findOne({ udid });
    if (alreadyApproved) return res.status(400).json({ message: "Student is already approved." });

    let student_id;
    let isUnique = false;
    while (!isUnique) {
      student_id = `STU-${Math.floor(100000 + Math.random() * 900000)}`;
      const existingStudent = await ApprovedStudent.findOne({ student_id });
      if (!existingStudent) isUnique = true;
    }

    const approvedStudent = new ApprovedStudent({
      student_id,
      parent_email: student.parent_email,
      parent_name: student.parent_name,
      contact_number: student.contact_number,
      address: student.address,
      student_name: student.student_name,
      dob: student.dob,
      blood_group: student.blood_group,
      gender: student.gender,
      disability_type: student.disability_type,
      disability_description: student.disability_description,
      special_requirements: student.special_requirements,
      previous_interventions: student.previous_interventions,
      recommended_programs: "",
      join_date: new Date(),
      approved_at: new Date(),
      password: student.password,
      udid: student.udid
    });

    await approvedStudent.save();
    await StudentRegistration.deleteOne({ udid });

    // ----------------- SEND EMAIL -----------------
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.MAIL_USER, // your email
        pass: process.env.MAIL_PASS, // your email password / app password
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: student.parent_email,
      subject: "Admission Visit Scheduled - Ishanya Foundation",
      html: `
        <h3>Dear ${student.parent_name},</h3>
        <p>We are pleased to inform you that your child <strong>${student.student_name}</strong> has been approved to proceed with the admission process.</p>
        <p>Please visit our center for the admission completion process. You can schedule your visit at a convenient date and time.</p>
        <p><strong>UDID:</strong> ${student.udid}</p>
        <p>Thank you,<br/>Ishanya Foundation</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "Student approved successfully and email sent!", approvedStudent });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const { udid } = req.params;

    // Find the student first
    const student = await StudentRegistration.findOne({ udid });

    if (!student) {
      return res.status(404).json({ message: "Student not found for the given UDID." });
    }

    // Create nodemailer transporter inside the controller
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your email
        pass: process.env.MAIL_PASS, // app password or real password
      },
    });

    // Send polite rejection email to parent
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: student.parent_email,
      subject: "Admission Update - Ishanya Foundation",
      html: `
        <p>Dear ${student.parent_name},</p>
        <p>Thank you for your interest in enrolling ${student.student_name} at Ishanya Foundation.</p>
        <p>After careful consideration, we regret to inform you that we are currently unable to provide the specialized support required for ${student.student_name} at our institution.</p>
        <p>We truly appreciate your understanding and wish you the very best in finding the appropriate program that can cater to their needs.</p>
        <p>Sincerely,<br/>Ishanya Foundation Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Delete the student after sending email
    const deletedStudent = await StudentRegistration.findOneAndDelete({ udid });

    res.status(200).json({
      message: `Student with UDID: ${udid} has been removed successfully and parent has been notified via email.`,
      deletedStudent,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await StudentRegistration.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

exports.getApprovedStudents = async (req, res) => {
  try {
    const approvedStudents = await ApprovedStudent.find();
    res.status(200).json(approvedStudents);
  } catch (error) {
    console.error("Error fetching approved students:", error);
    res.status(500).json({ message: "Error fetching approved students", error: error.message });
  }
};

exports.sendAppointmentEmails = async (req, res) => {
  try {
    const { email, udid, date, time } = req.body;
    if (!email || !udid || !date || !time) {
      return res.status(400).json({ message: "Email, UDID, date, and time are required" });
    }

    const lowerCaseEmail = email.toLowerCase();
    const student = await StudentRegistration.findOne({ parent_email: lowerCaseEmail });
    if (!student) return res.status(404).json({ message: "Student not found in the registered database" });

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      return res.status(500).json({ error: "Email configuration missing" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: lowerCaseEmail,
      subject: "Appointment Confirmation",
      html: `
        <h2>Appointment Confirmation</h2>
        <p>Your appointment for Student <b>UDID: ${udid}</b> is confirmed on <b>${date}</b> at <b>${time}</b>.</p>
        <p>Best Regards,<br><b>Admin Team</b></p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Appointment email sent successfully" });
  } catch (error) {
    console.error("Error in sendAppointmentEmails:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// ------------------------ EMPLOYEES ------------------------

exports.approveEmployee = async (req, res) => {
  try {
    const { email, adminId } = req.body;

    const employee = await EmployeeRegistration.findOne({ email });
    if (!employee) return res.status(404).json({ message: "Employee not found for the given email." });

    const alreadyApproved = await ApprovedEmployee.findOne({ email });
    if (alreadyApproved) return res.status(400).json({ message: "Employee is already approved." });

    let emp_reg_id;
    let isUnique = false;
    while (!isUnique) {
      emp_reg_id = `EMP-${Math.floor(100000 + Math.random() * 900000)}`;
      const existingEmployee = await ApprovedEmployee.findOne({ emp_reg_id });
      if (!existingEmployee) isUnique = true;
    }

    const approvedEmployee = new ApprovedEmployee({
      emp_reg_id,
      name: employee.name,
      email: employee.email,
      contact_number: employee.contact_number,
      address: employee.address,
      qualifications: employee.qualifications,
      experience: employee.experience,
      skills: employee.skills,
      resume: employee.resume,
      join_date: new Date(),
      approved_at: new Date(),
      password: employee.password
    });
    await approvedEmployee.save();
    await EmployeeRegistration.deleteOne({ email });

    await Admin.findByIdAndUpdate(adminId, {
      $pull: { interviewsScheduled: { candidateEmail: email } }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: `Admin Team <${process.env.MAIL_USER}>`,
      to: employee.email,
      subject: "Congratulations! You have been selected 🎉",
      text: `Dear ${employee.name},\n\nCongratulations! 🎊\n\nYou have successfully cleared the interview and are now an approved employee in our organization.\n\nWe are excited to have you onboard!\n\nBest Regards,\nAdmin Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Employee approved successfully and email sent!",
      approvedEmployee
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.rejectEmployee = async (req, res) => {
  try {
    const { email, adminId } = req.body;
    const employee = await EmployeeRegistration.findOne({ email });
    if (!employee) return res.status(404).json({ message: "Employee not found for the given email." });

    await EmployeeRegistration.deleteOne({ email });

    await Admin.findByIdAndUpdate(adminId, {
      $pull: { interviewsScheduled: { candidateEmail: email } }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });

    const mailOptions = {
      from: `Admin Team <${process.env.MAIL_USER}>`,
      to: employee.email,
      subject: "Interview Update",
      text: `Dear ${employee.name},\n\nThank you for attending the interview.\n\nWe regret to inform you that you have not been selected at this time.\n\nWe wish you the best in your future endeavors.\n\nBest Regards,\nAdmin Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Employee rejected successfully and email sent!" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


exports.rejectEmployeewithoutemail = async (req, res) => {
  try {
    const { email } = req.body;

    // Find employee by email
    const employee = await EmployeeRegistration.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found for the given email." });
    }

    // Delete only from EmployeeRegistration
    await EmployeeRegistration.deleteOne({ email });

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // Rejection mail
    const mailOptions = {
      from: `Admin Team <${process.env.MAIL_USER}>`,
      to: employee.email,
      subject: "Interview Update",
      text: `Dear ${employee.name},\n\nThank you for your application.\n\nWe regret to inform you that you have not been selected at this time.\n\nWe wish you the best in your future endeavors.\n\nBest Regards,\nAdmin Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Employee rejected successfully and email sent!" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getRegisteredEmployees = async (req, res) => {
  try {
    // Fetch only employees with status "Registred"
    const registeredEmployees = await EmployeeRegistration.find({ status: "Registred" });
    res.status(200).json(registeredEmployees);
  } catch (error) {
    console.error("Error fetching registered employees:", error);
    res.status(500).json({ message: "Error fetching registered employees", error: error.message });
  }
};

exports.getApprovedEmployees = async (req, res) => {
  try {
    const approvedEmployees = await ApprovedEmployee.find();
    res.status(200).json(approvedEmployees);
  } catch (error) {
    console.error("Error fetching approved employees:", error);
    res.status(500).json({ message: "Error fetching approved employees", error: error.message });
  }
};

// ------------------------ ADMIN ------------------------

exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin with this email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "New admin added successfully!", newAdmin });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ------------------------ INTERVIEWS ------------------------

exports.sendInterviewEmail = async (req, res) => {
  try {
    const { email, name, interview_date, interview_time } = req.body;
    if (!email || !name || !interview_date || !interview_time) {
      return res.status(400).json({ message: "Email, name, interview date, and interview time are required" });
    }

    const lowerCaseEmail = email.toLowerCase();
    const employee = await EmployeeRegistration.findOne({ email: lowerCaseEmail });
    if (!employee) return res.status(404).json({ message: "Employee not found in the registered database" });

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) return res.status(500).json({ error: "Email configuration missing" });

    const uniqueId = crypto.randomBytes(6).toString("hex");
    const meetingLink = `https://meet.jit.si/interview-${name}-${uniqueId}`;

    employee.status = "Pending";
    await employee.save();

    const adminId = req.admin.id;
    await Admin.findByIdAndUpdate(
      adminId,
      { $push: { interviewsScheduled: { interviewer: employee._id, candidateName: name, interviewDate: interview_date, interviewTime: interview_time, meetingLink } } },
      { new: true }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: lowerCaseEmail,
      subject: "Interview Confirmation",
      html: `
        <h2>Interview Confirmation</h2>
        <p>Dear <b>${name}</b>,</p>
        <p>Your interview is scheduled on <b>${interview_date}</b> at <b>${interview_time}</b>.</p>
        <p>Join using this link: <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
        <p>Best Regards,<br><b>HR Team</b></p>
      `
    };

    res.status(200).json({ message: "Interview scheduled and email is being sent", meetingLink });

    transporter.sendMail(mailOptions).then(info => console.log("✅ Email sent:", info.response)).catch(error => console.error("❌ Email error:", error));
  } catch (error) {
    console.error("❌ Error in sendInterviewEmail:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.getScheduledInterviews = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).populate("interviewsScheduled.interviewer", "name email status");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({
      message: "Scheduled interviews fetched successfully",
      interviews: admin.interviewsScheduled.map(interview => ({
        candidateName: interview.candidateName,
        interviewDate: interview.interviewDate,
        interviewTime: interview.interviewTime,
        meetingLink: interview.meetingLink,
        interviewer: interview.interviewer
      }))
    });
  } catch (error) {
    console.error("❌ Error fetching scheduled interviews:", error);
    res.status(500).json({ error: "Failed to fetch scheduled interviews" });
  }
};

// ------------------------ TEACHER-STUDENT & COURSES ------------------------

exports.assignTeacherToStudent = async (req, res) => {
  try {
    const { student_id, emp_reg_id } = req.body;

    const student = await ApprovedStudent.findOne({ student_id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const teacher = await ApprovedEmployee.findOne({ emp_reg_id });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    student.teacher_id = teacher._id;
    await student.save();

    if (!teacher.assigned_students.includes(student._id)) {
      teacher.assigned_students.push(student._id);
      await teacher.save();
    }

    res.status(200).json({ message: "Teacher assigned successfully", student, teacher });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { courseId, name, ageGroup, skillAreas } = req.body;

    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) return res.status(400).json({ message: "Course with this ID already exists" });

    const newCourse = new Course({ courseId, name, ageGroup, skillAreas });
    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error while fetching courses" });
  }
};

exports.assignCourseToStudent = async (req, res) => {
  try {
    const { student_id, courseId } = req.body;

    const student = await ApprovedStudent.findOne({ student_id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    student.courses = course._id; // just assign, no array operations
    await student.save();

    res.status(200).json({ message: "Course assigned successfully", student, course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





// Get students without assigned teacher AND without assigned course
exports.getUnassignedStudents = async (req, res) => {
  try {
    const students = await ApprovedStudent.find({
      $or: [
        { teacher_id: { $exists: false } },
        { teacher_id: null }
      ],
      $or: [
        { courses: { $exists: false } },
        { courses: null }
      ]
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// ------------------------ ANNOUNCEMENTS ------------------------

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    if (!title || !description || !date || !category) return res.status(400).json({ message: "Title, description, date, and category are required" });

    const allowedCategories = ["Holiday", "Events", "Urgent"];
    if (!allowedCategories.includes(category)) return res.status(400).json({ message: "Invalid category. Allowed values: Holiday, Events, Urgent" });

    const currentDate = new Date();
    const announcementDate = new Date(date);
    if (announcementDate <= currentDate) return res.status(400).json({ message: "Date must be in the future" });

    const announcement = new Announcement({ title, description, date: announcementDate, category });
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};
