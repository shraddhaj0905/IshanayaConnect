// // // // // // // import React, { useState } from "react";

// // // // // // // export default function AdminInterviews() {
// // // // // // //   // Hard-coded interview data
// // // // // // //   const [interviews, setInterviews] = useState([
// // // // // // //     {
// // // // // // //       _id: "1",
// // // // // // //       employeeName: "John Smith",
// // // // // // //       interviewDate: "2025-09-25T10:00:00Z",
// // // // // // //       meetingLink: "https://meet.google.com/abc-defg-hij",
// // // // // // //       status: "Pending",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       _id: "2",
// // // // // // //       employeeName: "Alice Johnson",
// // // // // // //       interviewDate: "2025-09-26T14:30:00Z",
// // // // // // //       meetingLink: "https://meet.google.com/xyz-uvw-rst",
// // // // // // //       status: "Pending",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       _id: "3",
// // // // // // //       employeeName: "Bob Williams",
// // // // // // //       interviewDate: "2025-09-27T09:00:00Z",
// // // // // // //       meetingLink: "https://meet.google.com/lmn-opq-rst",
// // // // // // //       status: "Accepted",
// // // // // // //     },
// // // // // // //   ]);

// // // // // // //   // Update status (Accept/Reject)
// // // // // // //   const updateStatus = (id, status) => {
// // // // // // //     setInterviews((prev) =>
// // // // // // //       prev.map((i) => (i._id === id ? { ...i, status } : i))
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <h2 className="text-2xl font-bold mb-4">Interview Invitations</h2>
// // // // // // //       <table className="w-full border-collapse border border-gray-300">
// // // // // // //         <thead>
// // // // // // //           <tr className="bg-gray-100">
// // // // // // //             <th className="border px-4 py-2">Name</th>
// // // // // // //             <th className="border px-4 py-2">Date</th>
// // // // // // //             <th className="border px-4 py-2">Time</th>
// // // // // // //             <th className="border px-4 py-2">Meeting Link</th>
// // // // // // //             <th className="border px-4 py-2">Status</th>
// // // // // // //             <th className="border px-4 py-2">Actions</th>
// // // // // // //           </tr>
// // // // // // //         </thead>
// // // // // // //         <tbody>
// // // // // // //           {interviews.length === 0 ? (
// // // // // // //             <tr>
// // // // // // //               <td colSpan="6" className="text-center py-4">
// // // // // // //                 No interviews scheduled
// // // // // // //               </td>
// // // // // // //             </tr>
// // // // // // //           ) : (
// // // // // // //             interviews.map((i) => (
// // // // // // //               <tr key={i._id}>
// // // // // // //                 <td className="border px-4 py-2">{i.employeeName}</td>
// // // // // // //                 <td className="border px-4 py-2">
// // // // // // //                   {new Date(i.interviewDate).toLocaleDateString()}
// // // // // // //                 </td>
// // // // // // //                 <td className="border px-4 py-2">
// // // // // // //                   {new Date(i.interviewDate).toLocaleTimeString([], {
// // // // // // //                     hour: "2-digit",
// // // // // // //                     minute: "2-digit",
// // // // // // //                   })}
// // // // // // //                 </td>
// // // // // // //                 <td className="border px-4 py-2">
// // // // // // //                   <a
// // // // // // //                     href={i.meetingLink}
// // // // // // //                     target="_blank"
// // // // // // //                     rel="noopener noreferrer"
// // // // // // //                     className="text-blue-500 underline"
// // // // // // //                   >
// // // // // // //                     Join Meeting
// // // // // // //                   </a>
// // // // // // //                 </td>
// // // // // // //                 <td
// // // // // // //                   className={`border px-4 py-2 ${
// // // // // // //                     i.status === "Accepted"
// // // // // // //                       ? "text-green-600"
// // // // // // //                       : i.status === "Rejected"
// // // // // // //                       ? "text-red-600"
// // // // // // //                       : "text-gray-600"
// // // // // // //                   }`}
// // // // // // //                 >
// // // // // // //                   {i.status}
// // // // // // //                 </td>
// // // // // // //                 <td className="border px-4 py-2 space-x-2">
// // // // // // //                   <button
// // // // // // //                     onClick={() => updateStatus(i._id, "Accepted")}
// // // // // // //                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
// // // // // // //                     disabled={i.status === "Accepted"}
// // // // // // //                   >
// // // // // // //                     Accept
// // // // // // //                   </button>
// // // // // // //                   <button
// // // // // // //                     onClick={() => updateStatus(i._id, "Rejected")}
// // // // // // //                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// // // // // // //                     disabled={i.status === "Rejected"}
// // // // // // //                   >
// // // // // // //                     Reject
// // // // // // //                   </button>
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             ))
// // // // // // //           )}
// // // // // // //         </tbody>
// // // // // // //       </table>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import React, { useState } from "react";

