import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/navbar'; // Ensure this is adapted for React Native

const Prov = ({ navigation }) => {
  const navigateToProv = (provLevel) => {
    navigation.navigate(provLevel); // Using React Navigation for screen navigation
  };

  return (
    <View style={styles.container}>
      <Navbar /> {/* Make sure Navbar is a React Native compatible component */}
      <View style={styles.nav}>
        <Text style={styles.heading}>Välj Prov Nivå:</Text>
        <View style={styles.provButtons}>
          <TouchableOpacity onPress={() => navigateToProv('Prov1')} style={styles.button}>
            <Text style={styles.buttonText}>Enkel Prov</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToProv('Prov2')} style={styles.button}>
            <Text style={styles.buttonText}>Mellan Prov</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToProv('Prov3')} style={styles.button}>
            <Text style={styles.buttonText}>Svår Prov</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
    padding: 20,
  },
  nav: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  provButtons: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF', // Button color
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', // Full width button
  },
  buttonText: {
    color: '#fff', // Text color
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Prov;