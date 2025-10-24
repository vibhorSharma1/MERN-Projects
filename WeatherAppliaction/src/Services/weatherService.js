import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    
    throw new Error(error.response?.data?.error || 'Failed to fetch weather data');
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/geo`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch weather data');
  }
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getAQIDescription = (aqi) => {
  const descriptions = {
    1: { label: 'Good', color: 'text-green-600 dark:text-green-400' },
    2: { label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' },
    3: { label: 'Moderate', color: 'text-orange-600 dark:text-orange-400' },
    4: { label: 'Poor', color: 'text-red-600 dark:text-red-400' },
    5: { label: 'Very Poor', color: 'text-purple-600 dark:text-purple-400' }
  };
  return descriptions[aqi] || { label: 'Unknown', color: 'text-gray-600' };
};
