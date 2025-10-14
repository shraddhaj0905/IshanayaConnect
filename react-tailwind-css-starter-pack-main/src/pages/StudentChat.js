
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

// Connect to backend socket
const socket = io("http://localhost:4000");

export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const parentToken = localStorage.getItem("parentToken");

  useEffect(() => {
    // Redirect if parent is not logged in
    if (!parentToken) {
      navigate("/parentLogin");
      return;
    }

    const fetchStudentAndTeacher = async () => {
      try {
        // 1️⃣ Fetch the student assigned to this parent
        const studentRes = await axios.get(
          "http://localhost:4000/api/chats/my-student", // make sure backend returns the assigned student
        );

        const studentData = studentRes.data; // { _id, name, assignedTeacher }
        setStudent(studentData);

        if (!studentData.assignedTeacher) {
          console.error("No teacher assigned to this student");
          return;
        }

        const teacherData = studentData.assignedTeacher; // { _id, name, etc. }
        setTeacher(teacherData);

        // Join socket room for teacher
        socket.emit("joinRoom", teacherData._id);

        // 2️⃣ Fetch previous messages
        const chatRes = await axios.get(
          `http://localhost:4000/api/chats/chat/${studentData._id}/${teacherData._id}`,
        
        );
        setMessages(chatRes.data);
      } catch (err) {
        console.error("Error fetching student or teacher:", err);
      }
    };

    fetchStudentAndTeacher();

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup socket on unmount
    return () => socket.disconnect();
  }, [parentToken, navigate]);

  const sendMessage = async () => {
    if (!input || !teacher || !student) return;

    const msgObj = {
      senderId: student._id,
      receiverId: teacher._id,
      senderModel: "ApprovedStudent",
      receiverModel: "ApprovedEmployee",
      message: input,
    };

    try {
      // Send via socket
      socket.emit("sendMessage", { room: teacher._id, message: msgObj });

      // Save to backend
      await axios.post("http://localhost:4000/api/chats/send", msgObj, {
        headers: { Authorization: `Bearer ${parentToken}` },
      });

      setMessages([...messages, msgObj]);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!teacher || !student) return <p className="text-center mt-20">Loading chat...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">
        Chat with {teacher.name} about {student.name}
      </h1>

      <div className="border p-2 h-96 overflow-y-scroll mb-2 flex flex-col">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-1 flex ${
              m.senderId === student._id ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`p-2 rounded ${
                m.senderId === student._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {m.message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
