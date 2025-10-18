import React, { useEffect, useState } from "react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTeacherProfile = async () => {
      let token = localStorage.getItem("employeeToken");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }


      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }


      try {
        const response = await fetch(`${BACKEND_URL}/api/employees/profile`, {
          method: "GET",
          headers: { Authorization: token, "Content-Type": "application/json" },
        });


        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to load profile");
        }


        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchTeacherProfile();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!teacher) return <p>No profile data available.</p>;


  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "T");


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-300 h-32 relative flex justify-center items-center">
          {teacher.profilePicture ? (
            <img
              src={teacher.profilePicture}
              alt={teacher.name}
              className="absolute -bottom-10 w-24 h-24 rounded-full border-4 border-black shadow-md"
            />
          ) : (
            <div className="absolute -bottom-10 w-24 h-24 rounded-full border-4 border-black shadow-md bg-gray-200 flex justify-center items-center text-4xl font-bold">
              {getInitials(teacher.name)}
            </div>
          )}
        </div>


        <div className="text-center mt-12 p-4">
          <h2 className="text-2xl font-semibold">{teacher.name || "N/A"}</h2>
          <p className="text-gray-600">{teacher.qualifications || "N/A"}</p>
        </div>


        <div className="px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Email:</strong> {teacher.email || "N/A"}</p>
          <p><strong>Contact:</strong> {teacher.contact_number || "N/A"}</p>
          <p><strong>Experience:</strong> {teacher.experience || "N/A"} years</p>
          <p><strong>Address:</strong> {teacher.address || "N/A"}</p>
          <p><strong>Total Students Assigned:</strong> {teacher.assigned_students?.length || 0}</p>
        </div>


        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">Subjects Taught</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {teacher.skills?.length > 0 ? (
              teacher.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <p>No subjects assigned</p>
            )}
          </ul>
        </div>


        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">Summary</h3>
          <p className="text-gray-700 mt-2">
            {teacher.name} has {teacher.experience || "N/A"} years of experience in teaching. Passionate about inclusive education.
          </p>
        </div>


        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">Work Experience</h3>
          <p>
            <strong>Special Education Teacher</strong> | ABC Inclusive School |{" "}
            {teacher.join_date?.substring(0, 4) || "N/A"} - Present
          </p>
          <p>Designed inclusive learning experiences and collaborated with parents.</p>
        </div>
      </div>
    </div>
  );
};


export default TeacherProfile;





