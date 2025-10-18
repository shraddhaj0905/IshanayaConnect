import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Calendar, Star, Edit3 } from "lucide-react";
import EmployeeNavbar from "../components/EmployeeNavbar"; // Import your Navbar
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const EditReport = () => {
  const { id } = useParams();
  const location = useLocation();
  const student = location.state?.student || { student_name: "Unknown Student" };


  const monthsList = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];


  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [ratings, setRatings] = useState({
    communication: "", cognition: "", academics: "", functionalSkills: ""
  });
  const [feedback, setFeedback] = useState({
    communication: "", cognition: "", academics: "", functionalSkills: ""
  });
  const [improvement, setImprovement] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();


    const employeeToken = localStorage.getItem("employeeToken");
    if (!employeeToken) {
      alert("You are not logged in!");
      return;
    }


    const payload = {
      studentId: id,
      month,
      year,
      communication: { score: Number(ratings.communication), comments: feedback.communication },
      cognition: { score: Number(ratings.cognition), comments: feedback.cognition },
      academics_OBE_Level_A: { score: Number(ratings.academics), comments: feedback.academics },
      functional_skills: { score: Number(ratings.functionalSkills), comments: feedback.functionalSkills },
      area_to_improve: improvement.split(",").map(s => s.trim())
    };


    try {
      const response = await fetch(`${BACKEND_URL}/api/employees/students/evaluation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${employeeToken}`
        },
        body: JSON.stringify(payload)
      });


      const data = await response.json();
      if (response.ok) {
        alert("Report updated successfully!");
        console.log("Updated student data:", data.student);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong!");
    }
  };


  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <EmployeeNavbar />


      <div className="container mx-auto   pt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-black-800 mb-6 text-center">
          Edit Report for {student.student_name}
        </h1>


        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-5 max-w-3xl mx-auto"
        >
          {/* Month and Year */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600"/>
                <span>Select Month</span>
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a Month</option>
                {monthsList.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>


            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600"/>
                <span>Select Year</span>
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>


          {/* Ratings Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2 border">Field</th>
                  <th className="p-2 border">Rating (Out of 5)</th>
                  <th className="p-2 border">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(ratings).map((field) => (
                  <tr key={field} className="hover:bg-blue-50 transition">
                    <td className="p-2 border capitalize font-medium">{field.replace(/([A-Z])/g, " $1")}</td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={ratings[field]}
                        onChange={(e) => setRatings({ ...ratings, [field]: e.target.value })}
                        className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="Rating"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={feedback[field]}
                        onChange={(e) => setFeedback({ ...feedback, [field]: e.target.value })}
                        className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="Feedback"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* Overall Improvement */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500"/>
              <span>Overall Improvement Suggestions (comma separated)</span>
            </label>
            <textarea
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows={3}
              placeholder="Enter suggestions..."
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 shadow flex justify-center items-center space-x-2"
          >
            <Edit3 className="w-5 h-5"/>
            <span>Save Report</span>
          </button>
        </form>
      </div>
    </div>
  );
};


export default EditReport;





