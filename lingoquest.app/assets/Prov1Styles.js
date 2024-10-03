import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#7da1aee9', // Ljus bakgrund för bättre kontrast
  },
  quizCard: {
    maxWidth: 500,
    width: '100%', // Gör kortet responsivt
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#7da1aee9',
    elevation: 5, // Lägg till skugga för djup
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  instruction: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
  },
  wordButton: {
    margin: 5,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#007BFF', // Primär färg
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    width: '45%', // Responsiv bredd
    elevation: 3,
  },
  wordButtonSelected: {
    backgroundColor: '#dc3545', // Färgen för vald knapp
  },
  loading: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ff0000',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginVertical: 10,
  },
  correct: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrect: {
    color: 'red',
  },
  resetQuizButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#28a745',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    elevation: 3,
  },
  thankYouMessage: {
    marginTop: 20,
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;