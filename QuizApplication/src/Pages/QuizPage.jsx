import React, { useEffect, useState } from "react";
import {
  initSocket,
  emitEvent,
  onEvent,
  offEvent,
} from "../services/socket";

const QuizPage = () => {
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [question, setQuestion] = useState(null);

  // Dummy user (later replace with auth)
  const user = {
    userID: "u" + Math.floor(Math.random() * 1000),
    userName: "Player_" + Math.floor(Math.random() * 100),
    roomID: "room123",
  };

  // Step 1: Initialize Socket + Events
  useEffect(() => {
    const s = initSocket("dummyToken");
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Connected:", s.id);
      emitEvent("joinRoom", user);
    });
    

    onEvent("roomUsers", (data) => {
      console.log("👥 Users in room:", data);
      setPlayers(data);
    });

    onEvent("receiveMessage", (data) => {
      console.log("📧 Message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      offEvent("roomUsers");
      offEvent("receiveMessage");
      s.disconnect();
    };
  }, []);

  // Step 2: Fetch question from backend
  const fetchQuestion = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/question");
      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      console.error("❌ Error fetching question:", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // Step 3: Send message
  const sendMessage = () => {
    console.log("User Name during ",user.userName)
    if (!msg.trim()) return;
    emitEvent("sendMessage", {
      roomID: user.roomID,
      userName: user.userName,
      message: msg,
    });
    setMsg("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background-dark text-white font-display">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-b-[#362348] px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight">
            Room: {user.roomID}
          </h2>
        </div>
        <button
          className="h-10 px-4 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition"
          onClick={() => socket?.disconnect()}
        >
          Leave Room
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Players */}
        <aside className="w-64 flex-shrink-0 bg-[#1a1122] p-4 border-r border-r-[#362348] overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Players</h3>
          <div className="flex flex-col gap-3">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#362348]"
              >
                <div className="relative">
                  <div
                    className="bg-center bg-cover rounded-full size-8"
                    style={{
                      backgroundImage:
                        "url('https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                        p.userName +
                        "')",
                    }}
                  ></div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[#362348] bg-green-400"></span>
                </div>
                <p className="text-sm font-medium">{p.userName}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Quiz Section */}
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-2xl w-full flex flex-col items-center gap-6">
            {question ? (
              <>
                <div className="relative size-40 flex items-center justify-center">
                  <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#362348"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#60a5fa"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-500"
                      style={{
                        strokeDasharray: 283,
                        strokeDashoffset: 141.5,
                      }}
                    />
                  </svg>
                  <span className="text-5xl font-bold">15s</span>
                </div>

                <div className="w-full text-center">
                  <h1 className="text-[32px] font-bold leading-tight">
                    {question.question}
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      className="p-4 rounded-lg bg-[#362348] hover:bg-blue-500/80 text-white font-semibold text-lg transition-colors duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>Loading question...</p>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={fetchQuestion}
                className="h-12 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
              >
                Next Question
              </button>
              <button className="h-12 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition">
                End Game
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Chat */}
        <aside className="w-80 flex-shrink-0 bg-[#1a1122] p-4 border-l border-l-[#362348] flex flex-col">
          <h3 className="text-lg font-bold mb-4">Chat</h3>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            {messages.map((m, index) => {
              const isOwn = m.userName === user.userName;
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  {!isOwn && (
                    <div
                      className="bg-center bg-cover rounded-full size-8"
                      style={{
                        backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${m.userName}')`,
                      }}
                    ></div>
                  )}
                  <div
                    className={`flex flex-col max-w-[70%] ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <p className="text-sm font-medium text-primary">{m.userName}</p>
                    <p
                      className={`text-sm p-2 rounded-lg ${
                        isOwn
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-[#362348] text-gray-300 rounded-tl-none"
                      }`}
                    >
                      {m.message}
                    </p>
                  </div>
                  {isOwn && (
                    <div
                      className="bg-center bg-cover rounded-full size-8"
                      style={{
                        backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${m.userName}')`,
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // 👈 enter se send
              className="flex-1 bg-[#362348] text-white placeholder-gray-400 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center size-10 rounded-full bg-primary text-white hover:bg-primary/90 transition"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuizPage;
