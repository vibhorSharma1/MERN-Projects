import React, { useState, useEffect } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz/`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) setHistory(data.history);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-400 font-gothic">
        Your Quiz History 🧠
      </h1>

      {/* If no history */}
      {history.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No quiz history available 😔</p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    Quiz Title
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider text-center">
                    Result
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((quiz) => (
                  <tr
                    key={quiz._id}
                    className="hover:bg-white/10 transition-all duration-200 border-b border-white/10"
                  >
                    <td className="py-4 px-6 font-semibold text-lg">
                      {quiz.title}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(quiz.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{quiz.score}</td>
                    <td className="py-4 px-6 text-gray-300">#{quiz.rank}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-4 py-1 rounded-full font-bold text-sm ${
                          quiz.status === "Win"
                            ? "bg-green-500/20 text-green-300 border border-green-500/40"
                            : "bg-red-500/20 text-red-300 border border-red-500/40"
                        }`}
                      >
                        {quiz.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary section */}
          <div className="max-w-5xl mx-auto mt-10 flex flex-wrap justify-center gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
              <p className="text-lg font-semibold text-purple-300">Total Quizzes</p>
              <p className="text-3xl font-bold mt-1">{history.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
              <p className="text-lg font-semibold text-purple-300">Total Wins</p>
              <p className="text-3xl font-bold mt-1">
                {history.filter((q) => q.status === "Win").length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
              <p className="text-lg font-semibold text-purple-300">Best Score</p>
              <p className="text-3xl font-bold mt-1">
                {Math.max(...history.map((q) => q.score))}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
