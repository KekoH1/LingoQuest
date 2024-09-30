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
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7196/api/QuizzesControllers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleWordClick = (word) => {
        if (selectedWord === null) {  
            setSelectedWord(word);
        }
    };

    const handleNextQuiz = () => {
        const currentQuiz = quizzes[currentQuizIndex];
        const correctAnswer = currentQuiz.missingWords[0]; 
        console.log('Current Quiz:', currentQuiz); 
    
        const isCorrect = selectedWord === currentQuiz.missingWords[0];

        setUserSelections(prev => ({ ...prev, [currentQuizIndex]: selectedWord }));

        if (isCorrect) {
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }

        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(prevIndex => prevIndex + 1);
            setSelectedWord(null);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="quiz-container">
                <h1>Quiz Results</h1>
                <p>You got {correctAnswersCount} out of {quizzes.length} correct!</p>
                <ul>
                    {quizzes.map((quiz, index) => {
                        const correctAnswer = quiz.missingWords[0];
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
                 
                        {currentQuiz.missingWords.map((word, index) => {
                        const isWordCorrect = word === currentQuiz.missingWords[0];
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
                            </button >
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
