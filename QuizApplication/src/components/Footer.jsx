import { FaInstagram, FaDiscord, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background-dark text-gray-300 py-10 border-t border-purple-900/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Gradient Line */}
        <div className="h-1 w-32 bg-linear-to-r from-purple-700 to-cyan-400 rounded-full mb-10"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-gothic">
          {/* Column 1 - About */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">Quizzy 🎯</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Compete with your friends in real-time multiplayer quizzes.
              Learn, play, and top the leaderboard — all in one place!
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-all duration-300"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-all duration-300"
                >
                  Rooms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-all duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Socials */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">Connect With Us</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-purple-400 hover:scale-110 transition-transform text-2xl"
              >
                <FaDiscord className="text-purple-400 hover:scale-110 transition-transform text-3xl" />

              </a>
              <a
                href="#"
                className="text-purple-400 hover:scale-110 transition-transform text-2xl"
              >
               <FaGithub className="text-white hover:scale-110 transition-transform text-3xl" />

              </a>
              <a
                href="#"
                className="text-purple-400 hover:scale-110 transition-transform text-2xl"
              >
                <FaInstagram className="text-pink-400 hover:scale-110 transition-transform text-3xl" />

              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-purple-800/30 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-purple-400">Quizzy</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
