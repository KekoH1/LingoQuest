import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import Navbar from "../components/navbar";

const windowWidth = Dimensions.get("window").width;

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
    return <Text style={styles.noDataText}>Ingen data tillgänglig.</Text>;
  }

  const staticColors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
  ];

  const pieData = statistics.map((result, index) => ({
    name: result.categoryName,
    population: result.totalScore,
    color: staticColors[index % staticColors.length],
    legendFontColor: "#000000",
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      {}
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      {}
      <View
        style={
          windowWidth < 768 ? styles.chartContainerSmall : styles.chartContainer
        }
      >
        <Text style={styles.heading}>Användarens framsteg</Text>
        <PieChart
          data={pieData}
          width={windowWidth < 768 ? windowWidth - 40 : 600}
          height={280}
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
          absolute
        />
      </View>
    </View>
  );
};
// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navbarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  chartContainer: {
    width: "40%",
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainerSmall: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },

  
  '@media (max-width: 768px)': {
    container: {
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      fontSize: 20,
    },
    chartContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },

});

export default Statestik;
