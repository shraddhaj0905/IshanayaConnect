// import { useState, useEffect } from "react";
// import axios from "axios";


// export default function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);


//   // Fetch future announcements from backend
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/students/announcements"
//         );
//         // response.data.announcements contains the array
//         setAnnouncements(response.data.announcements);
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };


//     fetchAnnouncements();
//   }, []);


//   // Filter announcements by category and search term
//   const filteredAnnouncements = announcements.filter(
//     (announcement) =>
//       (selectedCategory === "All" || announcement.category === selectedCategory) &&
//       announcement.title.toLowerCase().includes(search.toLowerCase())
//   );


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Navbar */}
//       <nav className="bg-purple-800 text-white py-4 px-6 text-center text-2xl font-bold">
//         School Announcements
//       </nav>


//       {/* Search & Filters */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <input
//           type="text"
//           placeholder="🔍 Search announcements..."
//           className="p-3 w-full border rounded-lg shadow-sm bg-white text-black"
//           onChange={(e) => setSearch(e.target.value)}
//         />


//         <div className="flex gap-4 justify-center mt-4">
//           {["All", "Events", "Holiday", "Urgent"].map((category) => (
//             <button
//               key={category}
//               className={`px-4 py-2 rounded-lg font-bold transition ${
//                 selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-300"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>


//       {/* Announcement Cards */}
//       <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredAnnouncements.length > 0 ? (
//           filteredAnnouncements.map((announcement) => {
//             // Set priority colors dynamically
//             let priorityClass = "bg-gray-300";
//             if (announcement.category === "Urgent") priorityClass = "bg-red-400 text-white";
//             else if (announcement.category === "Events") priorityClass = "bg-blue-300";
//             else if (announcement.category === "Holiday") priorityClass = "bg-green-300";


//             return (
//               <div
//                 key={announcement._id || announcement.id}
//                 className={`p-6 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 hover:shadow-xl transition ${priorityClass}`}
//                 onClick={() => setSelectedAnnouncement(announcement)}
//               >
//                 <h2 className="text-2xl font-bold">{announcement.title}</h2>
//                 <p className="text-black">{new Date(announcement.date).toDateString()}</p>
//                 <p className="mt-2">{announcement.description.substring(0, 50)}...</p>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-500">No announcements found.</p>
//         )}
//       </div>


//       {/* Modal for Full Announcement */}
//       {selectedAnnouncement && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
//             <h2 className="text-2xl font-bold mb-2">{selectedAnnouncement.title}</h2>
//             <p className="text-gray-500">{new Date(selectedAnnouncement.date).toDateString()}</p>
//             <p className="mt-4">{selectedAnnouncement.description}</p>
//             <button
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
//               onClick={() => setSelectedAnnouncement(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import axios from "axios";
import { Search, CloudRain } from "lucide-react"; // added rain icon


export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/students/announcements"
        );
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);


  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      (selectedCategory === "All" || announcement.category === selectedCategory) &&
      announcement.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white py-5 px-6 text-center text-2xl font-bold shadow-md">
        School Announcements
      </nav>


      {/* Search & Filters */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            className="pl-10 pr-4 py-3 w-full border rounded-2xl shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          {["All", "Events", "Holiday", "Urgent"].map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full font-medium transition shadow-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {/* Announcement Cards */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => {
            let priorityClass =
              "bg-white border border-gray-200 hover:shadow-lg hover:scale-[1.02] text-gray-800";


            if (announcement.category === "Urgent") {
              priorityClass =
                "bg-red-100 border-red-300 hover:shadow-lg hover:scale-[1.02] text-gray-800";
            } else if (announcement.category === "Events") {
              priorityClass =
                "bg-blue-100 border-blue-300 hover:shadow-lg hover:scale-[1.02] text-gray-800";
            } else if (announcement.category === "Holiday") {
              // Special case: Holiday due to rain
              if (
                announcement.title.toLowerCase().includes("rain") ||
                announcement.description.toLowerCase().includes("rain")
              ) {
                priorityClass =
                  "bg-teal-300 border-teal-400 hover:shadow-xl hover:scale-[1.02] text-black";
              } else {
                priorityClass =
                  "bg-amber-100 border-amber-300 hover:shadow-lg hover:scale-[1.02] text-gray-800";
              }
            }


            return (
              <div
                key={announcement._id || announcement.id}
                className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition ${priorityClass}`}
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                  {/* Add rain icon if it’s a rain holiday */}
                  {announcement.title.toLowerCase().includes("rain") ? (
                    <>
                      <CloudRain className="w-5 h-5" /> {announcement.title}
                    </>
                  ) : (
                    announcement.title
                  )}
                </h2>
                <p className="text-sm opacity-80">
                  {new Date(announcement.date).toDateString()}
                </p>
                <p className="mt-3">
                  {announcement.description.substring(0, 70)}...
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No announcements found.</p>
        )}
      </div>


      {/* Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center relative">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">
              {selectedAnnouncement.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date(selectedAnnouncement.date).toDateString()}
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {selectedAnnouncement.description}
            </p>
            <button
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              onClick={() => setSelectedAnnouncement(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}





