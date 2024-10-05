import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>&copy; 2024 LingoQuest. All rights reserved.</Text>
      <View style={styles.socialMedia}>
        <TouchableOpacity onPress={() => handleLinkPress('https://www.facebook.com')}>
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('https://www.x.com')}>
          <Text style={styles.link}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('https://www.instagram.com')}>
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff', // Change background color as needed
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    height: 0,
  },
  text: {
    fontSize: 14,
    color: '#333', // Change text color as needed
    marginBottom: 10,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Adjust based on your layout
  },
  link: {
    fontSize: 16,
    color: '#007BFF', // Change link color as needed
    textDecorationLine: 'underline', // To make it look like a link
  },
});

export default Footer;