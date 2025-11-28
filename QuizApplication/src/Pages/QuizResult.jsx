import React, { useEffect } from "react";

const players = [
  { rank: 1, name: "John Doe", points: 1200, medal: "🥇", border: "#FFD700", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLjGmJlFELOUYVXVvVxrNW24ug3Je6ClSmuD4t8yPWS8V-1ZnZFbcCtD1XwDm7GESQKch-zgUzvQlzTqP2wG6T9cZafX4wb2Ps4TEvMm1ZdP28t15BL-5np3GADLng98KeGJaJoQHq4EkcXWMp4tH7qsJoPizi2YBDMOK291i7s2sn5TdSTPhwTeoj2zhM-0lePqVlp4wUXQIv4OjSGo4CHmiZHaOIsnRm5ym8WeMXCUKkIOJ8dsP5jisLkJiWSTtEHCm01ju7IFY" },
  { rank: 2, name: "Jane Smith", points: 1150, medal: "🥈", border: "#C0C0C0", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARzSISHQ7w6XuY_tWLvN11Rhsu3HkXXMNkJKXsgM_2du6R1qgIvuN-tEuOPt41rjcoqIfVVGqQ5EtiCVaHxC_Dx7F-qvdk1D5mxwTKbbrMceaJYeNOTbhNeDu9_d2xJHcoI9bH4MUgxQMt_5pvarZPmGYeYCxH7H7Wzqg-hsxqtwVqHTPzAs_eBVBvPL6bqY8mahzZoooybk8kCagCgqd_yccUh1P_rQyn2s6FEwI8H8McDwstQBy9ICkGDa-b_xN9EHEHB10swlk" },
  { rank: 3, name: "Peter Jones", points: 1100, medal: "🥉", border: "#CD7F32", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp450OZ2wdJPn13oGk-jxf4f_K1vpsR1X8eEgTrGqQU0XNzmWcbDck1s8j_V4Yxx7Z8HPJXbtlBu3XW5JeND8GrDJv3Tu9lK4_-vMNAWiFudyojjpMPuzYJ-9InNUDyt6kB6J0QdDk0Cnybahh2sr6lIoDTyxcnh9MfD8HRqUCTtMEumEc0s8cfbSIBmzv7bR6xbiVnMqcBGuUeJYkDFIxomMid23Bm5DFC2AhABth01QtiLVxbtGXq91Ss2WHqMioigK3BmH7apw" },
];

const others = [
  { rank: 4, name: "Mary Williams", points: 1050 },
  { rank: 5, name: "Susan Brown", points: 980 },
  { rank: 6, name: "David Garcia", points: 950 },
  { rank: 7, name: "Karen Miller", points: 920 },
];

const QuizResults = () => {
  useEffect(() => {
    const confettiContainer = document.getElementById("confetti-container");
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.backgroundColor =
        Math.random() > 0.5 ? "#8A2BE2" : "#00FFFF";
      confettiContainer.appendChild(confetti);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background-dark text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Confetti Layer */}
      <div
        id="confetti-container"
        className="absolute inset-0 pointer-events-none"
      ></div>

      {/* Header */}
      <div className="text-center mb-10 z-10">
        <h1 className="text-5xl font-black tracking-tighter">Quiz Complete!</h1>
        <p className="text-secondary text-lg font-normal">
          WEB3 WIZARDS - Room #A4B2
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-12">
        {players.map((player, index) => (
          <div
            key={player.rank}
            className={`flex flex-col items-center ${
              index === 0 ? "order-2 md:order-2" : index === 1 ? "order-1" : "order-3"
            }`}
          >
            <div className="relative">
              <div
                className={`bg-center bg-no-repeat bg-cover rounded-full ${
                  player.rank === 1 ? "w-40 h-40" : "w-28 h-28"
                } border-4`}
                style={{
                  borderColor: player.border,
                  backgroundImage: `url(${player.img})`,
                }}
              ></div>
              <div
                className={`absolute ${
                  player.rank === 1 ? "-top-6 -right-6 text-6xl" : "-top-4 text-4xl"
                }`}
              >
                {player.medal}
              </div>
            </div>
            <p className="text-white text-xl font-bold mt-2">{player.name}</p>
            <p className="text-gray-400 text-lg">{player.points} PTS</p>
            <div
              className={`w-full bg-gradient-to-t from-[${player.border}]/50 to-transparent rounded-t-lg p-4 text-center mt-2 flex items-center justify-center ${
                player.rank === 1 ? "h-48" : player.rank === 2 ? "h-24" : "h-16"
              }`}
            >
              <p
                className={`text-white font-bold ${
                  player.rank === 1 ? "text-6xl" : "text-4xl"
                }`}
              >
                {player.rank}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Other Players */}
      <div className="bg-background-dark/50 backdrop-blur-sm rounded-lg p-4 w-full max-w-xl">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {others.map((p, i) => (
            <div
              key={p.rank}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
                i === 0
                  ? "bg-primary/20 border border-primary"
                  : "hover:bg-primary/10 transition"
              }`}
            >
              <p
                className={`${
                  i === 0 ? "text-secondary" : "text-gray-400"
                } text-lg font-bold w-8 text-center`}
              >
                #{p.rank}
              </p>
              <p className="text-white text-base font-medium flex-1">
                {p.name}
              </p>
              <p
                className={`${
                  i === 0 ? "text-secondary" : "text-white"
                } text-base font-normal`}
              >
                {p.points} PTS
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 z-10">
        <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/80 transition transform hover:scale-105">
          <span className="material-symbols-outlined mr-2">replay</span>
          Play Again
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-secondary/20 text-secondary text-lg font-bold rounded-full hover:bg-secondary/30 transition">
          <span className="material-symbols-outlined mr-2">dashboard</span>
          Return to Dashboard
        </button>
      </div>

      {/* Confetti CSS */}
      <style>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: confetti-fall 2s ease-out infinite;
          opacity: 0;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizResults;
