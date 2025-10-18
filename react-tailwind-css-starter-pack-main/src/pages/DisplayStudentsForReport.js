import React from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const AllStudents = () => {
  // Hardcoded student data
  const students = [
    { id: 101, name: "Aarav Sharma", course: "Mathematics" },
    { id: 102, name: "Diya Verma", course: "Science" },
    { id: 103, name: "Kabir Iyer", course: "English" },
  ];

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">All Students</h1>

      <table className="w-full border-collapse border border-gray-300 shadow-md bg-white">
        <thead>
          <tr className="bg-indigo-500 text-white">
            <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-gray-700 text-center">
              <td className="p-2 border">{student.id}</td>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.course}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => navigate(`/edit-report/${student.id}`, { state: { student } })}
                >
                  Edit Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
