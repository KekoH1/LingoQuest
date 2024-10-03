import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';

const Prov = ({ navigation }) => {
  const navigateToProv = (provLevel) => {
    navigation.navigate(provLevel);
  };

  return (
    <View style={styles.container}>
      <Navbar /> {}
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
// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', 
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Prov;