// // // // // // export default function AdminInterviews() {
// // // // // //   // Hard-coded interview data
// // // // // //   const [interviews, setInterviews] = useState([
// // // // // //     {
// // // // // //       _id: "1",
// // // // // //       employeeName: "John Smith",
// // // // // //       interviewDate: "2025-09-25T10:00:00Z",
// // // // // //       meetingLink: "https://meet.google.com/abc-defg-hij",
// // // // // //       status: "Pending",
// // // // // //     },
// // // // // //     {
// // // // // //       _id: "2",
// // // // // //       employeeName: "Alice Johnson",
// // // // // //       interviewDate: "2025-09-26T14:30:00Z",
// // // // // //       meetingLink: "https://meet.google.com/xyz-uvw-rst",
// // // // // //       status: "Pending",
// // // // // //     },
// // // // // //     {
// // // // // //       _id: "3",
// // // // // //       employeeName: "Bob Williams",
// // // // // //       interviewDate: "2025-09-27T09:00:00Z",
// // // // // //       meetingLink: "https://meet.google.com/lmn-opq-rst",
// // // // // //       status: "Accepted",
// // // // // //     },
// // // // // //   ]);

// // // // // //   // Accept or Reject: remove from list
// // // // // //   const handleStatusUpdate = (id, status) => {
// // // // // //     // In real app, call backend PATCH here

// // // // // //     // Remove the employee from the list after updating status
// // // // // //     setInterviews((prev) => prev.filter((i) => i._id !== id));
// // // // // //   };

// // // // // //   // Only show Pending employees
// // // // // //   const pendingInterviews = interviews.filter((i) => i.status === "Pending");

