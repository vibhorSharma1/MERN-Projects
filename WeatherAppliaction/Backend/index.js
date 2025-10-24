import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/Weather.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`🌤 Weather API server running on http://localhost:${PORT}`);
});
