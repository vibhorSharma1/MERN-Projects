import React from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaMobileAlt, FaUsers, FaLock } from "react-icons/fa";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function LandingPage() {
    const features = [
  {
    title: "Real-time Quiz Competition",
    description: "Play and compete live with others on a dynamic leaderboard that updates instantly.",
    icon: <FaBrain className="text-5xl text-purple-400 mb-4" />,
  },
  {
    title: "Responsive Game Interface",
    description: "Enjoy a seamless and responsive quiz experience on any device — mobile or desktop.",
    icon: <FaMobileAlt className="text-5xl text-indigo-400 mb-4" />,
  },
  {
    title: "Dynamic Quiz Rooms",
    description: "Host or join rooms effortlessly, making every quiz a unique multiplayer challenge.",
    icon: <FaUsers className="text-5xl text-pink-400 mb-4" />,
  },
  {
    title: "Secure Authentication",
    description: "Stay protected with JWT-based authentication ensuring your game data is safe.",
    icon: <FaLock className="text-5xl text-blue-400 mb-4" />,
  },
];
  return (
    <div className="w-full min-h-screen bg-background-dark font-gothic text-white">
      <main className="flex flex-col-reverse md:flex-row items-center justify-center px-8 py-20 max-w-6xl mx-auto">
        {/* Left Text Section */}
        <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            Compete in Real-Time <span className="text-purple-400">Quizzes</span> with Friends!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Challenge your friends and family in a fun, interactive, and competitive quiz experience.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-transform"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 bg-[#362348] rounded-full font-bold hover:bg-[#4b2f5e] hover:scale-105 transition-transform"
            >
              Login
            </Link>

            <Link
              to="/join"
              className="px-6 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary/20 hover:scale-105 transition-transform"
            >
              Join Game
            </Link>
          </div>
        </div>

        {/* Right Animation / Hero Icon */}
        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-[spin_20s_linear_infinite] shadow-[0_0_30px_rgba(138,43,226,0.3)]">
            <div className="w-full h-full bg-background-dark/80 rounded-2xl flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
              <span className="material-symbols-outlined font-bold text-white text-5xl animate-pulse">
                QuizzY...
              </span>
            </div>
          </div>
        </div>
      </main>
      <section className="w-full bg-background-dark py-20 px-6 md:px-16 text-center ">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 font-gothic">
        Why Choose <span className="text-purple-400">Quizzy?</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#191022] via-[#221733] to-[#2a1b3d] p-[2px] rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-background-dark rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-lg hover:shadow-purple-800/40 transition-all duration-300">
              {feature.icon}
              <h3 className="text-2xl font-semibold text-white mb-3 font-gothic">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="w-full bg-background-dark text-gray-200 py-28 px-6 md:px-16 font-gothic overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Profile Image */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex-shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 to-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
          <img
            src="https://github.com/vibhorsharma1.png" // Replace with your image if you want
            alt="Vibhor Sharma"
            className="w-full h-full rounded-full object-cover border-4 border-purple-700 shadow-[0_0_40px_rgba(138,43,226,0.4)]"
          />
        </div>

        {/* About Text */}
        <div className="flex flex-col gap-8 text-center md:text-left md:w-3/5">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            About <span className="text-purple-400">Me</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Hey 👋 I’m <span className="text-purple-300 font-semibold">Vibhor Sharma</span>,  
            a passionate <span className="text-indigo-400 font-semibold">B.Tech (IT)</span> final-year student  
            from <span className="text-pink-400 font-semibold">AKTU University</span>.  
            I’m currently building <span className="text-purple-300 font-semibold">Quizzy</span> —  
            a real-time multiplayer quiz platform where users can challenge friends live!  
            I enjoy creating sleek, interactive, and modern web apps using the MERN stack ⚡.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
            <a
              href="mailto:vibhorsharma166@gmail.com"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#221733] hover:bg-purple-700 transition-all duration-300"
            >
              <MdEmail className="text-2xl text-purple-300" />
              <span className="font-semibold text-white">Email Me</span>
            </a>
            <a
              href="https://github.com/vibhorsharma1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#221733] hover:bg-gray-700 transition-all duration-300"
            >
              <FaGithub className="text-2xl text-purple-300" />
              <span className="font-semibold text-white">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-10 mt-24 flex-wrap">
        <a
          href="https://www.instagram.com/vibhorsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-[#191022] rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:scale-110"
        >
          <FaInstagram className="text-3xl text-white" />
        </a>
        <a
          href="https://www.facebook.com/vibhorsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-[#191022] rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:scale-110"
        >
          <FaFacebook className="text-3xl text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/vibhorsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-[#191022] rounded-full hover:bg-blue-500 transition-colors duration-300 shadow-lg hover:scale-110"
        >
          <FaLinkedin className="text-3xl text-white" />
        </a>
      </div>

      {/* Footer Line */}
      <div className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">Vibhor Sharma</span> —  
        Built with 💜 using MERN Stack
      </div>
    </section>
    </div>
  );
}

export default LandingPage;