// // // // // //   return (
// // // // // //     <div className="p-6">
// // // // // //       <h2 className="text-2xl font-bold mb-4">Pending Interview Invitations</h2>
// // // // // //       <table className="w-full border-collapse border border-gray-300">
// // // // // //         <thead>
// // // // // //           <tr className="bg-gray-100">
// // // // // //             <th className="border px-4 py-2">Name</th>
// // // // // //             <th className="border px-4 py-2">Date</th>
// // // // // //             <th className="border px-4 py-2">Time</th>
// // // // // //             <th className="border px-4 py-2">Meeting Link</th>
// // // // // //             <th className="border px-4 py-2">Actions</th>
// // // // // //           </tr>
// // // // // //         </thead>
// // // // // //         <tbody>
// // // // // //           {pendingInterviews.length === 0 ? (
// // // // // //             <tr>
// // // // // //               <td colSpan="5" className="text-center py-4">
// // // // // //                 No pending interviews
// // // // // //               </td>
// // // // // //             </tr>
// // // // // //           ) : (
// // // // // //             pendingInterviews.map((i) => (
// // // // // //               <tr key={i._id}>
// // // // // //                 <td className="border px-4 py-2">{i.employeeName}</td>
// // // // // //                 <td className="border px-4 py-2">
// // // // // //                   {new Date(i.interviewDate).toLocaleDateString()}
// // // // // //                 </td>
// // // // // //                 <td className="border px-4 py-2">
// // // // // //                   {new Date(i.interviewDate).toLocaleTimeString([], {
// // // // // //                     hour: "2-digit",
// // // // // //                     minute: "2-digit",
// // // // // //                   })}
// // // // // //                 </td>
// // // // // //                 <td className="border px-4 py-2">
// // // // // //                   <a
// // // // // //                     href={i.meetingLink}
// // // // // //                     target="_blank"
// // // // // //                     rel="noopener noreferrer"
// // // // // //                     className="text-blue-500 underline"
// // // // // //                   >
// // // // // //                     Join Meeting
// // // // // //                   </a>
// // // // // //                 </td>
// // // // // //                 <td className="border px-4 py-2 space-x-2">
// // // // // //                   <button
// // // // // //                     onClick={() => handleStatusUpdate(i._id, "Accepted")}
// // // // // //                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
// // // // // //                   >
// // // // // //                     Accept
// // // // // //                   </button>
// // // // // //                   <button
// // // // // //                     onClick={() => handleStatusUpdate(i._id, "Rejected")}
// // // // // //                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// // // // // //                   >
// // // // // //                     Reject
// // // // // //                   </button>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ))
// // // // // //           )}
// // // // // //         </tbody>
// // // // // //       </table>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState } from "react";

// // // // // // Toast component
// // // // // const Toast = ({ message, type, onClose }) => {
// // // // //   const bgColor =
// // // // //     type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-500";
// // // // //   return (
// // // // //     <div
// // // // //       className={`${bgColor} text-white px-5 py-3 rounded shadow-lg fixed top-5 right-5 z-50 cursor-pointer animate-bounce`}
// // // // //       onClick={onClose}
// // // // //     >
// // // // //       {message}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default function AdminDashboard() {
// // // // //   const [interviews, setInterviews] = useState([
// // // // //     {
// // // // //       _id: "1",
// // // // //       employeeName: "John Smith",
// // // // //       interviewDate: "2025-09-25T10:00:00Z",
// // // // //       meetingLink: "https://meet.google.com/abc-defg-hij",
// // // // //       status: "Pending",
// // // // //     },
// // // // //     {
// // // // //       _id: "2",
// // // // //       employeeName: "Alice Johnson",
// // // // //       interviewDate: "2025-09-26T14:30:00Z",
// // // // //       meetingLink: "https://meet.google.com/xyz-uvw-rst",
// // // // //       status: "Pending",
// // // // //     },
// // // // //     {
// // // // //       _id: "3",
// // // // //       employeeName: "Bob Williams",
// // // // //       interviewDate: "2025-09-27T09:00:00Z",
// // // // //       meetingLink: "https://meet.google.com/lmn-opq-rst",
// // // // //       status: "Accepted",
// // // // //     },
// // // // //   ]);

// // // // //   const [toast, setToast] = useState(null);
// // // // //   const [search, setSearch] = useState("");

// // // // //   // Filter pending interviews by search
// // // // //   const pendingInterviews = interviews
// // // // //     .filter((i) => i.status === "Pending")
// // // // //     .filter((i) => i.employeeName.toLowerCase().includes(search.toLowerCase()));

// // // // //   const handleStatusUpdate = (id, status) => {
// // // // //     const employee = interviews.find((i) => i._id === id);

// // // // //     // Show toast
// // // // //     setToast({ message: `${employee.employeeName} ${status}`, type: status === "Accepted" ? "success" : "error" });

// // // // //     // Remove employee from pending list
// // // // //     setInterviews((prev) => prev.filter((i) => i._id !== id));

// // // // //     setTimeout(() => setToast(null), 3000);
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
// // // // //       <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">Admin Interview Dashboard</h1>

