import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        email: adminEmail,
        password,
      });


      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex-col justify-center items-center px-12">
        <h1 className="text-5xl font-extrabold mb-6">Welcome Admin! 👋</h1>
        <p className="text-lg text-purple-200 max-w-md text-center">
          Manage your system efficiently, monitor data, and oversee operations seamlessly.
        </p>
        <p className="absolute bottom-6 text-sm text-purple-300">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>


      {/* Right panel */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md mx-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">Admin Login</h2>
          <p className="text-gray-500 mb-6">
            Don’t have an admin account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-medium hover:underline cursor-pointer"
            >
              Create one
            </span>
          </p>


          {error && (
            <p className="bg-red-100 text-red-700 text-center py-2 rounded-lg mb-6 font-medium">
              {error}
            </p>
          )}


          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-indigo-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-200 pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>
            </div>


            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-indigo-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-200 pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>
            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold transition flex items-center justify-center gap-2 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Logging in..." : "Login Now"}
            </button>
          </form>


          {/* Extra options */}
          <div className="mt-6 flex flex-col items-center text-sm text-gray-600">
            <button className="hover:underline mb-2">Forgot Password?</button>
            <button
              onClick={() => alert("Google Login coming soon!")}
              className="mt-4 w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin;



