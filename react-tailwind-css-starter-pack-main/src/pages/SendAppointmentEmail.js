
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

const SendAppointmentEmail = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  // Fetch registered students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Unauthorized! Please log in.");

        const response = await fetch("http://localhost:4000/api/admin/get-register-student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch students");

        setStudents(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching students.");
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) =>
    setAppointmentDetails({ ...appointmentDetails, [e.target.name]: e.target.value });

  const sendAppointmentEmail = async () => {
    if (!selectedStudent) return alert("No student selected!");
    if (!appointmentDetails.date || !appointmentDetails.time) return alert("Select date & time");

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:4000/api/admin/send-appointment-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          email: selectedStudent.parent_email,
          udid: selectedStudent.udid,
          date: appointmentDetails.date,
          time: appointmentDetails.time,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send email");

      alert(`Appointment email sent for UDID: ${selectedStudent.udid} ✅`);
      setSelectedStudent(null);
      setAppointmentDetails({ date: "", time: "" });
    } catch (error) {
      console.error(error);
      alert("Error sending email.");
    } finally {
      setLoading(false);
    }
  };

 const rejectStudent = async (student) => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(`http://localhost:4000/api/admin/delete-student/${student.udid}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to reject student");

    alert(`Student UDID: ${student.udid} rejected ❌ and parent notified via email.`);
    setStudents(students.filter((s) => s._id !== student._id));
  } catch (error) {
    console.error(error);
    alert("Error rejecting student.");
  }
};


  const approveStudent = async (student) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:4000/api/admin/approve-student/${student.udid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to approve student");

      alert(`Student UDID: ${student.udid} approved ✅`);
      setStudents(students.filter((s) => s._id !== student._id));
    } catch (error) {
      console.error(error);
      alert("Error approving student.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
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
        <h2 className="text-3xl font-bold text-indigo-700 mb-3">Registered Students</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your students — view details, send appointment emails, approve or reject them.
        </p>
      </section>

      {/* Students Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-lg font-semibold">
                {student.udid.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{student.udid}</p>
                <p className="text-gray-500 text-sm">{student.parent_email}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition"
                onClick={() => setViewStudent(student)}
              >
                View
              </button>
              <button
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md text-sm transition"
                onClick={() => setSelectedStudent(student)}
              >
                Email
              </button>
              <button
                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm transition"
                onClick={() => approveStudent(student)}
              >
                Approve
              </button>
              <button
                className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition"
                onClick={() => rejectStudent(student)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              Schedule Appointment for UDID: {selectedStudent.udid}
            </h3>

            <label className="block mb-2 text-gray-700">Appointment Date:</label>
            <input
              type="date"
              name="date"
              value={appointmentDetails.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-1 focus:ring-indigo-400"
            />

            <label className="block mb-2 text-gray-700">Appointment Time:</label>
            <input
              type="time"
              name="time"
              value={appointmentDetails.time}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-1 focus:ring-indigo-400"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={sendAppointmentEmail}
                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {/* View Student Modal */}
      {/* View Student Modal */}
{viewStudent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[28rem] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [&_scrollbar-width:none] border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-700">Student Profile</h3>
        <button
          onClick={() => setViewStudent(null)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
          {viewStudent.student_name.charAt(0).toUpperCase()}
        </div>
        <h4 className="mt-3 text-lg font-semibold text-gray-800">
          {viewStudent.student_name}
        </h4>
        <p className="text-sm text-gray-500">{viewStudent.parent_email}</p>
      </div>

      {/* Details Section */}
      <div className="space-y-4 text-gray-700">
        {viewStudent.parent_name && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">👨 Parent Name:</span> {viewStudent.parent_name}
            </p>
          </div>
        )}
        {viewStudent.contact_number && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">📞 Contact:</span> {viewStudent.contact_number}
            </p>
          </div>
        )}
        {viewStudent.address && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🏠 Address:</span> {viewStudent.address}
            </p>
          </div>
        )}
        {viewStudent.dob && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🎂 DOB:</span> {new Date(viewStudent.dob).toLocaleDateString()}
            </p>
          </div>
        )}
        {viewStudent.gender && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">⚧ Gender:</span> {viewStudent.gender}
            </p>
          </div>
        )}
        {viewStudent.blood_group && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🩸 Blood Group:</span> {viewStudent.blood_group}
            </p>
          </div>
        )}
        {viewStudent.disability_type && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">🧩 Disability Type:</span> {viewStudent.disability_type}
            </p>
          </div>
        )}
        {viewStudent.disability_description && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">📝 Disability Description:</span> {viewStudent.disability_description}
            </p>
          </div>
        )}
        {viewStudent.special_requirements && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">⚙ Special Requirements:</span> {viewStudent.special_requirements}
            </p>
          </div>
        )}
        {viewStudent.previous_interventions && (
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">📜 Previous Interventions:</span> {viewStudent.previous_interventions}
            </p>
          </div>
        )}
        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
          <p className="text-sm">
            <span className="font-semibold">🆔 UDID:</span> {viewStudent.udid}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setViewStudent(null)}
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

export default SendAppointmentEmail;
