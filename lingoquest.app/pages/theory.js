import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Navbar from '../components/navbar'; // Assuming you have a Navbar component adapted for React Native

const Theory = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Navbar /> {/* Assuming Navbar is converted to a React Native component */}
      <View style={styles.main}>
        <Text style={styles.heading}>Teori</Text>
        <Text style={styles.paragraph}>Det finns många olika sätt att lära sig nya språk</Text>
        <Text style={styles.paragraph}>Här hittar du olika kapitel som ger dig djupare förståelse för ditt nya språk</Text>
        <Text style={styles.paragraph}>Välj ett av kapitlen och börja läs på</Text>
        <Text style={styles.paragraph}>Lycka till!</Text>
        
        <View style={styles.menuButtons}>
          <TouchableOpacity onPress={() => handleLinkPress('kap1')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 1. Historia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('kap2')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 2. Moderna Språket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('kap3')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 3. Verb</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('kap4')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 4. Sammanfattning</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  menuButtons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Theory;