import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from "../components/EmployeeNavbar";


import HeroImage from "../assests/teaching.jpg";
import attendanceImg from "../assests/Attendence.jpg";
import assessmentImg from "../assests/Assesment.webp";
import Footer from "../components/Footer";



const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");


  useEffect(() => {
    const name = localStorage.getItem("teacherName") || "Teacher";
    setTeacherName(name);
  }, []);


  const cards = [
    {
      title: "Attendance",
      description: "Track student attendance records.",
      image: attendanceImg,
      onClick: () => navigate("/attendanceMakingpage"),
    },
    {
      title: "Assessments",
      description: "Evaluate student progress and performance.",
      image: assessmentImg,
      onClick: () => navigate("/studentsforreport"),
    },
  ];


  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <EmployeeNavbar className="h-12" />


      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 flex-1 pt-40">
        {/* Left - Text */}
        <div className="max-w-2xl text-center lg:text-left lg:mr-6">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-300/20 text-indigo-700 text-base font-medium">
            Empowering Every Teacher
          </div>


          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-snug text-indigo-900">
            Welcome, <span className="text-indigo-600">{teacherName}</span>
          </h1>


          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Your dedication, patience, and compassion transform lives every day.
            Manage students, attendance, and assessments efficiently to nurture
            every child&apos;s growth and confidence.
          </p>


          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button
              onClick={() => navigate("/mystudent")}
              className="px-7 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              My Students →
            </button>


            
          </div>
        </div>


        {/* Right - Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-10 lg:mt-0 lg:-ml-10">
          <img
            src={HeroImage}
            alt="Teaching Hero"
            className="w-[80%] md:w-[70%] lg:w-[85%] rounded-xl shadow-xl"
          />
        </div>
      </section>


      {/* Cards Section */}
      <section
        id="cards"
        className="flex flex-wrap justify-center gap-10 w-full px-6 md:px-12 lg:px-20 mt-12 mb-16"
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={card.onClick}
            className="cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden w-[350px] md:w-[420px] h-[420px] flex flex-col"
          >
            {/* Card Image */}
            <div className="flex justify-center">
              <img
                src={card.image}
                alt={card.title}
                className="w-[90%] h-52 object-cover mt-4 rounded-lg"
              />
            </div>


            {/* Card Content */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                {card.title}
              </h2>
              <p className="text-gray-600 text-md">{card.description}</p>
            </div>
          </div>
        ))}
      </section>


      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-indigo-300/20 filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-blue-300/20 filter blur-3xl animate-pulse"></div>
      </div>
      <Footer/>
    </div>
  );
};


export default TeacherDashboard;



