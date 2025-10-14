import { useLocation, useNavigate } from "react-router-dom";
import EmployeeNavbar from "../components/EmployeeNavbar"; // Make sure path is correct
import { useState } from "react";


const StudentProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;
  const [showDisability, setShowDisability] = useState(true);
  const [showParentInfo, setShowParentInfo] = useState(true);
  const [showProgress, setShowProgress] = useState(true);


  if (!student) {
    return <p className="text-center text-red-500 font-bold text-xl mt-20">Student Not Found</p>;
  }


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


  const getBloodBadge = (bloodGroup) => {
    return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium";
  };


  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar */}
      <EmployeeNavbar />


      <div className="p-6 pt-28 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl border border-gray-300 hover:shadow-2xl transition transform hover:scale-[1.02]">
          <h1 className="text-3xl font-bold text-center text-gray-800">{student.student_name}</h1>


          <div className="flex flex-wrap justify-center mt-3 gap-4">
            <span className={`px-3 py-1 rounded-full font-semibold ${getGenderBadge(student.gender)}`}>
              {student.gender}
            </span>
            <span className={getBloodBadge(student.blood_group)}>{student.blood_group}</span>
          </div>


          <div className="flex justify-center mt-4">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.student_name}
                className="w-32 h-32 rounded-full border-4 border-gray-400 shadow-md object-cover"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-blue-100 text-blue-800 text-4xl font-bold rounded-full border-4 border-gray-400 animate-pulse">
                {student.student_name.charAt(0)}
              </div>
            )}
          </div>


          <div className="text-center mt-4 text-gray-700">
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Roll No:</strong> {student.student_id}</p>
            <p><strong>UDID:</strong> {student.udid || "N/A"}</p>
            <p><strong>Join Date:</strong> {new Date(student.join_date).toLocaleDateString()}</p>
          </div>


          {/* Collapsible Sections */}
          <div className="mt-6 space-y-4">
            {/* Disability Section */}
            <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setShowDisability(!showDisability)}
              >
                <h3 className="text-lg font-semibold text-gray-800">Disability Details</h3>
                <span>{showDisability ? "▲" : "▼"}</span>
              </div>
              {showDisability && (
                <div className="mt-2 text-gray-700">
                  <p><strong>Type:</strong> {student.disability_type}</p>
                  <p><strong>Description:</strong> {student.disability_description}</p>
                </div>
              )}
            </div>


            {/* Parent Info Section */}
            <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setShowParentInfo(!showParentInfo)}
              >
                <h3 className="text-lg font-semibold text-gray-800">Parent Information</h3>
                <span>{showParentInfo ? "▲" : "▼"}</span>
              </div>
              {showParentInfo && (
                <div className="mt-2 text-gray-700">
                  <p><strong>Name:</strong> {student.parent_name} ({student.parent_email})</p>
                  <p><strong>Contact:</strong> {student.contact_number}</p>
                  <p><strong>Address:</strong> {student.address}</p>
                </div>
              )}
            </div>


            {/* Progress Section */}
            {student.progress && (
              <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => setShowProgress(!showProgress)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">Progress Notes</h3>
                  <span>{showProgress ? "▲" : "▼"}</span>
                </div>
                {showProgress && <p className="mt-2 text-gray-700">{student.progress}</p>}
              </div>
            )}
          </div>


          {/* Back Button */}
         
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/mystudent")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition transform hover:scale-105 shadow-lg"
        >
          ⬅ Back to My Students
        </button>
      </div>


        </div>
      </div>
    </div>
  );
};


export default StudentProfile;





