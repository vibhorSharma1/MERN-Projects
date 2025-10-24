import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;
console.log('API Key:', API_KEY);

export const fetchWeatherData = async (params) => {
  let url = `${BASE_URL}/weather`;
  if (params.q) {
    // City name se
    const response = await axios.get(url, {
      params: { q: params.q, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } else if (params.lat && params.lon) {
    // Lat/lon se
    const response = await axios.get(url, {
      params: { lat: params.lat, lon: params.lon, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } else {
    throw new Error("Please provide either 'q' (city name) or 'lat' and 'lon' parameters.");
  }
};

export const fetchForecastData = async (params) => {
  let url = `${BASE_URL}/forecast`;
  if (params.q) {
    const response = await axios.get(url, {
      params: { q: params.q, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } else if (params.lat && params.lon) {
    const response = await axios.get(url, {
      params: { lat: params.lat, lon: params.lon, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } else {
    throw new Error("Please provide either 'q' (city name) or 'lat' and 'lon' parameters.");
  }
};

export const fetchAirQualityData = async (params) => {
  let lat, lon;

  if (params.q) {
    const weatherData = await fetchWeatherData({ q: params.q });
    lat = weatherData.coord.lat;
    lon = weatherData.coord.lon;
  } else if (params.lat && params.lon) {
    lat = params.lat;
    lon = params.lon;
  } else {
    throw new Error("Please provide either 'q' (city name) or 'lat' and 'lon' parameters.");
  }

  const response = await axios.get(`${BASE_URL}/air_pollution`, {
    params: { lat, lon, appid: API_KEY },
  });

  const aqi = response.data.list?.[0]?.main?.aqi;
  if (aqi === undefined) {
    throw new Error("AQI data not found in response.");
  }

  return { ...response.data, aqi };
};

