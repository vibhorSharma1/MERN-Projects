import express from 'express';
import { getWeatherByCity, getWeatherByGeo } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', getWeatherByCity);
router.get('/geo', getWeatherByGeo);

export default router;
