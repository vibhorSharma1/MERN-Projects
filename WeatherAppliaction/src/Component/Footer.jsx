import { Heart, CloudSun } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-auto bg-gradient-to-r from-sky-400/90 via-blue-500/90 to-indigo-500/90 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 backdrop-blur-md text-white dark:text-gray-300 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 text-sm">
          <CloudSun className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="font-medium">© 2025 WeatherWise. All rights reserved.</span>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-100 dark:text-gray-400">Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]" />
          <span className="text-gray-100 dark:text-gray-400">using</span>
          <span className="font-semibold text-yellow-300">OpenWeather API</span>
        </div>

        {/* Right Section */}
        <div className="text-sm">
          Data powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 font-medium hover:text-yellow-400 transition-all duration-200 underline underline-offset-4"
          >
            OpenWeatherMap
          </a>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-[3px] bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-600"></div>
    </footer>
  );
};

export default Footer;
