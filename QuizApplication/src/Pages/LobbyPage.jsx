import React, { useState, useEffect } from "react";
import FriendsAndHistory from "./FriendsAndHistory.jsx";

export default function LobbyPage() {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🟢 new states for dynamic data
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const handleProfileUpdate = () => setProfileUpdated(true);
  const handleHostQuiz = () => {
    if (profileUpdated) setShowModal(true);
  };

  // 🧠 Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lobby/rooms`, {
          credentials: "include",
        });
        const data = await res.json();
        setRooms(data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="dark bg-background-dark text-white min-h-screen font-display flex flex-col">
      {/* Profile Reminder */}
      {!profileUpdated ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 mx-6 mt-6 p-4 rounded-xl flex flex-col items-center text-center shadow-md">
          <h2 className="text-xl font-bold mb-2">Profile Incomplete!</h2>
          <p className="text-sm mb-4">
            Please update your profile before you can host or join quizzes.
          </p>
          <button
            onClick={handleProfileUpdate}
            className="px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
          >
            Update Profile Now
          </button>
        </div>
      ) : (
        <div className="p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="bg-cover bg-center rounded-full h-24 w-24 sm:h-32 sm:w-32"
              style={{
                backgroundImage:
                  'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan")',
              }}
            ></div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold">Jordan Peterson</p>
              <p className="text-white/60 text-sm sm:text-base">
                Total Score: 1500 | Wins: 10
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto gap-4">
            <button
              onClick={handleHostQuiz}
              disabled={!profileUpdated}
              className={`flex-1 sm:flex-auto h-12 px-6 rounded-full text-white font-bold shadow-lg transition-transform duration-300 ${
                profileUpdated
                  ? "gradient-bg hover:scale-105"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              Host Quiz
            </button>
            <button
              disabled={!profileUpdated}
              className={`flex-1 sm:flex-auto h-12 px-6 rounded-full text-white font-bold shadow-lg transition-transform duration-300 ${
                profileUpdated
                  ? "bg-secondary hover:scale-105"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              Join Quiz
            </button>
          </div>
        </div>
      )}

      {/* Available Rooms */}
      <div className="mt-8 px-6">
        <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
        <div className="space-y-3">
          {loadingRooms ? (
            <p className="text-white/60 text-center">Loading rooms...</p>
          ) : rooms.length === 0 ? (
            <div className="text-white/60 text-center bg-white/5 border border-white/10 rounded-lg py-4">
              No rooms available right now.
            </div>
          ) : (
            rooms.map((room, idx) => (
              <div
                key={room._id || idx}
                className="flex items-center justify-between gap-4 bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-lg font-medium">{room.name}</p>
                    <p className="text-white/60 text-sm">
                      Hosted by {room.hostName} |{" "}
                      {room.players}/{room.maxPlayers} Players
                    </p>
                  </div>
                </div>

                <button
                  disabled={!profileUpdated || room.isFull}
                  className={`px-5 h-10 rounded-full text-sm font-medium transition ${
                    room.isFull
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : profileUpdated
                      ? "bg-secondary hover:bg-secondary/80"
                      : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  {room.isFull ? "Full" : "Join"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Friends and History Section (unchanged) */}
      <div className="mt-12 px-6 mb-12">
        <FriendsAndHistory />
      </div>
    </div>
  );
}
