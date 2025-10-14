
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FaUserCircle, FaUsers, FaUserTie, FaBook, FaPlus, FaEnvelope, FaCalendarAlt, FaBullhorn, FaCheckCircle } from "react-icons/fa"; 
// // import admin from "../assests/admin.png"; 

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();

// //   const cards = [
// //     { title: "View Registered Students", path: "/admin/students", icon: <FaUsers /> },
// //     { title: "View Registered Employees", path: "/admin/employees", icon: <FaUserTie /> },
// //     { title: "View Enrolled Students", path: "/admin/enrolled-students", icon: <FaBook /> },
// //     { title: "View Enrolled Employees", path: "/admin/enrolled-employees", icon: <FaBook /> },
// //     { title: "Assign Course", path: "/admin/assign-course", icon: <FaBook /> },
// //     { title: "Add Admin", path: "/admin/add-admin", icon: <FaPlus /> },
// //     { title: "Send Interview Email", path: "/admin/send-interview-email", icon: <FaEnvelope /> },
// //     { title: "Send Appointment Email", path: "/admin/send-appointment-email", icon: <FaCalendarAlt /> },
// //     { title: "Create Course", path: "/admin/create-course", icon: <FaBook /> },
// //     { title: "Announcements", path: "/admin/announcement", icon: <FaBullhorn /> },
// //     { title: "Shortlisted", path: "/admin/interview", icon: <FaCheckCircle /> },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
// //       {/* Navbar */}
// //       <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50">
// //         <h1 className="text-2xl font-bold text-indigo-700">
// //           Ishanya Foundation - Admin
// //         </h1>
// //         <div
// //           className="flex items-center space-x-3 cursor-pointer"
// //           onClick={() => navigate("/admin/profile")}
// //         >
// //           <FaUserCircle className="text-3xl text-indigo-600" />
// //           <span className="font-semibold text-gray-700">Admin</span>
// //         </div>
// //       </header>

// //       {/* Hero Section */}
// //       <section className="flex flex-col lg:flex-row items-center justify-between px-12 py-16 mt-6">
// //         <div className="max-w-xl">
// //           <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
// //             Empowering Every Admin
// //           </span>
// //           <h2 className="mt-5 text-4xl font-extrabold text-gray-800 leading-snug">
// //             Manage <span className="text-indigo-600">Everything</span> in One Place
// //           </h2>
// //           <p className="mt-4 text-gray-600 text-lg">
// //             Access and control students, employees, and courses with ease. Stay
// //             connected and make quick updates from your dashboard.
// //           </p>
// //         </div>
// //         <img
// //           src={admin}
// //           alt="Admin Dashboard"
// //           className="mt-12 lg:mt-0 w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300"
// //         />
// //       </section>

// //       {/* Dashboard Cards */}
// //       <div className="px-12 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
// //         {cards.map((card, index) => (
// //           <div
// //             key={index}
// //             onClick={() => navigate(card.path)}
// //             className="cursor-pointer rounded-2xl p-6 h-48 flex flex-col justify-center items-start 
// //                        bg-white/70 backdrop-blur-md border border-indigo-100 shadow-md 
// //                        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
// //           >
// //             <div className="text-indigo-600 text-3xl mb-3">
// //               {card.icon}
// //             </div>
// //             <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
// //             <p className="mt-1 text-gray-600 text-sm">
// //               Manage {card.title.toLowerCase()} easily.
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUserCircle,
//   FaUsers,
//   FaUserTie,
//   FaBook,
//   FaPlus,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaBullhorn,
//   FaCheckCircle,
// } from "react-icons/fa";
// import admin from "../assests/admin.png";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const cards = [
//     { title: "View Registered Students", path: "/admin/students", icon: <FaUsers /> },
//     { title: "View Registered Employees", path: "/admin/employees", icon: <FaUserTie /> },
//     { title: "View Enrolled Students", path: "/admin/enrolled-students", icon: <FaBook /> },
//     { title: "View Enrolled Employees", path: "/admin/enrolled-employees", icon: <FaBook /> },
//     { title: "Assign Course", path: "/admin/assign-course", icon: <FaBook /> },
//     { title: "Add Admin", path: "/admin/add-admin", icon: <FaPlus /> },
//     { title: "Send Interview Email", path: "/admin/send-interview-email", icon: <FaEnvelope /> },
//     { title: "Send Appointment Email", path: "/admin/send-appointment-email", icon: <FaCalendarAlt /> },
//     { title: "Create Course", path: "/admin/create-course", icon: <FaBook /> },
//     { title: "Announcements", path: "/admin/announcement", icon: <FaBullhorn /> },
//     { title: "Shortlisted", path: "/admin/interview", icon: <FaCheckCircle /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
//       {/* Navbar */}
//       <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50">
//         <h1 className="text-2xl font-bold text-indigo-700">
//           Ishanya Foundation - Admin
//         </h1>
//         <div
//           className="flex items-center space-x-3 cursor-pointer"
//           onClick={() => navigate("/admin/profile")}
//         >
//           <FaUserCircle className="text-3xl text-indigo-600" />
//           <span className="font-semibold text-gray-700">Admin</span>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-16 mt-6">
//         <div className="max-w-xl">
//           <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
//             Empowering Every Admin
//           </span>
//           <h2 className="mt-5 text-4xl font-extrabold text-gray-800 leading-snug">
//             Manage <span className="text-indigo-600">Everything</span> in One Place
//           </h2>
//           <p className="mt-4 text-gray-600 text-lg">
//             Access and control students, employees, and courses with ease. Stay
//             connected and make quick updates from your dashboard.
//           </p>
//         </div>
//         <img
//           src={admin}
//           alt="Admin Dashboard"
//           className="mt-12 lg:mt-0 w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300"
//         />
//       </section>

