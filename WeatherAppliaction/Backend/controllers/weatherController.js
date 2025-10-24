import { fetchWeatherData, fetchForecastData, fetchAirQualityData } from '../services/weatherService.js';

export const getWeatherByCity = async (req, res) => {
    console.log('Received request for city weather with query:', req.query);
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const [weather, forecast, airQuality] = await Promise.allSettled([
      fetchWeatherData({ q: city }),
      fetchForecastData({ q: city }),
      fetchAirQualityData({ q: city })
    ]);

    if (weather.status === 'rejected') {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json({
      current: weather.value,
      forecast: forecast.status === 'fulfilled' ? forecast.value : null,
      airQuality: airQuality.status === 'fulfilled' ? airQuality.value : null
    });
  } catch (error) {
    console.error('Error fetching weather by city:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

export const getWeatherByGeo = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    console.log(lat)
    console.log(lon)
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    }

    const [weather, forecast, airQuality] = await Promise.allSettled([
      fetchWeatherData({ lat, lon }),
      fetchForecastData({ lat, lon }),
      fetchAirQualityData({ lat, lon })
    ]);

    if (weather.status === 'rejected') {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json({
      current: weather.value,
      forecast: forecast.status === 'fulfilled' ? forecast.value : null,
      airQuality: airQuality.status === 'fulfilled' ? airQuality.value : null
    });
  } catch (error) {
    console.error('Error fetching weather by geo:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
