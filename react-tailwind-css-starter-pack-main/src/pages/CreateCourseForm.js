
// import React, { useState } from "react";
// import CourseImage from "../assests/createcourse.png"
// import { FaBook } from "react-icons/fa";

// const CreateCourse = () => {
//   const [formData, setFormData] = useState({
//     courseId: "",
//     name: "",
//     ageGroup: "",
//     skillAreas: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       setError("❌ No authentication token found. Please log in.");
//       return;
//     }

//     const formDataToSend = {
//       ...formData,
//       skillAreas: formData.skillAreas.split(",").map((area) => area.trim()),
//     };

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:4000/api/admin/create-course", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formDataToSend),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Course created successfully!");
//         setFormData({ courseId: "", name: "", ageGroup: "", skillAreas: "" });
//       } else {
//         setError(data.message || "⚠️ Error creating course.");
//       }
//     } catch (err) {
//       setError("❌ Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50 h-15">
//         <h1 className="text-2xl font-bold text-indigo-700">Ishanya Foundation - Admin</h1>
//         <div className="flex items-center space-x-3 cursor-pointer">
//           <FaBook className="text-3xl text-indigo-600" />
//           <span className="font-semibold text-gray-700">Admin</span>
//         </div>
//       </header>

//       {/* Main Section */}
//       <div className="flex flex-1 h-[calc(100vh-80px)]">
//         {/* Left Image - 60% */}
//        <div className="hidden md:block md:w-3/5 h-[calc(100vh-80px)]">
//             <img
//                 src={CourseImage}
//                 alt="Course Illustration"
//                 className="w-full h-full object-cover"
//             />
// `      </div>


//         {/* Right Form - 40% */}
//         <div className="w-full md:w-2/5 flex items-center justify-center p-10 h-full">
//           <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md h-full flex flex-col justify-center">
//             <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Create Course</h2>

//             {error && (
//               <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-semibold">
//                 {error}
//               </div>
//             )}
//             {message && (
//               <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center font-semibold">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Course ID */}
//               <div>
//                 <label className="block text-gray-600 font-medium">Course ID</label>
//                 <input
//                   type="text"
//                   name="courseId"
//                   value={formData.courseId}
//                   onChange={handleChange}
//                   placeholder="Enter course ID"
//                   className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-gray-600 font-medium">Course Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter course name"
//                   className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Age Group */}
//               <div>
//                 <label className="block text-gray-600 font-medium">Age Group</label>
//                 <input
//                   type="number"
//                   name="ageGroup"
//                   value={formData.ageGroup}
//                   onChange={handleChange}
//                   placeholder="Enter age group"
//                   className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Skill Areas */}
//               <div>
//                 <label className="block text-gray-600 font-medium">Skill Areas (comma-separated)</label>
//                 <input
//                   type="text"
//                   name="skillAreas"
//                   value={formData.skillAreas}
//                   onChange={handleChange}
//                   placeholder="e.g., Math, Art, Science"
//                   className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-indigo-400 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition duration-300 hover:scale-105 disabled:opacity-50"
//               >
//                 {loading ? "Creating..." : "Create Course"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCourse;
import React, { useState } from "react";
import CourseImage from "../assests/createcourse.png";
import { FaBook } from "react-icons/fa";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseId: "",
    name: "",
    ageGroup: "",
    skillAreas: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("❌ No authentication token found. Please log in.");
      return;
    }

    const formDataToSend = {
      ...formData,
      skillAreas: formData.skillAreas.split(",").map((area) => area.trim()),
    };

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/create-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Course created successfully!");
        setFormData({ courseId: "", name: "", ageGroup: "", skillAreas: "" });
      } else {
        setError(data.message || "⚠️ Error creating course.");
      }
    } catch (err) {
      setError("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50 h-15">
        <h1 className="text-2xl font-bold text-indigo-700">Ishanya Foundation - Admin</h1>
        <div className="flex items-center space-x-3 cursor-pointer">
          <FaBook className="text-3xl text-indigo-600" />
          <span className="font-semibold text-gray-700">Admin</span>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1 h-[calc(100vh-80px)] overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-3/5 h-100">
          <img
            src={CourseImage}
            alt="Course Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-2/5 h-full flex items-center justify-center mt-10">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-md h-full flex flex-col justify-center overflow-y-auto p-8">
            <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Create Course</h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-semibold">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center font-semibold">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Course ID</label>
                <input
                  type="text"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  placeholder="Enter course ID"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter course name"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Age Group</label>
                <input
                  type="number"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  placeholder="Enter age group"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Skill Areas (comma-separated)</label>
                <input
                  type="text"
                  name="skillAreas"
                  value={formData.skillAreas}
                  onChange={handleChange}
                  placeholder="e.g., Math, Art, Science"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-400 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition duration-300 hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
