import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../components/navbar";
import "../assets/statestik.css";

// Register chart components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

function Statestik() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7196/api/Statistics/GetStatisticsByCategory"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStatistics(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!statistics || !Array.isArray(statistics)) {
    return <div>No data available.</div>;
  }

  const pieData = {
    labels: statistics.map((result) => result.categoryName),
    datasets: [
      {
        data: statistics.map((result) => result.totalScore),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
         "#FF7C99", 
          "#5BA2EB", 
          "#FFD54F", 
          "#62D1D1", 
          "#B77BFF", 
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 18, 
                },
            },
        },
        tooltip: {
            bodyFont: {
                size: 28, 
            },
        },
    },
};


  return (
    <div>
      <Navbar />
      <div className="statistik-container">
        <div className="pie-chart">
          <h2>Användarens framsteg</h2>
          <Pie data={pieData} options= {options} />
        </div>
      </div>
    </div>
  );
}

export default Statestik;
