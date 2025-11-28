import React, { useEffect, useState } from "react";

export default function AddFriends() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/allUser`, {
          credentials: "include",
        });
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sendFriendRequest = async (userId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/friends/request/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setSentRequests((prev) => [...prev, userId]);
      } else {
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div className="dark bg-background-dark min-h-screen text-white font-display py-10 px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Add New Friends 👥
      </h1>

      {loading ? (
        <div className="text-center text-white/70 text-lg">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-white/60">
          No other users found 😔
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 shadow-md"
            >
              {/* Avatar */}
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-20 h-20 rounded-full mb-4 border border-white/20"
              />

              {/* Name & Email */}
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-white/50 text-sm mb-4">{user.email}</p>

              {/* Stats (optional if you track score) */}
              {user.totalScore && (
                <p className="text-white/40 text-sm mb-2">
                  🏆 Score: {user.totalScore}
                </p>
              )}

              {/* Button */}
              <button
                disabled={sentRequests.includes(user._id)}
                onClick={() => sendFriendRequest(user._id)}
                className={`mt-3 px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  sentRequests.includes(user._id)
                    ? "bg-green-600/30 text-green-400 cursor-not-allowed"
                    : "gradient-bg hover:scale-105 text-white"
                }`}
              >
                {sentRequests.includes(user._id)
                  ? "Request Sent ✅"
                  : "Send Request"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
