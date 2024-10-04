import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Navbar from '../../components/navbar';

const Kap4_native = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Sammanfattning</Text>
        <Text style={styles.paragraph}>Här är en sammanfattning om det du har lärt dig</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Theory')}>
          <Text style={styles.link}>Tillbaka till Teori sidan</Text>
        </TouchableOpacity>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar quis eros at aliquet. Integer scelerisque placerat nunc, non facilisis metus imperdiet nec...
        </Text>
        <Text style={styles.paragraph}>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ut rutrum erat...
        </Text>
        <Text style={styles.paragraph}>
          Aenean congue mattis sem, id faucibus nunc lobortis vitae. Sed egestas pretium felis, nec venenatis risus dictum cursus...
        </Text>
        <Text style={styles.paragraph}>
          Duis in metus eu mauris iaculis hendrerit et non turpis. Suspendisse sed fermentum risus. Aliquam vitae massa porta, maximus urna ac, efficitur erat...
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Testa din kunskap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Kap4_native;