//       {/* Dashboard Cards */}
//       <div className="px-6 lg:px-12 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(card.path)}
//             className="cursor-pointer rounded-2xl p-6 h-48 flex flex-col justify-center items-start 
//                        bg-white/80 backdrop-blur-md border border-indigo-100 shadow-md 
//                        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//           >
//             <div className="text-indigo-600 text-3xl mb-3">{card.icon}</div>
//             <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
//             <p className="mt-1 text-gray-600 text-sm">
//               Manage {card.title.toLowerCase()} easily.
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUsers,
  FaUserTie,
  FaBook,
  FaPlus,
  FaEnvelope,
  FaCalendarAlt,
  FaBullhorn,
  FaCheckCircle,
} from "react-icons/fa";
import admin from "../assests/admin.png";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    // { title: "View Registered Students", path: "/admin/students", icon: <FaUsers /> },
    // { title: "View Registered Employees", path: "/admin/employees", icon: <FaUserTie /> },
    { title: "View Enrolled Students", path: "/admin/enrolled-students", icon: <FaBook /> },
    { title: "View Enrolled Employees", path: "/admin/enrolled-employees", icon: <FaBook /> },
    { title: "Assign Course", path: "/admin/assign-course", icon: <FaBook /> },
    { title: "Add Admin", path: "/admin/add-admin", icon: <FaPlus /> },
    { title: "Send Interview Email", path: "/admin/send-interview-email", icon: <FaEnvelope /> },
    { title: "Send Appointment Email", path: "/admin/send-appointment-email", icon: <FaCalendarAlt /> },
    { title: "Create Course", path: "/admin/create-course", icon: <FaBook /> },
    { title: "Announcements", path: "/admin/announcement", icon: <FaBullhorn /> },
    { title: "Shortlisted", path: "/admin/interview", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-700">
          Ishanya Foundation - Admin
        </h1>
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/admin/profile")}
        >
          <FaUserCircle className="text-3xl text-indigo-600" />
          <span className="font-semibold text-gray-700">Admin</span>
        </div>
      </header>

      {/* Main Container for Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between py-14">
          <div className="max-w-lg">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
              Empowering Every Admin
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-gray-800 leading-snug">
              Manage <span className="text-indigo-600">Everything</span> in One Place
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Access and control students, employees, and courses with ease. Stay
              connected and make quick updates from your dashboard.
            </p>
          </div>
          <img
            src={admin}
            alt="Admin Dashboard"
            className="mt-10 lg:mt-0 w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300"
          />
        </section>

        {/* Dashboard Cards */}
        <div className="pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="cursor-pointer rounded-2xl p-6 h-44 flex flex-col justify-center items-start 
                         bg-white/80 backdrop-blur-md border border-indigo-100 shadow-md 
                         hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-indigo-600 text-3xl mb-3">{card.icon}</div>
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
              <p className="mt-1 text-gray-600 text-sm">
                Manage {card.title.toLowerCase()} easily.
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
