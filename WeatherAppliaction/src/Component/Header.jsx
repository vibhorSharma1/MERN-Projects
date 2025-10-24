import { CloudSun, Moon, Sun } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <CloudSun className="w-10 h-10 text-yellow-200 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] animate-pulse" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full blur-sm opacity-70"></span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            Weather<span className="text-yellow-300">Wise</span>
          </h1>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700/40 dark:hover:bg-gray-700/60 backdrop-blur-md shadow-md transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-200" />
          )}
        </button>
      </div>

      {/* Decorative Line */}
      <div className="h-[3px] bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-600"></div>
    </header>
  );
};

export default Header;