// // // // //       <div className="mb-5 flex justify-center">
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search employee..."
// // // // //           value={search}
// // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // //           className="w-full max-w-md px-4 py-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// // // // //         />
// // // // //       </div>

// // // // //       {pendingInterviews.length === 0 ? (
// // // // //         <p className="text-center text-gray-500 text-xl mt-10 animate-pulse">No pending interviews!</p>
// // // // //       ) : (
// // // // //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //           {pendingInterviews.map((i) => (
// // // // //             <div
// // // // //               key={i._id}
// // // // //               className="bg-white rounded-xl shadow-lg p-5 relative overflow-hidden hover:scale-105 transform transition-transform duration-300 cursor-pointer"
// // // // //             >
// // // // //               {/* Animated status badge */}
// // // // //               <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-gray-400 animate-pulse">
// // // // //                 Pending
// // // // //               </span>

// // // // //               <h2 className="text-2xl font-semibold text-gray-800 mb-2">{i.employeeName}</h2>

// // // // //               <p className="text-gray-600 mb-1">
// // // // //                 <span className="font-medium">Date:</span> {new Date(i.interviewDate).toLocaleDateString()}
// // // // //               </p>
// // // // //               <p className="text-gray-600 mb-2">
// // // // //                 <span className="font-medium">Time:</span>{" "}
// // // // //                 {new Date(i.interviewDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// // // // //               </p>

// // // // //               <a
// // // // //                 href={i.meetingLink}
// // // // //                 target="_blank"
// // // // //                 rel="noopener noreferrer"
// // // // //                 className="inline-block text-blue-600 underline mb-4"
// // // // //               >
// // // // //                 Join Meeting
// // // // //               </a>

// // // // //               <div className="flex justify-between">
// // // // //                 <button
// // // // //                   onClick={() => handleStatusUpdate(i._id, "Accepted")}
// // // // //                   className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 transition-all duration-300 transform hover:scale-105"
// // // // //                 >
// // // // //                   Accept
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => handleStatusUpdate(i._id, "Rejected")}
// // // // //                   className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
// // // // //                 >
// // // // //                   Reject
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}

// // // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useState } from "react";

// // // // // Toast notification
// // // // const Toast = ({ message, type, onClose }) => {
// // // //   const bgColor =
// // // //     type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-500";
// // // //   return (
// // // //     <div
// // // //       className={`${bgColor} text-white px-5 py-3 rounded-xl shadow-lg fixed top-5 right-5 z-50 cursor-pointer animate-fade-in`}
// // // //       onClick={onClose}
// // // //     >
// // // //       {message}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default function AdminDashboard() {
// // // //   const [interviews, setInterviews] = useState([
// // // //     {
// // // //       _id: "1",
// // // //       employeeName: "John Smith",
// // // //       interviewDate: "2025-09-25T10:00:00Z",
// // // //       meetingLink: "https://meet.google.com/abc-defg-hij",
// // // //       status: "Pending",
// // // //     },
// // // //     {
// // // //       _id: "2",
// // // //       employeeName: "Alice Johnson",
// // // //       interviewDate: "2025-09-26T14:30:00Z",
// // // //       meetingLink: "https://meet.google.com/xyz-uvw-rst",
// // // //       status: "Pending",
// // // //     },
// // // //     {
// // // //       _id: "3",
// // // //       employeeName: "Bob Williams",
// // // //       interviewDate: "2025-09-27T09:00:00Z",
// // // //       meetingLink: "https://meet.google.com/lmn-opq-rst",
// // // //       status: "Accepted",
// // // //     },
// // // //   ]);

// // // //   const [toast, setToast] = useState(null);
// // // //   const [search, setSearch] = useState("");

// // // //   // Filter pending interviews
// // // //   const pendingInterviews = interviews
// // // //     .filter((i) => i.status === "Pending")
// // // //     .filter((i) => i.employeeName.toLowerCase().includes(search.toLowerCase()));

