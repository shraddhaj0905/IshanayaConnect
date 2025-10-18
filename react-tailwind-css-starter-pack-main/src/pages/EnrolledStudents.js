import React, { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const EnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchApprovedStudents = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found, please login.");
        return;
      }


      try {
        const response = await fetch(
         `${BACKEND_URL}/api/admin/get-approve-student`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (!response.ok) {
          throw new Error("Failed to fetch approved students");
        }


        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching approved students:", error);
      }
    };


    fetchApprovedStudents();
  }, []);


  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };


  // Helper for creating info blocks with icon + label + value
  const InfoBlock = ({ icon, label, value }) => (
    <div className="flex items-center bg-indigo-50 rounded-lg p-3 shadow-sm">
      <span className="mr-3 text-indigo-500 text-lg">{icon}</span>
      <span>
        <strong>{label}:</strong> {value || "N/A"}
      </span>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">
        Enrolled Students
      </h1>
      <p className="text-center text-gray-600 mb-10">
        View detailed information about approved students.
      </p>


      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.student_id}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col justify-between"
            >
              {/* Avatar + Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-lg font-semibold">
                  {student.student_name?.charAt(0).toUpperCase() || "S"}
                </div>
                <div className="ml-4">
                  <h2 className="text-md font-semibold text-gray-800">
                    {student.student_name}
                  </h2>
                  <p className="text-sm text-gray-500">{student.student_id}</p>
                </div>
              </div>


              {/* Disability Type */}
              <div className="text-sm text-gray-700 mb-4">
                <strong>Disability Type:</strong> {student.disability_type || "N/A"}
              </div>


              {/* View Button aligned right */}
              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => handleViewStudent(student)}
                  className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md text-sm hover:bg-gray-200 transition inline-flex items-center"
                >
                  View
                  <Eye size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 italic">
            No enrolled students found.
          </div>
        )}
      </div>


      {/* Modal */}
      {/* Modal */}
{isModalOpen && selectedStudent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        onClick={() => setIsModalOpen(false)}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>


      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-5">
        Student Profile
      </h2>


      {/* Avatar */}
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-semibold">
          {selectedStudent.student_name?.charAt(0).toUpperCase() || "S"}
        </div>
      </div>


      {/* Name & ID */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedStudent.student_name}
        </h3>
        <p className="text-sm text-gray-500">{selectedStudent.student_id}</p>
      </div>


      {/* Info grid: two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
        <InfoBlock icon="📧" label="Parent Email" value={selectedStudent.parent_email} />
        <InfoBlock icon="📞" label="Contact Number" value={selectedStudent.contact_number} />
        <InfoBlock icon="🏠" label="Address" value={selectedStudent.address} />
        <InfoBlock icon="🎂" label="Date of Birth" value={new Date(selectedStudent.dob).toDateString()} />
        <InfoBlock icon="⚥" label="Gender" value={selectedStudent.gender} />
        <InfoBlock icon="🩸" label="Blood Group" value={selectedStudent.blood_group} />
        <InfoBlock icon="♿" label="Disability Type" value={selectedStudent.disability_type} />
        <InfoBlock icon="📋" label="Disability Description" value={selectedStudent.disability_description} />
        <InfoBlock icon="⭐" label="Special Requirements" value={selectedStudent.special_requirements} />
        <InfoBlock icon="✅" label="Approved Date" value={new Date(selectedStudent.approved_at).toDateString()} />
      </div>


      {/* Close button */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};


export default EnrolledStudents;



