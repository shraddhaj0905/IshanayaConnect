import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";


const AttendanceHeatmap = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return (
      <p className="text-gray-500 text-center">No attendance records available.</p>
    );
  }


  const attendanceMap = {};
  attendance.forEach((a) => {
    const day = format(new Date(a.date), "yyyy-MM-dd");
    attendanceMap[day] = a.status;
  });


  const startDate = parseISO(attendance[0].date);
  const endDate = new Date();


  const days = [];
  let currentDate = new Date(startDate);


  while (currentDate <= endDate) {
    const dayKey = format(currentDate, "yyyy-MM-dd");
    days.push({
      date: dayKey,
      status: attendanceMap[dayKey] || "Absent",
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }


  const months = {};
  days.forEach((d) => {
    const monthKey = format(new Date(d.date), "MMMM yyyy");
    if (!months[monthKey]) months[monthKey] = [];
    months[monthKey].push(d);
  });


  Object.keys(months).forEach((m) => {
    months[m].sort((a, b) => new Date(a.date) - new Date(b.date));
  });


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Attendance Calendar
      </h2>
      <div className="flex space-x-6 overflow-x-auto pb-3 justify-center">
        {Object.keys(months).map((month, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">
              {month}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {months[month].map((d, i) => (
                <div
                  key={i}
                  title={`${d.status} on ${d.date}`}
                  className={`w-5 h-5 rounded-full ${
                    d.status === "Present" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Star = ({ filled }) => {
  // simple SVG star, filled or outline based on `filled`
  return filled ? (
    <svg className="w-5 h-5 text-yellow-500 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.992 2.684c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.02 9.387c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-300 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.992 2.684c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.02 9.387c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
};


const renderStars = (score) => {
  // score may be number (0-5) or undefined
  const s = typeof score === "number" ? Math.round(score) : 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} filled={i <= s} />);
  }
  return <span className="inline-flex items-center gap-1">{stars}</span>;
};


const StudentReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");


  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("parentToken");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }


      try {
        const res = await axios.get("http://localhost:4000/api/students/report", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data.report);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch report. Try login again.");
      } finally {
        setLoading(false);
      }
    };


    fetchReport();
  }, []);


  if (loading) return <div className="p-6 text-center text-gray-600">Loading report...</div>;
  if (error) return <div className="p-6 text-center text-red-600 font-semibold">{error}</div>;
  if (!report) return <div className="p-6 text-center text-gray-600">No report available</div>;


  const monthlyEvaluation = Array.isArray(report.monthly_evaluation) ? report.monthly_evaluation : [];
  const allMonths = [...new Set(monthlyEvaluation.map((m) => m.month))];
  const allYears = [...new Set(monthlyEvaluation.map((m) => m.year))];


  const filteredEvaluation = monthlyEvaluation.find(
    (m) => m.month === selectedMonth && (selectedYear === "" ? true : m.year === parseInt(selectedYear))
  );


  // helper for safe comments -> array
  const commentsToArray = (comments) => {
    if (!comments) return [];
    if (Array.isArray(comments)) return comments;
    if (typeof comments === "string") {
      // split on newlines or " . " sometimes; but keep simple: split by newline, otherwise single item
      const parts = comments.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      return parts.length ? parts : [comments];
    }
    return [String(comments)];
  };


  return (
    <div className="p-10 max-w-6xl mx-auto bg-gray-50 shadow-md rounded-2xl space-y-12">
      <h1 className="text-3xl font-bold text-center text-gray-800">Student Report</h1>


      {/* Student Info & Teacher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-white border shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Student Info</h2>
          <p><strong>Name:</strong> {report.student_name || "-"}</p>
          <p><strong>DOB:</strong> {report.dob ? new Date(report.dob).toLocaleDateString() : "-"}</p>
          <p><strong>Disability:</strong> {report.disability_type || "-"} {report.disability_description ? `- ${report.disability_description}` : ""}</p>
          <p><strong>Join Date:</strong> {report.join_date ? new Date(report.join_date).toLocaleDateString() : "-"}</p>
        </div>


        <div className="p-6 rounded-xl bg-white border shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Teacher & Courses</h2>
          <p><strong>Teacher:</strong> {report.teacher?.name || "-"}</p>
          <p><strong>Email:</strong> {report.teacher?.email || "-"}</p>
          <h3 className="mt-4 font-semibold">Courses:</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {report.courses && report.courses.length > 0 ? (
              report.courses.map((c) => <li key={c._id}>{c.course_name} ({c.course_code})</li>)
            ) : (
              <li>No courses assigned.</li>
            )}
          </ul>
        </div>
      </div>


      {/* Attendance */}
      <div className="p-6 rounded-xl bg-white border shadow-sm">
        <AttendanceHeatmap attendance={report.attendance} />
      </div>


      {/* Monthly Evaluation */}
      <div className="p-8 rounded-xl bg-white border shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Monthly Evaluation</h2>


        {/* Month-Year Selector */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <select
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {allMonths.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
          </select>


          <select
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {allYears.map((y, idx) => <option key={idx} value={y}>{y}</option>)}
          </select>
        </div>


        {/* Evaluation Display */}
        {filteredEvaluation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: "communication", label: "Communication" },
              { key: "cognition", label: "Cognition" },
              { key: "academics_OBE_Level_A", label: "Academics" },
              { key: "functional_skills", label: "Functional Skills" },
            ].map(({ key, label }) => {
              const data = filteredEvaluation[key] || {};
              const score = typeof data.score === "number" ? data.score : null;
              const commentsArr = commentsToArray(data.comments);


              return (
                <div key={key} className="p-6 rounded-xl bg-white border shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">{label}</h3>
                    <div className="flex items-center gap-3">
                      {/* stars */}
                      {renderStars(score)}
                      {/* numeric */}
                      <span className="text-sm text-gray-600">{score !== null ? `${score} / 5` : "Not Rated"}</span>
                    </div>
                  </div>


                  {/* bullet points */}
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {commentsArr.length > 0 ? (
                      commentsArr.map((c, i) => <li key={i}>{c}</li>)
                    ) : (
                      <li className="text-gray-500">No feedback available</li>
                    )}
                  </ul>
                </div>
              );
            })}


            {/* Notes section (soft green) */}
            <div className="col-span-full p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Notes</h3>
              <p className="text-gray-700">
                {Array.isArray(filteredEvaluation.area_to_improve) && filteredEvaluation.area_to_improve.length > 0
                  ? filteredEvaluation.area_to_improve.join("; ")
                  : "No additional notes for this month."}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4 text-center">Please select month and year to view evaluation</p>
        )}
      </div>
    </div>
  );
};


export default StudentReportPage;