// // // //   const handleStatusUpdate = (id, status) => {
// // // //     const employee = interviews.find((i) => i._id === id);
// // // //     setToast({
// // // //       message: `${employee.employeeName} ${status}`,
// // // //       type: status === "Accepted" ? "success" : "error",
// // // //     });
// // // //     setInterviews((prev) => prev.filter((i) => i._id !== id));
// // // //     setTimeout(() => setToast(null), 3000);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-8">
// // // //       <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8 drop-shadow-lg">
// // // //         Admin Interview Dashboard
// // // //       </h1>

// // // //       {/* Search bar */}
// // // //       <div className="flex justify-center mb-8">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search employee..."
// // // //           value={search}
// // // //           onChange={(e) => setSearch(e.target.value)}
// // // //           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-gray-400"
// // // //         />
// // // //       </div>

// // // //       {pendingInterviews.length === 0 ? (
// // // //         <p className="text-center text-gray-600 text-xl animate-pulse">
// // // //           No pending interviews!
// // // //         </p>
// // // //       ) : (
// // // //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //           {pendingInterviews.map((i) => (
// // // //             <div
// // // //               key={i._id}
// // // //               className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 relative hover:scale-105 transform transition-transform duration-300 cursor-pointer border border-purple-200"
// // // //             >
// // // //               {/* Animated Pending Badge */}
// // // //               <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-purple-500 animate-pulse">
// // // //                 Pending
// // // //               </span>

// // // //               <h2 className="text-2xl font-bold text-purple-800 mb-2">{i.employeeName}</h2>
// // // //               <p className="text-gray-700 mb-1">
// // // //                 <span className="font-semibold">Date:</span>{" "}
// // // //                 {new Date(i.interviewDate).toLocaleDateString()}
// // // //               </p>
// // // //               <p className="text-gray-700 mb-3">
// // // //                 <span className="font-semibold">Time:</span>{" "}
// // // //                 {new Date(i.interviewDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// // // //               </p>

// // // //               <a
// // // //                 href={i.meetingLink}
// // // //                 target="_blank"
// // // //                 rel="noopener noreferrer"
// // // //                 className="inline-block text-purple-600 underline mb-5"
// // // //               >
// // // //                 Join Meeting
// // // //               </a>

// // // //               {/* Action Buttons */}
// // // //               <div className="flex gap-4">
// // // //                 <button
// // // //                   onClick={() => handleStatusUpdate(i._id, "Accepted")}
// // // //                   className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// // // //                 >
// // // //                   Accept
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleStatusUpdate(i._id, "Rejected")}
// // // //                   className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// // // //                 >
// // // //                   Reject
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {/* Toast Notification */}
// // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // export default function AdminDashboard() {
// // //   const [interviews, setInterviews] = useState([]);
// // //   const [toast, setToast] = useState(null);
// // //   const [search, setSearch] = useState("");

// // //   useEffect(() => {
// // //     fetchInterviews();
// // //   }, []);

// // //   const fetchInterviews = async () => {
// // //     try {
// // //       const res = await axios.post(
// // //         "/api/admin/getscheduled",
// // //         {}, // If your backend requires a body, you can add it here
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
// // //       );

// // //       // Assuming your backend sends the interviews in res.data
// // //       setInterviews(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching scheduled interviews:", err);
// // //     }
// // //   };

// // //   const handleStatusUpdate = async (id, status) => {
// // //     try {
// // //       // Call backend to update status
// // //       await axios.patch(
// // //         `/api/admin/interviews/${id}/status`,
// // //         { status },
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
// // //       );

// // //       // Remove from frontend list
// // //       setInterviews((prev) => prev.filter((i) => i._id !== id));

// // //       // Show toast
// // //       setToast({ message: `Interview ${status}`, type: status === "Accepted" ? "success" : "error" });
// // //       setTimeout(() => setToast(null), 3000);
// // //     } catch (err) {
// // //       console.error("Error updating status:", err);
// // //       setToast({ message: "Failed to update status", type: "error" });
// // //     }
// // //   };

