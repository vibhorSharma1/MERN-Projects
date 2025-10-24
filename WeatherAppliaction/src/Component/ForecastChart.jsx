import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ForecastChart = ({ forecastData, darkMode }) => {
  if (!forecastData || !forecastData.list) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-4">No forecast data available</p>;
  }

  const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

const labels = dailyForecasts.map(item => {
  const date = new Date(item.dt * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
});
  const temperatures = dailyForecasts.map((day) => day.main.temp);
  const feelsLike = dailyForecasts.map((day) => day.main.feels_like);

  const chartData = (canvas) => {
    // 🧱 safeguard for undefined canvas
    if (!canvas) return { labels: [], datasets: [] };

    const ctx = canvas.getContext("2d");
    if (!ctx) return { labels: [], datasets: [] };

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, "rgba(59,130,246,0.5)");
    gradient1.addColorStop(1, "rgba(59,130,246,0)");

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, "rgba(239,68,68,0.5)");
    gradient2.addColorStop(1, "rgba(239,68,68,0)");

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "#3b82f6",
          backgroundColor: gradient1,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Feels Like (°C)",
          data: feelsLike,
          borderColor: "#ef4444",
          backgroundColor: gradient2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#f3f4f6" : "#1f2937",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#f3f4f6" : "#1f2937" },
        grid: { display: false },
      },
      y: {
        ticks: { color: darkMode ? "#f3f4f6" : "#1f2937" },
        grid: { color: darkMode ? "#374151" : "#e5e7eb" },
      },
    },
  };

  const dataObj = chartData(document.createElement("canvas"));
return (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
    <Line data={dataObj} options={options} />
  </div>
);

};

export default ForecastChart;
