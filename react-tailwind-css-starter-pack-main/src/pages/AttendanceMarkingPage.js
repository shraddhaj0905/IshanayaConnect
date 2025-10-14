import React, { useState, useEffect } from "react";
import EmployeeNavbar from "../components/EmployeeNavbar";
import { Card, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input } from "./UIcomponents";
import { useNavigate } from "react-router-dom";


export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }


        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const empID = decodedToken.id;


        const response = await fetch(`http://localhost:4000/api/employees/assigned-students/${empID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });


        if (!response.ok) throw new Error("Failed to fetch students");


        const data = await response.json();
        setStudents(data.students || []);


        const initialAttendance = data.students.reduce(
          (acc, student) => ({
            ...acc,
            [student.student_id]: { id: student.student_id, name: student.student_name, present: false },
          }),
          {}
        );
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    fetchAssignedStudents();
  }, []);


  const handleAttendanceChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], present: !prev[id].present },
    }));
  };


  const markAll = (status) => {
    setAttendance(
      students.reduce(
        (acc, student) => ({
          ...acc,
          [student.student_id]: { id: student.student_id, name: student.student_name, present: status },
        }),
        {}
      )
    );
  };


  const handleSubmit = async () => {
    if (!date) {
      alert("Please select a date before submitting.");
      return;
    }


    const token = localStorage.getItem("employeeToken");
    if (!token) {
      alert("Authentication token not found. Please login.");
      return;
    }


    const attendanceData = {
      date,
      records: Object.values(attendance),
    };


    try {
      const response = await fetch("http://localhost:4000/api/employees/mark-attendance", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      });


      const result = await response.json();
      if (response.ok) alert("Attendance marked successfully for " + date);
      else alert("Error: " + result.message);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };


  return (
    <div className="min-h-screen bg-blue-50">
      <EmployeeNavbar />


      <div className="flex flex-col items-center pt-24 px-4">
        <Card className="p-6 w-full max-w-3xl shadow-xl rounded-xl bg-white border border-blue-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            Daily Student Attendance
          </h2>


          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}


          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">Select Date:</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-blue-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>


          <Table className="border border-blue-300 rounded-lg overflow-hidden">
            <TableHeader className="bg-blue-600 text-white">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Present</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.student_id} className="hover:bg-blue-100 transition">
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.student_name}</TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={attendance[student.student_id]?.present || false}
                      onChange={() => handleAttendanceChange(student.student_id)}
                      className="w-5 h-5 text-blue-600 accent-blue-600"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          <div className="flex flex-wrap gap-3 mt-6 justify-center text-black">
            <Button
              onClick={() => markAll(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Mark All Present
            </Button>
            <Button
              onClick={() => markAll(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Mark All Absent
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}





