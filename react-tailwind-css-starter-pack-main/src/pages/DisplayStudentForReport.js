import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherNavbar from "../components/EmployeeNavbar";
import { User } from "lucide-react"; // Icon for students
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState(""); // Added state for search
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) return;


        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const empID = decodedToken.id;
        if (!empID) return;


        const response = await fetch(
          `${BACKEND_URL}/api/employees/assigned-students/${empID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();
        if (response.ok) setStudents(data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };


    fetchStudents();
  }, []);


  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.student_name.toLowerCase().includes(search.toLowerCase()) ||
      student.udid.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />


      <div className="container mx-auto pt-24 pb-12 px-6 md:px-12">
        <h1 className="text-4xl font-bold text-indigo-800 mb-12 text-center">
          Student Progress Reports
        </h1>


        {/* Search Box */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by student name or ID..."
            className="p-2 w-80 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 bg-white text-gray-800 transition duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredStudents.map((student) => (
              <div
                key={student.udid}
                className="flex flex-col justify-between p-6 bg-white
                           rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                {/* Icon + Info */}
                <div className="flex items-center mb-4">
                  <User className="w-8 h-8 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {student.student_name}
                    </p>
                    <p className="text-gray-600 text-md">UDID: {student.udid}</p>
                  </div>
                </div>


                {/* Edit Report Button */}
                <button
                  className="mt-auto bg-indigo-300 text-white px-5 py-2.5 rounded-lg
                             font-medium shadow hover:bg-indigo-500 transition"
                  onClick={() =>
                    navigate(`/edit-report/${student.student_id}`, {
                      state: { student },
                    })
                  }
                >
                  Edit Report
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No students found</p>
        )}
      </div>
    </div>
  );
};


export default AllStudents;





