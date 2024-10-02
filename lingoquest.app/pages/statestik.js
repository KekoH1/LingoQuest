import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Navbar from "../components/navbar";

const Statestik = () => {
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!statistics || !Array.isArray(statistics)) {
    return <Text>No data available.</Text>;
  }

  // Define static colors for the pie chart
  const staticColors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
  ];

  // Prepare data for PieChart with static colors
  const pieData = statistics.map((result, index) => ({
    name: result.categoryName,
    population: result.totalScore,
    color: staticColors[index % staticColors.length], // Cycle through static colors
    legendFontColor: "#000000", // Change legend font color to black
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.chartContainer}>
        <Text style={styles.heading}>Användarens framsteg</Text>
        <PieChart
          data={pieData}
          width={300} // You can change this as needed
          height={220} // You can change this as needed
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[0, 0]}
          absolute // Makes the pie chart absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Statestik;
