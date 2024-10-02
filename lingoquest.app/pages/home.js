import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Navbar component can be added if you implement it in React Native */}
      
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

      {/* Footer component can be added if you implement it in React Native */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  },
  button: {
    backgroundColor: '#4CAF50',
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