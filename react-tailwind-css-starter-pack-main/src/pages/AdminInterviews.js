
// // import React, { useEffect, useState } from "react";
// // import { User } from "lucide-react";

// // const AdminDashboard = () => {
// //   const [interviews, setInterviews] = useState([]);
// //   const [selectedInterview, setSelectedInterview] = useState(null);
// //   const [toast, setToast] = useState(null);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const adminId = localStorage.getItem("adminId");
// //   const token = localStorage.getItem("adminToken");

// //   useEffect(() => {
// //     fetchInterviews();
// //   }, []);

// //   const fetchInterviews = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch("http://localhost:4000/api/admin/getscheduled", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Failed to fetch interviews");
// //       setInterviews(data.interviews || []);
// //     } catch (err) {
// //       console.error(err);
// //       setToast({ message: "Failed to fetch interviews", type: "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStatusUpdate = async (candidateEmail, status) => {
// //     try {
// //       setLoading(true);
// //       let url = "";
// //       if (status === "Accepted") url = "approve-employee";
// //       else if (status === "Rejected") url = "reject-employee";

// //       const res = await fetch(`http://localhost:4000/api/admin/${url}`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //         body: JSON.stringify({ email: candidateEmail, adminId }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || `Failed to ${status.toLowerCase()}`);

// //       setInterviews(interviews.filter((i) => i.interviewer?.email !== candidateEmail));
// //       setToast({ message: `Interview ${status}`, type: status === "Accepted" ? "success" : "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     } catch (err) {
// //       console.error(err);
// //       setToast({ message: `Failed to ${status.toLowerCase()}`, type: "error" });
// //       setTimeout(() => setToast(null), 3000);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filtered = interviews.filter(
// //     (i) => i.interviewer?.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const statusColors = {
// //     Pending: "bg-yellow-400 text-white",
// //     Accepted: "bg-green-500 text-white",
// //     Rejected: "bg-red-500 text-white",
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 pb-12">
// //       {/* Navbar */}
// //       <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
// //         <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
// //           <h1 className="text-xl font-semibold text-indigo-700">
// //             Ishanya Foundation <span className="font-normal">- Admin</span>
// //           </h1>
// //           <div className="flex items-center gap-2 text-gray-700">
// //             <User className="text-indigo-600" />
// //             <span>Admin</span>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Hero Section */}
// //       <section className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-10 text-center">
// //         <h2 className="text-3xl font-bold text-indigo-700 mb-3">Scheduled Interviews</h2>
// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           Review your scheduled interviews — accept, reject, or join meetings.
// //         </p>
// //       </section>

// //       {/* Search Bar */}
// //       <div className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search candidate..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 placeholder-gray-400"
// //         />
// //       </div>

// //       {/* Interview Cards */}
// //       <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //         {loading && <p className="text-center text-gray-600 text-xl col-span-full animate-pulse">Loading interviews...</p>}
// //         {!loading && filtered.length === 0 && <p className="text-center text-gray-600 text-xl col-span-full">No pending interviews!</p>}

// //         {filtered.map((i) => (
// //           <div
// //             key={i.interviewer?.email}
// //             className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
// //           >
// //             <div className="flex items-center gap-4 mb-4">
// //               <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-lg font-semibold">
// //                 {i.interviewer?.name.charAt(0).toUpperCase()}
// //               </div>
// //               <div>
// //                 <p className="font-semibold text-gray-800">{i.interviewer?.name}</p>
// //                 <p className="text-gray-500 text-sm">{i.interviewer?.email}</p>
// //               </div>
// //             </div>

// //             <div className="flex flex-col gap-2 mt-2">
// //               <p className="text-gray-700 text-sm">
// //                 <span className="font-semibold">Date:</span> {i.interviewDate}
// //               </p>
// //               <p className="text-gray-700 text-sm">
// //                 <span className="font-semibold">Time:</span> {i.interviewTime}
// //               </p>
// //             </div>

// //             <a
// //               href={i.meetingLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="mt-4 w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition"
// //             >
// //               Join Meeting
// //             </a>

// //             <span className={`absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-sm ${statusColors[i.interviewer?.status || "Pending"]}`}>
// //               {i.interviewer?.status || "Pending"}
// //             </span>

// //             <div className="flex gap-2 mt-4">
// //               <button
// //                 onClick={() => handleStatusUpdate(i.interviewer?.email, "Accepted")}
// //                 className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm transition"
// //               >
// //                 Accept
// //               </button>
// //               <button
// //                 onClick={() => handleStatusUpdate(i.interviewer?.email, "Rejected")}
// //                 className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition"
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Toast */}
// //       {toast && (
// //         <div
// //           className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white animate-fade-in`}
// //         >
// //           {toast.message}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { User } from "lucide-react";

// const AdminDashboard = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [selectedInterview, setSelectedInterview] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const adminId = localStorage.getItem("adminId");
//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     fetchInterviews();
//   }, []);

//   const fetchInterviews = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:4000/api/admin/getscheduled", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch interviews");
//       setInterviews(data.interviews || []);
//     } catch (err) {
//       console.error(err);
//       setToast({ message: "Failed to fetch interviews", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (candidateEmail, status) => {
//     try {
//       setLoading(true);
//       let url = status === "Accepted" ? "approve-employee" : "reject-employee";

