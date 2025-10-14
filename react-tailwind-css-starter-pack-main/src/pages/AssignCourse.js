import React, { useState, useEffect } from "react";
import { User } from "lucide-react";

const AssignCourse = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, []);

 const fetchStudents = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    const response = await fetch(
      "http://localhost:4000/api/admin/unassigned",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch students");

    // Set only the array of students
    setStudents(data.students || []); 
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};


  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const response = await fetch(
        "http://localhost:4000/api/admin/get-approve-employee",
        { headers: { Authorization: `Bearer ${token}` } } // fixed template literal
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch teachers");
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const response = await fetch(
        "http://localhost:4000/api/admin/get-courses",
        { headers: { Authorization: `Bearer ${token}` } } // fixed template literal
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTeacher || !selectedCourse) {
      return alert("Please select both a teacher and a course.");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      const teacherResponse = await fetch(
        "http://localhost:4000/api/admin/assign-teacher",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // fixed template literal
          },
          body: JSON.stringify({
            student_id: selectedStudent.student_id,
            emp_reg_id: selectedTeacher,
          }),
        }
      );
      if (!teacherResponse.ok) throw new Error("Failed to assign teacher");

      const courseResponse = await fetch(
        "http://localhost:4000/api/admin/assign-course",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // fixed template literal
          },
          body: JSON.stringify({
            student_id: selectedStudent.student_id,
            courseId: selectedCourse,
          }),
        }
      );
      if (!courseResponse.ok) throw new Error("Failed to assign course");

      alert(`✅ Assigned ${selectedStudent.student_name} successfully`); // fixed template literal
      setSelectedStudent(null);
      setSelectedTeacher("");
      setSelectedCourse("");
    } catch (error) {
      console.error(error);
      alert("Error while assigning. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-indigo-700">
            Ishanya Foundation <span className="font-normal">- Admin</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-700">
            <User className="text-indigo-600" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-10 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-3">Approved Students</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Assign courses and teachers to students easily from here.
        </p>
      </section>

      {/* Students Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.student_id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="mb-4">
                <p className="font-semibold text-gray-800">{student.student_name}</p>
                <p className="text-gray-500 text-sm">UDID: {student.udid}</p>
                <p className="text-gray-500 text-sm">Disability: {student.disability_type}</p>
              </div>
              <button
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-2 rounded-md text-sm transition"
                onClick={() => setSelectedStudent(student)}
              >
                Assign
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No students found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-indigo-700 border-b pb-2">
              Assign Course & Teacher
            </h3>

            <div className="mb-4 bg-indigo-50 p-3 rounded-lg">
              <p className="font-semibold text-gray-800">👤 {selectedStudent.student_name}</p>
              <p className="text-sm text-gray-600">UDID: {selectedStudent.udid}</p>
              <p className="text-sm text-gray-600">Disability: {selectedStudent.disability_type}</p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Teacher:</label>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => (
                    <option key={t.emp_reg_id} value={t.emp_reg_id}>
                      {t.emp_reg_id} - {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Course:</label>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.courseId} value={c.courseId}>
                      {c.courseId} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignCourse;
