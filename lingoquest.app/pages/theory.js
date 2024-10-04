import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';
import { useNavigation } from '@react-navigation/native';



const Theory = () => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.main}>
        <Text style={styles.heading}>Teori</Text>
        <Text style={styles.paragraph}>Det finns många olika sätt att lära sig nya språk</Text>
        <Text style={styles.paragraph}>Här hittar du olika kapitel som ger dig djupare förståelse för ditt nya språk</Text>
        <Text style={styles.paragraph}>Välj ett av kapitlen och börja läs på</Text>
        <Text style={styles.paragraph}>Lycka till!</Text>
        
        <View style={styles.menuButtons}>
          <TouchableOpacity onPress={() => navigateTo('Kap1_native')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 1. Historia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Kap2_native')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 2. Moderna Språket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Kap3_native')} style={styles.button}>
            <Text style={styles.buttonText}>Kapitel 3. Verb</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Kap4_native')} style={styles.button}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '90%',
    maxWidth: 600,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  menuButtons: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
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

export default Theory;