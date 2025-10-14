import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherNavbar from "../components/EmployeeNavbar";

export default function MyStudent() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getInitialLetter = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const fetchAssignedStudents = async () => {
    try {
      const token = localStorage.getItem("employeeToken");
      if (!token) {
        setError("No authentication token found. Please login.");
        setLoading(false);
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const empID = decodedToken.id;

      const response = await fetch(
        `http://localhost:4000/api/employees/assigned-students/${empID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch students.");

      const data = await response.json();
      setStudents(data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedStudents();
  }, []);

  const filteredStudents = Array.isArray(students)
    ? students.filter(
        (student) =>
          student.student_name?.toLowerCase().includes(search.toLowerCase()) ||
          student.student_id?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const getGenderBadge = (gender) => {
    switch ((gender || "").toLowerCase()) {
      case "male":
        return "bg-blue-200 text-blue-800";
      case "female":
        return "bg-pink-200 text-pink-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <div className="p-6 pt-24">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">My Students</h1>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <p className="text-center text-gray-400 mb-6">Total Students: {students.length}</p>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by student name or ID..."
            className="p-2 w-80 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 bg-white text-gray-800 transition duration-200"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student._id}
                className="bg-white shadow-md rounded-lg p-5 text-center transition transform hover:scale-105 hover:shadow-xl border border-gray-200"
              >
                <div className="flex justify-center mb-3">
                  {student.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student.student_name}
                      className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-20 h-20 flex justify-center items-center bg-blue-100 text-blue-800 text-3xl font-bold rounded-full border-2 border-gray-300 shadow-md animate-pulse">
                      {getInitialLetter(student.student_name)}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mt-2">{student.student_name || "N/A"}</h2>
                <p className="text-gray-600 mt-1">ID: {student.student_id || "N/A"}</p>
                <p
                  className={`mt-1 inline-block px-2 py-1 rounded-full text-sm font-medium ${getGenderBadge(
                    student.gender
                  )}`}
                >
                  {student.gender || "N/A"}
                </p>
                <p className="text-gray-600 mt-1">Contact: {student.contact_number || "N/A"}</p>

                {/* Courses */}
                <div className="flex flex-wrap justify-center mt-2 gap-2">
                  {student.courses?.length > 0 ? (
                    student.courses.map((course, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {course.name}
                      </span>
                    ))
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">No Courses</span>
                  )}
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
                  onClick={() => navigate(`/studentdetails/${student._id}`, { state: { student } })}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500 col-span-full">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