//       const res = await fetch(`http://localhost:4000/api/admin/${url}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ email: candidateEmail, adminId }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || `Failed to ${status.toLowerCase()}`);

//       setInterviews(interviews.filter((i) => i.interviewer?.email !== candidateEmail));
//       setToast({ message: `Interview ${status}`, type: status === "Accepted" ? "success" : "error" });
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast({ message: `Failed to ${status.toLowerCase()}`, type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtered = interviews.filter(
//     (i) => i.interviewer?.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const statusColors = {
//     Pending: "bg-yellow-400 text-white",
//     Accepted: "bg-green-500 text-white",
//     Rejected: "bg-red-500 text-white",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 pb-12">
//       {/* Navbar */}
//       <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
//           <h1 className="text-xl font-semibold text-indigo-700">
//             Ishanya Foundation <span className="font-normal">- Admin</span>
//           </h1>
//           <div className="flex items-center gap-2 text-gray-700">
//             <User className="text-indigo-600" />
//             <span>Admin</span>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-10 text-center">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-3">Scheduled Interviews</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Review your scheduled interviews — accept, reject, or join meetings.
//         </p>
//       </section>

//       {/* Search Bar */}
//       <div className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
//         <input
//           type="text"
//           placeholder="Search candidate..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 placeholder-gray-400"
//         />
//       </div>

//       {/* Interview Cards */}
//       <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {loading && (
//           <p className="text-center text-gray-600 text-xl col-span-full animate-pulse">
//             Loading interviews...
//           </p>
//         )}
//         {!loading && filtered.length === 0 && (
//           <p className="text-center text-gray-600 text-xl col-span-full">No pending interviews!</p>
//         )}

//         {filtered.map((i) => (
//           <div
//             key={i.interviewer?.email}
//             className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition relative flex flex-col justify-between"
//           >
//             {/* Status Badge */}
//             <span
//               className={`absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-sm ${
//                 statusColors[i.interviewer?.status || "Pending"]
//               }`}
//             >
//               {i.interviewer?.status || "Pending"}
//             </span>

//             {/* Interview Info */}
//             <div className="flex flex-col gap-1">
//               <h3 className="text-lg font-semibold text-gray-800">{i.interviewer?.name}</h3>
//               <p className="text-gray-500 text-sm">{i.interviewer?.email}</p>
//               <p className="text-gray-700 mt-2 text-sm">
//                 <span className="font-semibold">Date:</span> {i.interviewDate}
//               </p>
//               <p className="text-gray-700 text-sm">
//                 <span className="font-semibold">Time:</span> {i.interviewTime}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end mt-4 gap-2">
//               {/* Fainter, small Join Meeting button */}
//               <a
//                 href={i.meetingLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm bg-indigo-200 text-indigo-800 px-3 py-1 rounded-md hover:bg-indigo-300 transition"
//               >
//                 Join
//               </a>

//               <button
//                 onClick={() => handleStatusUpdate(i.interviewer?.email, "Accepted")}
//                 className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm transition"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(i.interviewer?.email, "Rejected")}
//                 className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Toast */}
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
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

const AdminInterview = () => {
  const [interviews, setInterviews] = useState([]);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/admin/getscheduled", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch interviews");
      setInterviews(data.interviews || []);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to fetch interviews", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (candidateEmail, status) => {
    try {
      setLoading(true);
      const url = status === "Accepted" ? "approve-employee" : "reject-employee";

      const res = await fetch(`http://localhost:4000/api/admin/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: candidateEmail, adminId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to ${status.toLowerCase()}`);

      setInterviews(interviews.filter((i) => i.interviewer?.email !== candidateEmail));
      setToast({ message: `Interview ${status}`, type: status === "Accepted" ? "success" : "error" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
      setToast({ message: `Failed to ${status.toLowerCase()}`, type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const filtered = interviews.filter((i) =>
    i.interviewer?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 pb-12">
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
        <h2 className="text-3xl font-bold text-indigo-700 mb-3">Scheduled Interviews</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review your scheduled interviews — accept, reject, or join meetings.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
        <input
          type="text"
          placeholder="Search candidate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 placeholder-gray-400"
        />
      </div>

      {/* Interview Cards */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && (
          <p className="text-center text-gray-600 text-xl col-span-full animate-pulse">
            Loading interviews...
          </p>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-600 text-xl col-span-full">No interviews found!</p>
        )}

        {filtered.map((i) => (
          <div
            key={i.interviewer?.email}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Circle Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-lg font-semibold">
                {i.interviewer?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{i.interviewer?.name}</p>
                <p className="text-gray-500 text-sm">{i.interviewer?.email}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col gap-1 mt-2">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Date:</span> {i.interviewDate}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Time:</span> {i.interviewTime}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <a
                href={i.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-indigo-200 transition"
              >
                Join
              </a>
              <button
                onClick={() => handleStatusUpdate(i.interviewer?.email, "Accepted")}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(i.interviewer?.email, "Rejected")}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
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
};

export default AdminInterview;
