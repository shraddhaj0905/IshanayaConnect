import React, { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";


const EnrolledEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchEmployees = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.error("No token found, please login.");
      return;
    }


    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/get-approve-employee",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }


      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);


  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-1 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">
        Enrolled Employees
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Manage your employees — view details of approved employees.
      </p>


      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee.email}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col justify-between"
            >
              {/* Avatar + Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-lg font-semibold">
                  {employee.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="ml-4">
                  <h2 className="text-md font-semibold text-gray-800">
                    {employee.name}
                  </h2>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              </div>


              {/* Right-aligned View Button */}
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleViewEmployee(employee)}
                  className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md text-sm hover:bg-gray-200 transition inline-flex items-center"
                >
                  View
                  <Eye size={16} className="inline-block ml-1" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 italic">
            No approved employees found.
          </div>
        )}
      </div>


      {isModalOpen && selectedEmployee && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        onClick={() => setIsModalOpen(false)}
      >
        <X size={24} />
      </button>


      {/* Header */}
      <h2 className="text-xl font-bold text-center text-indigo-700 mb-4">
        Employee Profile
      </h2>


      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-semibold">
          {selectedEmployee.name?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>


      {/* Name & Email */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {selectedEmployee.name}
        </h3>
        <p className="text-sm text-gray-500">{selectedEmployee.email}</p>
      </div>


      <div className="space-y-8 text-gray-700">
        <div className="flex items-center bg-indigo-50 rounded-lg p-3 shadow-sm">
          <span className="mr-3 text-indigo-500 text-lg">📞</span>
          <span>
            <strong>Contact:</strong> {selectedEmployee.contact_number}
          </span>
        </div>


        <div className="flex items-center bg-indigo-50 rounded-lg p-3 shadow-sm">
          <span className="mr-3 text-indigo-500 text-lg">🏠</span>
          <span>
            <strong>Address:</strong> {selectedEmployee.address}
          </span>
        </div>


        <div className="flex items-center bg-indigo-50 rounded-lg p-3 shadow-sm">
          <span className="mr-3 text-indigo-500 text-lg">🎓</span>
          <span>
            <strong>Qualification:</strong> {selectedEmployee.qualifications}
          </span>
        </div>


        <div className="flex items-center bg-indigo-50 rounded-lg p-3 shadow-sm">
          <span className="mr-3 text-indigo-500 text-lg">💼</span>
          <span>
            <strong>Experience:</strong> {selectedEmployee.experience} years
          </span>
        </div>
      </div>


      {/* Skills */}
      <div className="mt-4">
        <strong className="text-sm text-gray-700">Skills:</strong>
        <div className="flex flex-wrap mt-2 gap-2">
          {selectedEmployee.skills?.length > 0 ? (
            selectedEmployee.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">N/A</p>
          )}
        </div>
      </div>


      {/* Close button */}
      <div className="mt-6 flex justify-center">
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


export default EnrolledEmployees;



