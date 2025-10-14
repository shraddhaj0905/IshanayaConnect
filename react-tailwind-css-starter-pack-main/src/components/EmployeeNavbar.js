import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assests/logo.png"; // NGO Logo
import { useNavigate } from "react-router-dom";


const TeacherNavbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Optional scroll effect (currently not used but ready)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { name: "Dashboard", path: "/teacher-dashboard" },
    { name: "Attendance", path: "/attendanceMakingpage" },
    { name: "Assessments", path: "/studentsforreport" },
  ];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 md:gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
          <span className="ml-2 text-lg md:text-xl font-bold text-gray-900">
            Ishanya India Foundation
          </span>
        </div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="text-gray-700 hover:text-indigo-600 transition duration-300 transform hover:scale-105"
            >
              {link.name}
            </button>
          ))}
        </nav>


        {/* Desktop Profile & Logout */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Profile Icon */}
          <div
            className="w-7 h-7 md:w-8 md:h-8 bg-blue-200 flex items-center justify-center rounded-full cursor-pointer shadow-sm transition-transform transform hover:scale-110"
            onClick={() => navigate("/employeeProfilePage")}
          >
            <span className="text-white font-bold text-sm md:text-lg">👤</span>
          </div>


          {/* Logout */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md shadow-sm transition-transform transform hover:scale-105"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 transition duration-300 transform hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 max-h-screen py-4"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-4 px-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setMobileMenuOpen(false);
              }}
              className="text-gray-700 hover:text-indigo-600 py-2 transition duration-300 transform hover:scale-105 text-left"
            >
              {link.name}
            </button>
          ))}


          {/* Profile */}
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 py-2 transition duration-300 transform hover:scale-105"
            onClick={() => {
              navigate("/employeeProfilePage");
              setMobileMenuOpen(false);
            }}
          >
            👤 Profile
          </button>


          {/* Logout */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md shadow-sm mt-2"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};


export default TeacherNavbar;