// // //   const filtered = interviews.filter((i) =>
// // //     i.candidateName.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-8">
// // //       <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">Admin Dashboard</h1>

// // //       <div className="flex justify-center mb-8">
// // //         <input
// // //           type="text"
// // //           placeholder="Search employee..."
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-gray-400"
// // //         />
// // //       </div>

// // //       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //         {filtered.length === 0 ? (
// // //           <p className="text-center text-gray-600 text-xl col-span-full">No pending interviews!</p>
// // //         ) : (
// // //           filtered.map((i) => (
// // //             <div
// // //               key={i._id}
// // //               className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 relative hover:scale-105 transform transition-transform duration-300 cursor-pointer border border-purple-200"
// // //             >
// // //               <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-purple-500 animate-pulse">
// // //                 Pending
// // //               </span>

// // //               <h2 className="text-2xl font-bold text-purple-800 mb-2">{i.candidateName}</h2>
// // //               <p className="text-gray-700 mb-1">
// // //                 <span className="font-semibold">Date:</span> {i.interviewDate}
// // //               </p>
// // //               <p className="text-gray-700 mb-3">
// // //                 <span className="font-semibold">Time:</span> {i.interviewTime}
// // //               </p>

// // //               <a
// // //                 href={i.meetingLink}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="inline-block text-purple-600 underline mb-5"
// // //               >
// // //                 Join Meeting
// // //               </a>

// // //               <div className="flex gap-4">
// // //                 <button
// // //                   onClick={() => handleStatusUpdate(i._id, "Accepted")}
// // //                   className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// // //                 >
// // //                   Accept
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleStatusUpdate(i._id, "Rejected")}
// // //                   className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// // //                 >
// // //                   Reject
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>

// // //       {toast && <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white animate-fade-in`}>{toast.message}</div>}
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function AdminDashboard() {
// //   const [interviews, setInterviews] = useState([]);
// //   const [toast, setToast] = useState(null);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchInterviews();
// //   }, []);

// //   const fetchInterviews = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.post(
// //         "http://localhost:4000/api/admin/getscheduled",
// //         {},
// //         {
// //           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //         }
// //       );
// //       console.log("Fetched interviews:", res.data);
// //       setInterviews(res.data);
// //     } catch (err) {
// //       console.error("Error fetching scheduled interviews:", err);
// //       setToast({ message: "Failed to fetch interviews", type: "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStatusUpdate = async (id, status) => {
// //     try {
// //       await axios.patch(
// //         `http://localhost:4000/api/admin/interviews/${id}/status`,
// //         { status },
// //         {
// //           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //         }
// //       );

// //       setInterviews((prev) => prev.filter((i) => i._id !== id));
// //       setToast({ message: `Interview ${status}`, type: status === "Accepted" ? "success" : "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     } catch (err) {
// //       console.error("Error updating status:", err);
// //       setToast({ message: "Failed to update status", type: "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     }
// //   };

// //   const filtered = interviews.filter((i) =>
// //     i.candidateName.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-8">
// //       <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">Admin Dashboard</h1>

// //       {/* Search Bar */}
// //       <div className="flex justify-center mb-8">
// //         <input
// //           type="text"
// //           placeholder="Search employee..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-gray-400"
// //         />
// //       </div>

// //       {/* Loading State */}
// //       {loading && <p className="text-center text-gray-600 text-xl animate-pulse">Loading interviews...</p>}

// //       {/* Interview Cards */}
// //       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {!loading && filtered.length === 0 && (
// //           <p className="text-center text-gray-600 text-xl col-span-full">No pending interviews!</p>
// //         )}

// //         {filtered.map((i) => (
// //           <div
// //             key={i._id}
// //             className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 relative hover:scale-105 transform transition-transform duration-300 cursor-pointer border border-purple-200"
// //           >
// //             <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-purple-500 animate-pulse">
// //               Pending
// //             </span>

// //             <h2 className="text-2xl font-bold text-purple-800 mb-2">{i.candidateName}</h2>
// //             <p className="text-gray-700 mb-1">
// //               <span className="font-semibold">Date:</span> {i.interviewDate}
// //             </p>
// //             <p className="text-gray-700 mb-3">
// //               <span className="font-semibold">Time:</span> {i.interviewTime}
// //             </p>

// //             <a
// //               href={i.meetingLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="inline-block text-purple-600 underline mb-5"
// //             >
// //               Join Meeting
// //             </a>

// //             <div className="flex gap-4">
// //               <button
// //                 onClick={() => handleStatusUpdate(i._id, "Accepted")}
// //                 className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// //               >
// //                 Accept
// //               </button>
// //               <button
// //                 onClick={() => handleStatusUpdate(i._id, "Rejected")}
// //                 className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Toast Notification */}
// //       {toast && (
// //         <div
// //           className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl ${
// //             toast.type === "success" ? "bg-green-500" : "bg-red-500"
// //           } text-white animate-fade-in`}
// //         >
// //           {toast.message}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [interviews, setInterviews] = useState([]);
//   const [toast, setToast] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInterviews();
//   }, []);

//   // Fetch scheduled interviews from backend
//   const fetchInterviews = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://localhost:4000/api/admin/getscheduled",
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );

