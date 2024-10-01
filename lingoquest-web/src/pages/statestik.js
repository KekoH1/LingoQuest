import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/navbar';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function statestik() {
  // Example data for the charts


  const pieData = {
    labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Others'],
    datasets: [
      {
        data: [60, 20, 10, 5, 5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div>
    <Navbar />
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>Statistik sida</h1>

      <h2>Användarens framsteg</h2>


      <div style={{ width: '40%' }}>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
    </div>
  );
}

export default statestik;
