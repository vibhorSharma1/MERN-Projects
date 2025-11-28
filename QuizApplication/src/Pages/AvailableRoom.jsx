import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleJoinRoom=()=>{
    //join room logic
    navigate("/room/{roomId}");
  }

  // Create Room Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const roomsPerPage = 6;

  // Fetch rooms
  const fetchRooms = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/room/rooms?page=${page}&limit=${roomsPerPage}`,
        { credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch rooms");

      setRooms(data.rooms || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Create Room submit handler
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const roomData = Object.fromEntries(formData); // { name, topic }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/room/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(roomData),
      });

      const data = await res.json();

      if (data.success) {
        setShowCreateModal(false);
        fetchRooms(currentPage);
      }
    } catch (err) {
      console.error("Room creation error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white flex items-center justify-center text-xl">
        Loading rooms...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white flex items-center justify-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white px-8 py-12">
      
      {/* Header + Create Room Button */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-purple-400 font-gothic">
          Available Quiz Rooms 🎮
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded-full text-white text-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          + Create Room
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {rooms.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No rooms available right now 😔
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room._id}
              className="rounded-2xl border border-white/10 p-6 shadow-xl hover:scale-[1.03] hover:border-purple-500 transition-transform duration-300 bg-white/5"
            >
              <h2 className="text-xl font-bold mb-3">{room.name}</h2>

              {/* Host */}
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold text-white">Host:</span>{" "}
                {room.host?.email || "Unknown Host"}
              </p>

              {/* Topic */}
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold text-white">Topic:</span>{" "}
                {room.topic}
              </p>

              {/* Participants */}
              <p className="text-sm text-gray-300 mb-4">
                <span className="font-semibold text-white">Participants:</span>{" "}
                {room.participants?.length || 0}
              </p>

              <button
               onClick={handleJoinRoom}
                className="w-full rounded-full py-2 font-bold transition-all bg-purple-700 hover:bg-purple-800 text-white hover:scale-[1.05]"
              >
                Join Room
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {rooms.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold disabled:opacity-40"
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>

          <span className="text-lg font-semibold text-purple-300">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-[#1b102e] border border-white/10 rounded-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-4">
              Create a New Room
            </h3>

            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Room Name</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Topic</label>
                <input
                  name="topic"
                  required
                  className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-700 rounded-full font-bold hover:bg-purple-800 transition"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AvailableRooms;
