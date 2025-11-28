import React, { useEffect, useState } from "react";

const LeaderboardPage = () => {
  // Dummy leaderboard data (replace with backend data later)
  const [players, setPlayers] = useState([
    { id: 1, name: "Vibhor Sharma", points: 1800, matches: 22 },
    { id: 2, name: "Ananya Verma", points: 1450, matches: 18 },
    { id: 3, name: "Rohit Mehta", points: 2100, matches: 25 },
    { id: 4, name: "Tanya Singh", points: 1200, matches: 15 },
    { id: 5, name: "Aman Gupta", points: 950, matches: 11 },
    { id: 6, name: "Karan Thakur", points: 1650, matches: 20 },
  ]);

  // Sort players by points descending (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-400 font-gothic">
        Global Leaderboard 🏆
      </h1>

      {/* Top 3 Players Podium */}
      <div className="flex flex-wrap justify-center items-end gap-6 mb-16">
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <div
            key={player.id}
            className={`flex flex-col items-center justify-end p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm ${
              index === 0
                ? "bg-gradient-to-b from-yellow-400/30 to-yellow-600/10 scale-110"
                : index === 1
                ? "bg-gradient-to-b from-gray-400/30 to-gray-600/10"
                : "bg-gradient-to-b from-amber-600/30 to-amber-800/10"
            }`}
          >
            <div
              className="w-24 h-24 rounded-full bg-cover bg-center mb-4 border-4 border-purple-400"
              style={{
                backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}")`,
              }}
            ></div>
            <h2 className="text-xl font-bold">{player.name}</h2>
            <p className="text-purple-300 font-semibold">{player.points} pts</p>
            <p className="text-sm text-gray-400">{player.matches} matches</p>
            <div
              className={`mt-3 text-lg font-bold ${
                index === 0
                  ? "text-yellow-400"
                  : index === 1
                  ? "text-gray-300"
                  : "text-amber-500"
              }`}
            >
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-5xl mx-auto bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/10">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                Player
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                Points
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-purple-300 uppercase tracking-wider">
                Matches
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className="hover:bg-white/10 transition-all duration-200 border-b border-white/10"
              >
                <td className="py-4 px-6 font-bold text-lg text-purple-400">
                  #{index + 1}
                </td>
                <td className="py-4 px-6 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center border border-purple-400/30"
                    style={{
                      backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}")`,
                    }}
                  ></div>
                  <span className="font-semibold">{player.name}</span>
                </td>
                <td className="py-4 px-6 text-gray-300">{player.points}</td>
                <td className="py-4 px-6 text-gray-300">{player.matches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
