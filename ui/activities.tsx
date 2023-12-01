'use client';
import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Activities',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stepSize: 50,
      max: 200, // Set an appropriate max value
      min: 0, // Set an appropriate min value
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

const labels = ['1 Dec', '8 Dec', '15 Dec', '22 Dec', '29 Dec'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Tasks',
      data: [50, 150, 45, 55, 180],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderWidth: 1,
    },
  ],
};

export default function Leaderboard() {
  return (
    <div className="mt-8">
      <Line options={options} data={data} />
    </div>
  );
}
