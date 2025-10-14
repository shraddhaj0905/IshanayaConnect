import { useNavigate } from "react-router-dom";
import image from "../assests/parent.jpg";
import logo from "../assests/logofront.png";
import Footer from "../components/Footer";


export default function ParentDashboard() {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Ishanya Foundation" className="w-12 h-12 rounded-full" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ishanya Foundation
          </h1>
        </div>


        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition"
        >
          Home
        </button>
      </nav>


      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-10 md:px-17 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 text-base md:text-lg font-semibold px-5 py-2 rounded-full">
              Empowering Every Parent
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-6 leading-tight">
              Support Your Child’s <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg mt-6 max-w-md">
              Every child grows differently. With the right guidance, love, and resources,
              they can thrive academically, socially, and emotionally.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={image}
              alt="Parent and Child"
              className="rounded-2xl shadow-xl w-full max-w-lg md:max-w-2xl"
            />
          </div>
        </section>


        {/* Dashboard Cards */}
        <section className="flex flex-wrap justify-center gap-10 w-full px-6 md:px-12 lg:px-20 mt-12 mb-16r">
          {/* Student Report */}
          <div
            className="cursor-pointer transition transform hover:-translate-y-3 hover:shadow-2xl
                       bg-white p-14 rounded-3xl shadow-xl border border-gray-100 text-center flex flex-col min-h-[320px]"
            onClick={() => navigate("/studentreportforparent")}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
              Student Report
            </h3>
            <p className="text-gray-600 text-lg md:text-xl">
              Track your child’s academic progress and milestones.
            </p>
          </div>


          {/* Announcements */}
          <div
            className="cursor-pointer transition transform hover:-translate-y-3 hover:shadow-2xl
                       bg-white p-14 rounded-3xl shadow-xl border border-gray-100 text-center flex flex-col min-h-[320px]"
            onClick={() => navigate("/announancementpage")}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
              Announcements
            </h3>
            <p className="text-gray-600 text-lg md:text-xl">
              Stay updated with important school events and news.
            </p>
          </div>


          
            {/* Queries */}
  {/* <div
    className="cursor-pointer transition transform hover:-translate-y-3 hover:shadow-2xl
              bg-white p-14 rounded-3xl shadow-xl border border-gray-100 text-center flex flex-col min-h-[320px]"
    onClick={() => navigate("/student/chat")} // ✅ Updated route
  >
    <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
      Queries
    </h3>
    <p className="text-gray-600 text-lg md:text-xl">
      Raise questions or connect directly with teachers.
    </p>
  </div> */}

        </section>


        {/* Extra space below cards for footer */}
        <div className="h-32" />
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}



