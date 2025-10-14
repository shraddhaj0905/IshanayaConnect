import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AdminImage from "../assests/AddAdmin.jpg";
import { FaUserCircle } from "react-icons/fa";

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return alert("Please log in as admin.");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/admin/add-admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ fixed
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add admin");

      setSuccessMsg("Admin added successfully! ✅");
      setAdminData({ name: "", email: "", password: "" });
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-700">Ishanya Foundation - Admin</h1>
        <div className="flex items-center space-x-3 cursor-pointer">
          <FaUserCircle className="text-3xl text-indigo-600" />
          <span className="font-semibold text-gray-700">Admin</span>
        </div>
      </header>

      {/* Main Content: 60/40 Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Image - 60% */}
        <div className="hidden md:block md:w-3/5 h-full">
          <img
            src={AdminImage}
            alt="Admin Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form - 40% */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-8">
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Add Admin</h2>

            {successMsg && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center font-semibold animate-pulse">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={adminData.name}
                  onChange={handleChange}
                  placeholder="Enter admin name"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={adminData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-gray-600 font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={adminData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-300 focus:outline-none transition"
                  required
                />
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-red-400 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-400 text-white py-3 rounded-xl font-bold hover:bg-red-400 transition duration-300 hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