//       console.log("Fetched interviews:", res.data.interviews);
//       setInterviews(res.data.interviews);
//     } catch (err) {
//       console.error("Error fetching scheduled interviews:", err.response || err);
//       setToast({ message: "Failed to fetch interviews", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Accept/Reject status update
//   const handleStatusUpdate = async (candidateId, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:4000/api/admin/interviews/${candidateId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );

//       // Remove interview from list after update
//       setInterviews((prev) => prev.filter((i) => i.interviewer._id !== candidateId));

//       setToast({
//         message: `Interview ${status}`,
//         type: status === "Accepted" ? "success" : "error",
//       });
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error("Error updating status:", err.response || err);
//       setToast({ message: "Failed to update status", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     }
//   };

//   // Filter interviews based on search
//   const filtered = interviews.filter((i) =>
//     i.interviewer.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-8">
//       <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">
//         Admin Dashboard
//       </h1>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search employee..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-gray-400"
//         />
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <p className="text-center text-gray-600 text-xl animate-pulse">
//           Loading interviews...
//         </p>
//       )}

//       {/* Interview Cards */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {!loading && filtered.length === 0 && (
//           <p className="text-center text-gray-600 text-xl col-span-full">
//             No pending interviews!
//           </p>
//         )}

//         {filtered.map((i) => (
//           <div
//             key={i.interviewer._id}
//             className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 relative hover:scale-105 transform transition-transform duration-300 border border-purple-200"
//           >
//             <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-purple-500 animate-pulse">
//               {i.interviewer.status}
//             </span>

//             <h2 className="text-2xl font-bold text-purple-800 mb-2">
//               {i.interviewer.name}
//             </h2>
//             <p className="text-gray-700 mb-1">
//               <span className="font-semibold">Date:</span> {i.interviewDate}
//             </p>
//             <p className="text-gray-700 mb-3">
//               <span className="font-semibold">Time:</span> {i.interviewTime}
//             </p>

