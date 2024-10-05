import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Navbar from '../../components/navbar';

import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import image5 from '../../assets/images/image5.jpg';
import image6 from '../../assets/images/image6.jpg';
import image7 from '../../assets/images/image7.jpg';
import image8 from '../../assets/images/image8.jpg';
import image9 from '../../assets/images/image9.jpg';
import image10 from '../../assets/images/image10.jpg';

const imageMap = {
  'image1.jpg': image1,
  'image2.jpg': image2,
  'image3.jpg': image3,
  'image4.jpg': image4,
  'image5.jpg': image5,
  'image6.jpg': image6,
  'image7.jpg': image7,
  'image8.jpg': image8,
  'image9.jpg': image9,
  'image10.jpg': image10,
};

const Prov3 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://localhost:7196/api/Image');
        if (!response.ok) {
          throw new Error('Nätverksresponsen var inte okej');
        }
        const data = await response.json();
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.error("Det gick inte att hämta frågorna", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    if (!answerSelected) {
      setSelectedOption(option);
      setAnswerSelected(true);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    console.log(`Fråga: ${currentQuestion.question}`);
    console.log(`Användarens val: ${selectedOption}`);
    console.log(`Korrekt svar: ${currentQuestion.correctAnswer}`);
    console.log(`Var svaret korrekt? ${isCorrect ? 'Ja' : 'Nej'}`);

    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }

    setResults(prevResults => [
      ...prevResults,
      {
        question: currentQuestion.question,
        selectedOption,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setAnswerSelected(false);
    } else {
      setShowResults(true);
      saveResultsToDatabase();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption('');
      setAnswerSelected(false);
    }
  };

  const handleGoToFirstQuestion = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setAnswerSelected(false);
  };

  const saveResultsToDatabase = async () => {
    const resultData = {
      totalQuestions: questions.length,
      correctAnswers: correctAnswersCount,
    };

    try {
      const response = await fetch('https://localhost:7196/api/ImagesResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        throw new Error('Misslyckades med att spara quizresultat');
      }

      console.log('Resultat sparat framgångsrikt');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (showResults) {
      console.log(`Totala frågor: ${questions.length}`);
      console.log(`Korrekt antal svar: ${correctAnswersCount}`);
  
    }
  }, [showResults, questions, correctAnswersCount, results]);

  if (questions.length === 0) {
    return <Text style={styles.loadingText}>Laddar frågor...</Text>;
  }

  if (showResults) {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={styles.quizContainer}>
          <Text style={styles.resultHeader}>Resultat</Text>
          <Text style={styles.scoreText}>Du fick {correctAnswersCount} av {questions.length} rätt!</Text>
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.resultItem}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={[styles.resultText, item.isCorrect ? styles.correct : styles.incorrect]}>
                  {item.selectedOption} ({item.isCorrect ? 'Rätt' : 'Fel'})
                </Text>
                {!item.isCorrect && (
                  <Text style={styles.correctAnswer}> - Rätt svar: {questions[index].correctAnswer}</Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
            <Text style={styles.retryButtonText}>Spela igen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion.options || [];

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View style={styles.quizContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        

        <Image 
          source={imageMap[currentQuestion.imagePath]} 
          style={styles.image} 
          accessibilityLabel="Frågebild" 
        />
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            let buttonStyle = styles.optionButton;

            if (answerSelected) { 
              if (isSelected) {
                buttonStyle = isCorrect ? styles.correctButton : styles.incorrectButton; 
              } else if (isCorrect) {
                buttonStyle = styles.correctButton; 
              }
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.optionButton, buttonStyle]} 
                onPress={() => handleOptionSelect(option)}
                disabled={answerSelected}
              >
                <Text style={styles.optionButtonText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedOption && <Text style={styles.selectedOption}>Du valde: {selectedOption}</Text>}
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={handlePreviousQuestion} 
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Föregående fråga</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleGoToFirstQuestion}>
            <Text style={styles.navButtonText}>Tillbaka till start</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: selectedOption === '' ? '#ccc' : '#007BFF' }]} 
            onPress={handleNextQuestion} 
            disabled={selectedOption === ''}
          >
            <Text style={styles.navButtonText}>Nästa fråga</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
      },
      quizContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#a2cdd3e9',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      image: {
     borderRadius: 10,
        marginVertical: 20,
        width: '75%',
        height: 400, 
        resizeMode: 'cover', 
      },
      optionsContainer: {
        width: '100%',
        marginBottom: 20,
      },
      optionButton: {
        backgroundColor: '#4a6072',
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 15,
        width: '100%',  
        alignItems: 'center',
      },
      optionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      correctButton: {
        backgroundColor: '#28a745',
      },
      incorrectButton: {
        backgroundColor: '#dc3545',
      },
      selectedOption: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'center',
      },
      resultHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      scoreText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
      },
      questionText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
      },
      resultItem: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
      },
      resultText: {
        fontSize: 16,
        marginVertical: 5,
      },
      correct: {
        color: '#28a745',
      },
      incorrect: {
        color: '#dc3545',
      },
      correctAnswer: {
        fontWeight: 'bold',
        color: '#007BFF',
      },
      loadingText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 50,
        color: '#666',
      },
      navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },
      navButton: {
        flex: 1,
        margin: 5,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
      },
      navButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      retryButton: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
      },
      retryButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default Prov3;
