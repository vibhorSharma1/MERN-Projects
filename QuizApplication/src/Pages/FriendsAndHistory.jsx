import React, { useEffect, useState } from "react";

export default function FriendsAndHistory() {
  const [friends, setFriends] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendsAndQuizzes = async () => {
      try {
        const [friendsRes, quizzesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lobby/friends`, {
            credentials: "include",
          }),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lobby/quizzes`, {
            credentials: "include",
          }),
        ]);

        const friendsData = await friendsRes.json();
        const quizzesData = await quizzesRes.json();

        setFriends(friendsData.friends || []);
        setQuizzes(quizzesData.quizzes || []);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFriendsAndQuizzes();
  }, []);

  if (loading)
    return (
      <p className="text-white/60 text-center mt-6">Loading your dashboard...</p>
    );

  
  return (
    <div>
      {/* Friends Section */}
      <h2 className="text-2xl font-bold mb-4">Friends</h2>
      {friends.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-white/60">
          No friends yet.{" "}
          <a
            href="/addFriend"
            className="text-secondary hover:underline font-semibold"
          >
            Add Friends
          </a>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                alt={friend.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{friend.name}</p>
                <p className="text-white/50 text-sm">{friend.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz History */}
      <h2 className="text-2xl font-bold mb-4">Your Quizzes</h2>
      {quizzes.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-white/60">
          No quizzes found yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <p className="font-semibold text-lg mb-1">{quiz.title}</p>
              <p className="text-white/60 text-sm mb-2">
                Topic: {quiz.topic}
              </p>
              <p className="text-white/40 text-sm">Score: {quiz.score ?? 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
