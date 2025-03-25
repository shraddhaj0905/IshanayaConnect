
// const mongoose = require("mongoose");

// const approvedStudentSchema = new mongoose.Schema({
//     student_id: { type: String, unique: true, required: true }, // ✅ Unique Student ID
//     parent_email: { type: String, required: true, unique: true },
//     parent_name: { type: String, required: true },
//     contact_number: { type: String, required: true },
//     address: { type: String, required: true },
//     student_name: { type: String, required: true },
//     dob: { type: Date, required: true },
//     blood_group: { type: String, required: true },
//     gender: { type: String, required: true },
//     disability_type: { type: String, required: true },
//     disability_description: { type: String },
//     special_requirements: { type: String },
//     previous_interventions: { type: String },
//     recommended_programs: { type: String },
//     join_date: { type: Date, required: true, default: Date.now },
//     approved_at: { type: Date, default: Date.now },
//     password: { type: String, required: true }, // ✅ Hashed Password
//     udid: { type: String, required: true, unique: true } // ✅ Added UDID
// });

// module.exports = mongoose.model("ApprovedStudent", approvedStudentSchema);
const mongoose = require("mongoose");

const approvedStudentSchema = new mongoose.Schema({
    student_id: { type: String, unique: true, required: true },
    parent_email: { type: String, required: true, unique: true },
    parent_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    address: { type: String, required: true },
    student_name: { type: String, required: true },
    dob: { type: Date, required: true },
    blood_group: { type: String, required: true },
    gender: { type: String, required: true },
    disability_type: { type: String, required: true },
    disability_description: { type: String },
    special_requirements: { type: String },
    previous_interventions: { type: String },
    recommended_programs: { type: String },
    join_date: { type: Date, required: true, default: Date.now },
    approved_at: { type: Date, default: Date.now },
    password: { type: String, required: true },
    udid: { type: String, required: true, unique: true },

    // Assignments
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "ApprovedEmployee" }, // Assigned Teacher
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Assigned Courses
});

module.exports = mongoose.model("ApprovedStudent", approvedStudentSchema);
