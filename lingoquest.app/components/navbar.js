import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation(); // Use the navigation hook
  const windowWidth = Dimensions.get('window').width;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (route) => {
    navigation.navigate(route);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <View style={[styles.container, isOpen ? styles.navbarOpen : styles.navbarClosed]}>
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
  // Initial navbar style
  container: {
    position: 'absolute',
    left: 1,
    top: 1,
    backgroundColor: '#acacac',
    zIndex: 10,
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
    transition: 'width 0.3s ease, height 0.3s ease', 
  },
  
  navbarClosed: {
    width: 60,
    height: 50,
  },
  navbarOpen: {
    width: 250,
    height: Dimensions.get('window').height,
    borderRadius: 0,
  },
  hamburger: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  hamburgerText: {
    color: '#fff',
    fontSize: 24,
  },
  navLinks: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 10, 
  },
  navItem: {
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#8e9499',
  },
  navText: {
    fontSize: 18,
    color: '#343434',
  },
  reviewButton: {
    marginTop: 'auto', 
    marginBottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#bfbfbf',
    borderRadius: 5,
    alignItems: 'center',
  },
  reviewButtonHover: {
    backgroundColor: '#dcdcdc',
    transform: [{ scale: 1.05 }], 
  },
  navbarClosed: {
    width: 40,
    height: 45,
    left: 0,
    top: -10,
  },

});

export default Navbar;
