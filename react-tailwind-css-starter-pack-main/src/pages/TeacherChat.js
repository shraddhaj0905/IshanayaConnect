import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

export default function TeacherChat() {
  const { studentId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const teacherId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    socket.emit("joinRoom", studentId);

    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:4000/api/chat/chat/${studentId}/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    };
    fetchMessages();

    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

    return () => socket.disconnect();
  }, [studentId]);

  const sendMessage = async () => {
    if (!input) return;
    const msgObj = {
      senderId: teacherId,
      receiverId: studentId,
      senderModel: "ApprovedEmployee",
      receiverModel: "ApprovedStudent",
      message: input,
    };
    socket.emit("sendMessage", { room: studentId, message: msgObj });
    await axios.post("http://localhost:4000/api/chat/send", msgObj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages([...messages, msgObj]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">Chat with Student</h1>
      <div className="border p-2 h-96 overflow-y-scroll mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`${m.senderId === teacherId ? "text-right" : "text-left"}`}>
            <span className="bg-gray-200 p-2 rounded inline-block my-1">{m.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 flex-1"/>
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2">Send</button>
      </div>
    </div>
  );
}
