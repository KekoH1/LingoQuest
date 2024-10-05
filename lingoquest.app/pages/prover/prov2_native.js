

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../../components/navbar';

const Prov2 = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('https://localhost:7196/api/GrammarQuiz');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setQuizData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

    const handleOptionSelect = (option) => {
        if (isOptionSelected) return;
        setSelectedOption(option);
        setIsOptionSelected(true);

        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = option === currentQuestion.correctAnswer;
        const answerData = {
            question: currentQuestion.question,
            selected: option,
            correct: currentQuestion.correctAnswer,
            isCorrect,
        };

      
        console.log(`Question: ${currentQuestion.question}`);
        console.log(`Your Answer: ${option}`);
        console.log(`Correct Answer: ${currentQuestion.correctAnswer}`);
        console.log(`Is Correct: ${isCorrect ? 'Yes' : 'No'}`);

        setUserAnswers([...userAnswers, answerData]);

        if (isCorrect) {
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsOptionSelected(false);
        } else {
            setShowResult(true);
            saveResultToDatabase();
        }
    };

    const saveResultToDatabase = async () => {
        const resultData = {
            totalQuestions: quizData.length,
            correctAnswers: correctAnswersCount
        };

        try {
            const response = await fetch('https://localhost:7196/api/GrammaticResult', {
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
            console.log(`Total Questions: ${quizData.length}`);
            console.log(`Correct Answers: ${correctAnswersCount}`);
           
        }
    }, [showResult, quizData, correctAnswersCount, userAnswers]);

    if (loading) return <Text style={styles.loading}>Laddar...</Text>;
    if (error) return <Text style={styles.error}>{error}</Text>;

    const currentQuestion = currentQuestionIndex >= 0 ? quizData[currentQuestionIndex] : null;

    if (showResult) {
        return (
            <View style={styles.container}>
                <Navbar />
                <ScrollView style={styles.resultContainer}>
                    <View style={styles.quizContainer}>
                        <Text style={styles.title}>Quiz Resultat</Text>
                        <Text style={styles.resultText}>Du har {correctAnswersCount} av {quizData.length} rätt!</Text>
                        <FlatList
                            data={userAnswers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                const isCorrect = item.isCorrect;
                                return (
                                    <Text key={index} style={styles.answerText}>
                                        {item.question} - 
                                        <Text style={[styles.answer, isCorrect ? styles.correct : styles.incorrect]}>
                                            Ditt Svar: {item.selected}
                                        </Text> - 
                                        <Text style={styles.correctAnswer}>
                                            Rätt Svar: {item.correct}
                                        </Text>
                                    </Text>
                                );
                            }}
                        />
                        <TouchableOpacity style={styles.resetButton} onPress={() => window.location.reload()}>
                            <Text style={styles.resetButtonText}>Starta om Quizet</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.quizContainer}>
                    <Text style={styles.title}>Grammatik Quiz</Text>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>{currentQuestion.question}</Text>
                        <FlatList
                            data={currentQuestion.options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                let optionStyle = [styles.option];
                                if (isOptionSelected) {
                                    if (item === currentQuestion.correctAnswer) {
                                        optionStyle.push(styles.correct);
                                    } else if (item === selectedOption) {
                                        optionStyle.push(styles.incorrect);
                                    }
                                }
                                return (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={optionStyle} 
                                        onPress={() => handleOptionSelect(item)} 
                                        disabled={isOptionSelected}
                                    >
                                        <Text style={styles.optionText}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <View style={styles.navigation}>
                            <TouchableOpacity onPress={() => setCurrentQuestionIndex(0)} disabled={currentQuestionIndex === 0}>
                                <Text style={styles.navigationText}>Tillbaka till Första Frågan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={nextQuestion} disabled={!isOptionSelected}>
                                <Text style={styles.navigationText}>
                                    {currentQuestionIndex === quizData.length - 1 ? 'Visa Resultat' : 'Nästa'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7da1aee9',
    },
    scrollContainer: {
        padding: 20,
    },
    resultContainer: {
        flex: 1,
    },
    quizContainer: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: '#333',
        marginBottom: 10,
    },
    questionContainer: {
        marginVertical: 20,
    },
    question: {
        fontSize: 18,
        color: '#555',
        marginBottom: 15,
    },
    option: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#e4f7f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    correct: {
        backgroundColor: 'green',
        color: 'white',
    },
    incorrect: {
        backgroundColor: 'red',
        color: 'white',
    },
    answerText: {
        fontSize: 16,
        marginBottom: 5,
    },
    answer: {
        fontWeight: 'bold',
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    navigationText: {
        color: '#007BFF',
        fontSize: 16,
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ff0000',
    },
    error: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ff0000',
    },
    resetButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#264e30',
        borderRadius: 15,
        alignItems: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Prov2;
