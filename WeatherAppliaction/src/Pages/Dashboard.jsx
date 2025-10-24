import { useState, useEffect } from 'react';
import SearchBar from '../Component/SearchBar';
import WeatherCard from '../Component/WeatherCard';
import ForecastChart from '../Component/ForecastChart';
import AQIInfo from '../Component/AQIInfo';
import { getWeatherByCity, getWeatherByCoordinates } from '../Services/weatherService';
import { Loader2, AlertCircle } from 'lucide-react';
import ErrorBoundary from '../Component/ErrorBoundary';

const Dashboard = ({ darkMode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch('delhi');
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 dark:from-gray-900 to-white dark:to-gray-800 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            loading={loading}
          />
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl shadow-lg flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50/70 dark:bg-red-900/30 backdrop-blur-md border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 mb-8 shadow-lg animate-fadeIn">
            <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="space-y-8 md:space-y-12 transition-all duration-500 ease-in-out">
            <WeatherCard weatherData={weatherData} />

            <ErrorBoundary>
              {weatherData.forecast && (
                <ForecastChart forecastData={weatherData.forecast} darkMode={darkMode} />
              )}
            </ErrorBoundary>

            {weatherData.airQuality && (
              <AQIInfo airQualityData={weatherData.airQuality} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
