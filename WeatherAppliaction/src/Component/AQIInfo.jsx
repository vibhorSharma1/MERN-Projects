import { Wind } from 'lucide-react';

// Helper function: realistic AQI description (0–500 scale)
const getAQIRealDescription = (aqi) => {
  if (aqi <= 50) return { label: "Good 😊", color: "text-green-500", bg: "from-green-100 to-green-200" };
  if (aqi <= 100) return { label: "Moderate 😐", color: "text-yellow-500", bg: "from-yellow-100 to-yellow-200" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive 😷", color: "text-orange-500", bg: "from-orange-100 to-orange-200" };
  if (aqi <= 200) return { label: "Unhealthy 😫", color: "text-red-500", bg: "from-red-100 to-red-200" };
  if (aqi <= 300) return { label: "Very Unhealthy 🤢", color: "text-purple-500", bg: "from-purple-100 to-purple-200" };
  return { label: "Hazardous ☠️", color: "text-rose-600", bg: "from-rose-100 to-rose-200" };
};

const AQIInfo = ({ airQualityData }) => {
  if (!airQualityData || !airQualityData.list || airQualityData.list.length === 0) {
    return null;
  }

  // Many APIs give average or main.aqi 1–5, but we can use components to estimate real AQI if available
  const components = airQualityData.list[0].components;
  const estimatedAQI = Math.round(
    (components.pm2_5 * 2) + (components.no2 * 0.5) + (components.o3 * 0.3)
  ); // basic estimation

  const { label, color, bg } = getAQIRealDescription(estimatedAQI);

  return (
    <div
      className={`bg-gradient-to-br ${bg} dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-blue-200/30 hover:-translate-y-1`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Wind className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin-slow" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Air Quality Index</h3>
      </div>

      {/* AQI Value */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-extrabold ${color} drop-shadow-lg mb-2`}>
          {estimatedAQI}
        </div>
        <div className={`text-xl font-semibold ${color}`}>{label}</div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          (Calculated using PM2.5, NO₂, and O₃ concentration)
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "CO", value: components.co },
          { name: "NO₂", value: components.no2 },
          { name: "O₃", value: components.o3 },
          { name: "PM2.5", value: components.pm2_5 },
        ].map((comp) => (
          <div
            key={comp.name}
            className="bg-white/60 dark:bg-gray-700/80 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{comp.name}</div>
            <div className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
              {comp.value.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">μg/m³</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQIInfo;
