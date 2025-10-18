import React, { useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import AnnouncementImage from "../assests/anna.jpg";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const CreateAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    date: "",
    title: "",
    description: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setErrorMessage("You are not authorized. Please log in.");
      setSuccessMessage("");
      return;
    }

    const selectedDate = new Date(announcement.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate <= currentDate) {
      setErrorMessage("Date must be in the future.");
      setSuccessMessage("");
      return;
    }

    if (!announcement.category) {
      setErrorMessage("Please select a category.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/create-announcement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ fixed
          },
          body: JSON.stringify(announcement),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        setAnnouncement({
          date: "",
          title: "",
          description: "",
          category: "",
        });
      } else {
        setSuccessMessage("");
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-indigo-700">
          Ishanya Foundation - Admin
        </h1>
        <div className="flex items-center space-x-3 cursor-pointer">
          <FaBullhorn className="text-3xl text-indigo-600" />
          <span className="font-semibold text-gray-700">Announcement</span>
        </div>
      </header>

      {/* Main Content (fills remaining height) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Image - 60% */}
        <div className="hidden md:block md:w-3/5 h-full">
          <img
            src={AnnouncementImage}
            alt="Announcement Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form - 40% */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-6 h-full overflow-y-auto">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
              Create Announcement
            </h2>

            {successMessage && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center font-semibold animate-pulse">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-semibold animate-pulse">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={announcement.date}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={announcement.title}
                  onChange={handleChange}
                  placeholder="Enter announcement title"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={announcement.description}
                  onChange={handleChange}
                  placeholder="Enter announcement details"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition h-28"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-600 font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={announcement.category}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Events">Events</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-400 text-white py-3 rounded-xl font-bold hover:bg-red-400 transition duration-300 hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Announcement"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
