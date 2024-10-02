import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation(); // Use the navigation hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (route) => {
    navigation.navigate(route);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
        <Text style={styles.hamburgerText}>&#9776;</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => handleNavigation('Home')} style={styles.navItem}>
            <Text style={styles.navText}>Hem</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Checklist')} style={styles.navItem}>
            <Text style={styles.navText}>Checklista</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Theory')} style={styles.navItem}>
            <Text style={styles.navText}>Teori</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Prov')} style={styles.navItem}>
            <Text style={styles.navText}>Prov</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Statestik')} style={styles.navItem}>
            <Text style={styles.navText}>Statistik</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Review')} style={styles.reviewButton}>
            <Text style={styles.navText}>⭐Recensioner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // Adjust as needed
    padding: 10,
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
  },
  navLinks: {
    backgroundColor: '#f0f0f0', // Background for the dropdown
    borderRadius: 5,
    padding: 10,
    position: 'absolute', // To position the dropdown
    top: 50, // Adjust based on your design
    right: 0,
    width: 150, // Set width as needed
  },
  navItem: {
    paddingVertical: 10,
  },
  navText: {
    fontSize: 18,
  },
  reviewButton: {
    paddingVertical: 10,
    backgroundColor: '#007BFF', // Style for review button
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Navbar;