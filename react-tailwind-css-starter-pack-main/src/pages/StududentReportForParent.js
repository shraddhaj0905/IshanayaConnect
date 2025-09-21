import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("parentToken");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:4000/api/students/report",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReport(res.data.report);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch report. Try login again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading)
    return <div className="p-5 text-center text-gray-700">Loading report...</div>;
  if (error)
    return <div className="p-5 text-center text-red-600 font-bold">{error}</div>;

  // --- Attendance Donut Data ---
  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          Number(report.attendance.presentDays),
          Number(report.attendance.absentDays),
        ],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Attendance", font: { size: 20 } },
    },
  };

  // --- Monthly Evaluation Line Data ---
  const evaluationData = {
    labels: report.monthlyEvaluation.months,
    datasets: [
      {
        label: "Communication",
        data: report.monthlyEvaluation.communicationScores.map(Number),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Cognition",
        data: report.monthlyEvaluation.cognitionScores.map(Number),
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Academics",
        data: report.monthlyEvaluation.academicsScores.map(Number),
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Functional Skills",
        data: report.monthlyEvaluation.functionalScores.map(Number),
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const evaluationOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Evaluation", font: { size: 20 } },
    },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white shadow-xl rounded-xl">
      {/* Report Title */}
      <h1 className="text-4xl font-bold text-center mb-8">Student Report</h1>

      {/* Student Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">Student Info</h2>
          <p><strong>Name:</strong> {report.student_name}</p>
          <p><strong>DOB:</strong> {new Date(report.dob).toLocaleDateString()}</p>
          <p>
            <strong>Disability:</strong> {report.disability_type} -{" "}
            {report.disability_description}
          </p>
          <p>
            <strong>Join Date:</strong>{" "}
            {new Date(report.join_date).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">Teacher & Courses</h2>
          <p><strong>Teacher:</strong> {report.teacher?.name || "-"}</p>
          <p><strong>Email:</strong> {report.teacher?.email || "-"}</p>
          <h3 className="mt-4 font-semibold">Courses:</h3>
          <ul className="list-disc ml-5">
            {report.courses.length > 0
              ? report.courses.map((c) => (
                  <li key={c._id}>
                    {c.course_name} ({c.course_code})
                  </li>
                ))
              : <li>No courses assigned.</li>}
          </ul>
        </div>
      </div>

      {/* Attendance Donut */}
<div className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-center">
  <div className="w-124 h-124"> {/* Fixed size container */}
    <Pie data={attendanceData} options={attendanceOptions} />
  </div>
</div>


      {/* Monthly Evaluation Line Chart */}
      <div className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
        <Line data={evaluationData} options={evaluationOptions} />
      </div>

      {/* Areas to Improve */}
      <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Areas to Improve</h2>
        <ul className="list-disc ml-5">
          {report.area_to_improve.length > 0
            ? report.area_to_improve.map((area, i) => <li key={i}>{area}</li>)
            : <li>No specific areas to improve.</li>}
        </ul>
      </div>
    </div>
  );
};

export default StudentReportPage;


