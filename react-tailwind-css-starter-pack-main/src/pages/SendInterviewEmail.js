
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

const RegisteredEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Unauthorized! Please log in.");

        const response = await fetch(
          "http://localhost:4000/api/admin/get-register-employee",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch employees");

        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) =>
    setInterviewDetails({ ...interviewDetails, [e.target.name]: e.target.value });

  const sendInterviewEmail = async () => {
    if (!selectedEmployee) return alert("No employee selected!");
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:4000/api/admin/send-interwiew-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          email: selectedEmployee.email,
          name: selectedEmployee.name,
          interview_date: interviewDetails.date,
          interview_time: interviewDetails.time,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send email");

      alert(`Interview email sent to ${selectedEmployee.name} ✅`);
      setSelectedEmployee(null);
      setInterviewDetails({ date: "", time: "" });
    } catch (error) {
      console.error(error);
      alert("Error sending email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const rejectEmployee = async (employee) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:4000/api/admin/reject-before",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: employee.email }), // send email, not id
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reject employee");

      alert(`${employee.name} has been rejected ❌`);
      setEmployees(employees.filter((e) => e._id !== employee._id));
    } catch (error) {
      console.error(error);
      alert("Error rejecting employee. Try again.");
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

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-10 text-center">
        <h2 className="text-3xl font-bold  text-indigo-700 mb-3">
          Registered Employees
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your employees easily — view their details, send interview emails, or reject applications, all from one place.
        </p>
      </section>

      {/* Employees Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-lg font-semibold">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{employee.name}</p>
                <p className="text-gray-500 text-sm">{employee.email}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition"
                onClick={() => setViewEmployee(employee)}
              >
                View
              </button>
              <button
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md text-sm transition"
                onClick={() => setSelectedEmployee(employee)}
              >
                Email
              </button>
              <button
                className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition"
                onClick={() => rejectEmployee(employee)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              Schedule Interview for {selectedEmployee.name}
            </h3>

            <label className="block mb-2 text-gray-700">Interview Date:</label>
            <input
              type="date"
              name="date"
              value={interviewDetails.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-1 focus:ring-indigo-400"
            />

            <label className="block mb-2 text-gray-700">Interview Time:</label>
            <input
              type="time"
              name="time"
              value={interviewDetails.time}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-1 focus:ring-indigo-400"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={sendInterviewEmail}
                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {/* View Employee Modal */}
      {viewEmployee && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[28rem] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [&_scrollbar-width:none] border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-700">
          Employee Profile
        </h3>
        <button
          onClick={() => setViewEmployee(null)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
          {viewEmployee.name.charAt(0).toUpperCase()}
        </div>
        <h4 className="mt-3 text-lg font-semibold text-gray-800">
          {viewEmployee.name}
        </h4>
        <p className="text-sm text-gray-500">{viewEmployee.email}</p>
      </div>

      {/* Details Section */}
      <div className="space-y-4 text-gray-700">
        {viewEmployee.contact_number && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">📞 Contact:</span>{" "}
              {viewEmployee.contact_number}
            </p>
          </div>
        )}
        {viewEmployee.address && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🏠 Address:</span>{" "}
              {viewEmployee.address}
            </p>
          </div>
        )}
        {viewEmployee.qualifications && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🎓 Qualification:</span>{" "}
              {viewEmployee.qualifications}
            </p>
          </div>
        )}
        {viewEmployee.experience && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">💼 Experience:</span>{" "}
              {viewEmployee.experience}
            </p>
          </div>
        )}
        {viewEmployee.skills && viewEmployee.skills.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="font-semibold mb-2">🛠 Skills:</p>
            <div className="flex flex-wrap gap-2">
              {viewEmployee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setViewEmployee(null)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
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

export default RegisteredEmployees;
