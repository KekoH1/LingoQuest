import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/navbar'; // Make sure this path is correct
import Footer from '../components/footer'; // Assuming you have a Footer component

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Include the Navbar at the top */}
      <Navbar />

      {/* Main content goes below the Navbar */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>LingoQuest</Text>
        <Text style={styles.subtitle}>Det nya snabba sättet att lära sig nya språk</Text>

        <View style={styles.menuButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checklist')}>
            <Text style={styles.buttonText}>Checklista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Theory')}>
            <Text style={styles.buttonText}>Teori</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Prov')}>
            <Text style={styles.buttonText}>Prov</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statestik')}>
            <Text style={styles.buttonText}>Statistik</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Component */}
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  menuButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8e9499',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;