//             <a
//               href={i.meetingLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block text-purple-600 underline mb-5"
//             >
//               Join Meeting
//             </a>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => handleStatusUpdate(i.interviewer._id, "Accepted")}
//                 className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(i.interviewer._id, "Rejected")}
//                 className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Toast Notification */}
//       {toast && (
//         <div
//           className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl ${
//             toast.type === "success" ? "bg-green-500" : "bg-red-500"
//           } text-white animate-fade-in`}
//         >
//           {toast.message}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [interviews, setInterviews] = useState([]);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  // Fetch scheduled interviews from backend
  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/admin/getscheduled",
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );

      console.log("Fetched interviews:", res.data.interviews);
      setInterviews(res.data.interviews);
    } catch (err) {
      console.error("Error fetching scheduled interviews:", err.response || err);
      setToast({ message: "Failed to fetch interviews", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle Accept/Reject status update
//   const handleStatusUpdate = async (candidateId, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:4000/api/admin/interviews/${candidateId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );

//       // Remove interview from list after update
//       setInterviews((prev) => prev.filter((i) => i.interviewer?._id !== candidateId));

//       setToast({
//         message: `Interview ${status}`,
//         type: status === "Accepted" ? "success" : "error",
//       });
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error("Error updating status:", err.response || err);
//       setToast({ message: "Failed to update status", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     }
//   };

// const handleStatusUpdate = async (candidateEmail, status) => {
//   const token = localStorage.getItem("adminToken");
//   const adminId = localStorage.getItem("adminId"); // store adminId at login

//   if (!token) return;

//   try {
//     if (status === "Accepted") {
//       await axios.post(
//         "http://localhost:4000/api/admin/approve-employee",
//         { email: candidateEmail, adminId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } else {
//       // For reject, you can create a separate endpoint to update status
//       await axios.patch(
//         `http://localhost:4000/api/admin/interviews/${candidateEmail}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     }

//     // Remove from frontend list immediately
//     setInterviews(prev => prev.filter(i => i.candidateEmail !== candidateEmail));

//     setToast({
//       message: `Interview ${status}`,
//       type: status === "Accepted" ? "success" : "error",
//     });
//     setTimeout(() => setToast(null), 3000);

//   } catch (err) {
//     console.error("Error updating status:", err.response || err);
//     setToast({ message: "Failed to update status", type: "error" });
//     setTimeout(() => setToast(null), 3000);
//   }
// };

const handleStatusUpdate = async (candidateEmail, status) => {
  const token = localStorage.getItem("token"); // get admin token
  if (!token) return;

  try {
    if (status === "Accepted") {
      // Call approve employee endpoint
      await axios.post(
        "http://localhost:4000/api/admin/approve-employee",
        { email: candidateEmail }, // no need for adminId
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // For Reject: call status update endpoint
      await axios.patch(
        `http://localhost:4000/api/admin/interviews/${candidateEmail}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    // Remove the interview from the list immediately
    setInterviews(prev => prev.filter(i => i.candidateEmail !== candidateEmail));

    // Show toast
    setToast({
      message: `Interview ${status}`,
      type: status === "Accepted" ? "success" : "error",
    });
    setTimeout(() => setToast(null), 3000);

  } catch (err) {
    console.error("Error updating status:", err.response || err);
    setToast({ message: "Failed to update status", type: "error" });
    setTimeout(() => setToast(null), 3000);
  }
};



  // Filter interviews based on search
  const filtered = interviews.filter(
    (i) => i.interviewer && i.interviewer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-gray-400"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-600 text-xl animate-pulse">
          Loading interviews...
        </p>
      )}

      {/* Interview Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-600 text-xl col-span-full">
            No pending interviews!
          </p>
        )}

        {filtered.map((i) => (
          <div
            key={i.interviewer?._id}
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 relative hover:scale-105 transform transition-transform duration-300 border border-purple-200"
          >
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm bg-purple-500 animate-pulse">
              {i.interviewer?.status}
            </span>

            <h2 className="text-2xl font-bold text-purple-800 mb-2">
              {i.interviewer?.name || "Unknown"}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Date:</span> {i.interviewDate}
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Time:</span> {i.interviewTime}
            </p>

            <a
              href={i.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-purple-600 underline mb-5"
            >
              Join Meeting
            </a>

            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate(i.interviewer?._id, "Accepted")}
                className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(i.interviewer?._id, "Rejected")}
                className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Reject
              </button>
        

            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white animate-fade-in`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
