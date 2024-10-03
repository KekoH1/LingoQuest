import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import Navbar from '../../components/navbar';

const Prov1 = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [userSelections, setUserSelections] = useState({});
    const [shuffledWords, setShuffledWords] = useState([]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7196/api/QuizzesControllers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizzes(data);
                console.log(data);
                setShuffledWords(shuffleArray(data[0].missingWords));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (quizzes.length > 0) {
            setShuffledWords(shuffleArray(quizzes[currentQuizIndex].missingWords));
        }
    }, [currentQuizIndex, quizzes]);

    const handleWordClick = (word) => {
        if (selectedWord === null) {
            setSelectedWord(word);
        }
    };

    const handleNextQuiz = () => {
        const currentQuiz = quizzes[currentQuizIndex];
        const correctAnswer = currentQuiz.correctAnswer;
        const isCorrect = selectedWord === correctAnswer;

        console.log(`Question: ${currentQuiz.englishText}`);
        console.log(`Your Answer: ${selectedWord}`);
        console.log(`Correct Answer: ${correctAnswer}`);
        console.log(`Is Correct: ${isCorrect ? 'Yes' : 'No'}`);

        setUserSelections(prev => ({ ...prev, [currentQuizIndex]: selectedWord }));

        if (isCorrect) {
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }

        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(prevIndex => prevIndex + 1);
            setSelectedWord(null);
        } else {
            setShowResult(true);
            saveResultToDatabase();
        }
    };

    const saveResultToDatabase = async () => {
        const resultData = {
            totalQuestions: quizzes.length,
            correctAnswers: correctAnswersCount
        };

        try {
            const response = await fetch('https://localhost:7196/api/QuizResults', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });

            if (!response.ok) {
                throw new Error('Failed to save quiz result');
            }

            console.log('Result saved successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (showResult) {
            console.log(`Total Questions: ${quizzes.length}`);
            console.log(`Correct Answers: ${correctAnswersCount}`);
            quizzes.forEach((quiz, index) => {
                const correctAnswer = quiz.correctAnswer;
                const userAnswer = userSelections[index];
                console.log(`Question: ${quiz.englishText}`);
                console.log(`Your Answer: ${userAnswer}`);
                console.log(`Correct Answer: ${correctAnswer}`);
                console.log(`Is Correct: ${userAnswer === correctAnswer ? 'Yes' : 'No'}`);
            });
        }
    }, [showResult]);

    if (loading) {
        return (
            <View style={styles.quizContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.quizContainer}>
                <Text style={styles.loading}>Error: {error}</Text>
            </View>
        );
    }

    if (showResult) {
        return (
            <View style={styles.resultContainer}>
                <Navbar />
                <ScrollView style={styles.resultScrollView}>
                    <View style={styles.quizContainer}>
                        <Text style={styles.header}>Quiz Results</Text>
                        <Text style={styles.resultText}>You got {correctAnswersCount} out of {quizzes.length} correct!</Text>
                        {quizzes.map((quiz, index) => {
                            const correctAnswer = quiz.correctAnswer;
                            const userAnswer = userSelections[index];
                            const isCorrect = userAnswer === correctAnswer;

                            return (
                                <Text key={index} style={styles.instruction}>
                                    {quiz.englishText.replace('___', '______')} -
                                    <Text style={isCorrect ? styles.correct : styles.incorrect}>
                                        {' '}Your Answer: {userAnswer}
                                    </Text> -
                                    <Text style={styles.correct}>
                                        {' '}Correct Answer: {correctAnswer}
                                    </Text>
                                </Text>
                            );
                        })}
                        <TouchableOpacity style={styles.resetQuizButton} onPress={() => window.location.reload()}>
                            <Text style={{ color: 'white' }}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    const currentQuiz = quizzes[currentQuizIndex];
    const correctAnswer = currentQuiz.correctAnswer;

    return (
        <View style={styles.sidancontainer}>
            <Navbar />
            <View style={styles.quizContainer}>
                <ScrollView style={styles.quizCard}>
                    <Text style={styles.header}>Quiz Application</Text>
                    <Text style={styles.subHeader}>English Text</Text>
                    <Text>{currentQuiz.englishText.replace('___', '______')}</Text>
                    <Text style={styles.subHeader}>Swedish Text</Text>
                    <Text>{currentQuiz.swedishText}</Text>
                    <Text style={styles.instruction}>Choose the correct missing word:</Text>
                    <View style={styles.buttonContainer}>
                        {shuffledWords.map((word, index) => {
                            const buttonStyle = selectedWord
                                ? word === correctAnswer
                                    ? styles.correctButton  
                                    : word === selectedWord
                                        ? styles.incorrectButton  
                                        : styles.wordButton
                                : styles.wordButton;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={buttonStyle}
                                    onPress={() => handleWordClick(word)}
                                    disabled={selectedWord !== null}
                                >
                                    <Text style={{ color: 'white' }}>{word}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity style={styles.resetQuizButton} onPress={handleNextQuiz} disabled={selectedWord === null}>
                        <Text style={{ color: 'white' }}>Next</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sidancontainer: {
        flex: 1,
        backgroundColor: '#7da1aee9',
    },
    quizContainer: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 'auto',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#7da1aee9',
        shadowColor: 'rgba(0, 33, 201, 0.3)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 5,
    },
    resultContainer: {
        flex: 1,
    },
    resultScrollView: {
        flexGrow: 1,
        marginHorizontal: 10,
        paddingVertical: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 28,
        color: '#333333',
        fontWeight: 'bold',
        marginBottom: 25,
    },
    quizCard: {
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 8,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#eaf7f5',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    subHeader: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 18,
        color: '#333',
    },
    instruction: {
        marginVertical: 8,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    wordButton: {
        backgroundColor: '#007bff',
        margin: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        textAlign: 'center',
    },
    correctButton: {
        backgroundColor: '#28a745',
        margin: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 'bold',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    incorrectButton: {
        backgroundColor: '#dc3545',
        margin: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 'bold',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ff3333',
    },
    correct: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    incorrect: {
        color: '#dc3545',
        fontWeight: 'bold',
    },
    resetQuizButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Prov1;
