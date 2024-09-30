import React, { useEffect, useState } from 'react';
import '../../assets/prov1.css';
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (showResult) {
        return (
            <div className="quiz-container">
                <h1>Quiz Results</h1>
                <p>You got {correctAnswersCount} out of {quizzes.length} correct!</p>
                <ul>
                    {quizzes.map((quiz, index) => {
                        const correctAnswer = quiz.correctAnswer;
                        const userAnswer = userSelections[index];
                        const isCorrect = userAnswer === correctAnswer;

                        return (
                            <li key={index}>
                                {quiz.englishText.replace('___', '______')} - 
                                <span 
                                    style={{ 
                                        color: isCorrect ? 'green' : 'red', 
                                        fontWeight: isCorrect ? 'bold' : 'normal' 
                                    }}
                                >
                                    Your Answer: {userAnswer}
                                </span> - 
                                <span style={{ color: 'green', fontWeight: 'bold' }}>
                                    Correct Answer: {correctAnswer}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <br />
                <br />
                <button className="ResetQuizButton" onClick={() => window.location.reload()}>Restart Quiz</button>
            </div>
        );
    }

    const currentQuiz = quizzes[currentQuizIndex];

    return (
        <div>
            <Navbar />
            <div className="quiz-container">
                <h1>Quiz Application</h1>
                <div className="quiz-item">
                    <h2>English Text</h2>
                    <p>{currentQuiz.englishText.replace('___', '______')}</p>
                    <h2>Swedish Text</h2>
                    <p>{currentQuiz.swedishText}</p>
                    <h3>Choose the correct missing word:</h3>
                    <div className="button-container">
                        {shuffledWords.map((word, index) => {
                            const isWordCorrect = word === currentQuiz.correctAnswer;
                            const isSelected = selectedWord === word;

                            const buttonClass = isSelected ? 'word-button selected' : 'word-button';

                            return (
                                <button
                                    key={index}
                                    className={buttonClass}
                                    style={{ backgroundColor: isSelected && isWordCorrect ? 'green' : isSelected ? 'red' : '' }}
                                    onClick={() => handleWordClick(word)}
                                >
                                    {word}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <button className="nextButton"
                    onClick={handleNextQuiz}
                    disabled={selectedWord === null}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Prov1;
