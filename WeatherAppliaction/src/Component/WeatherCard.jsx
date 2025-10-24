import { Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { getWeatherIcon } from '../Services/weatherService';

const WeatherCard = ({ weatherData }) => {
  const { current } = weatherData;
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-300/30">
      
      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-transparent dark:from-blue-600/20 dark:via-purple-700/10 blur-3xl"></div>

      {/* City & Condition */}
      <div className="relative text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          {current.name}, {current.sys.country}
        </h2>
        <p className="capitalize text-lg text-gray-600 dark:text-gray-400 mt-1">
          {current.weather[0].description}
        </p>
      </div>

      {/* Main Weather Info */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 mb-10">
        <img
          src={getWeatherIcon(current.weather[0].icon)}
          alt={current.weather[0].description}
          className="w-32 h-32 md:w-36 md:h-36 drop-shadow-lg animate-pulse"
        />
        <div className="text-center md:text-left">
          <div className="text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {Math.round(current.main.temp)}°C
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400 mt-2">
            Feels like {Math.round(current.main.feels_like)}°C
          </div>
        </div>
      </div>

      {/* Weather Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={<Droplets className="w-8 h-8 text-blue-500 dark:text-blue-400" />}
          label="Humidity"
          value={`${current.main.humidity}%`}
          gradient="from-blue-100/50 to-blue-50/30 dark:from-blue-900/40 dark:to-gray-800"
        />
        <StatCard
          icon={<Wind className="w-8 h-8 text-green-500 dark:text-green-400" />}
          label="Wind Speed"
          value={`${current.wind.speed} m/s`}
          gradient="from-green-100/50 to-green-50/30 dark:from-green-900/40 dark:to-gray-800"
        />
        <StatCard
          icon={<Gauge className="w-8 h-8 text-purple-500 dark:text-purple-400" />}
          label="Pressure"
          value={`${current.main.pressure} hPa`}
          gradient="from-purple-100/50 to-purple-50/30 dark:from-purple-900/40 dark:to-gray-800"
        />
        <StatCard
          icon={<Eye className="w-8 h-8 text-orange-500 dark:text-orange-400" />}
          label="Visibility"
          value={`${(current.visibility / 1000).toFixed(1)} km`}
          gradient="from-orange-100/50 to-orange-50/30 dark:from-orange-900/40 dark:to-gray-800"
        />
      </div>
    </div>
  );
};

// Small Reusable Component for Stats
const StatCard = ({ icon, label, value, gradient }) => (
  <div
    className={`relative rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-md bg-gradient-to-br ${gradient} transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
  >
    {icon}
    <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">{label}</div>
    <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
      {value}
    </div>
  </div>
);

export default WeatherCard;
