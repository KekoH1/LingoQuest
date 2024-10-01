
import React, { useEffect, useState } from 'react';
import '../../assets/prov2.css'; 
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

        const isCorrect = option === quizData[currentQuestionIndex].correctAnswer;
        const answerData = {
            question: quizData[currentQuestionIndex].question,
            selected: option,
            correct: quizData[currentQuestionIndex].correctAnswer,
            isCorrect,
        };

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

    if (loading) return <div className="loading">Laddar...</div>;
    if (error) return <div className="error">{error}</div>;

    const currentQuestion = currentQuestionIndex >= 0 ? quizData[currentQuestionIndex] : null;

    if (showResult) {
        return (
            <div>
                <Navbar/>
            <div className="quiz-container">
                <h1>Quiz Resultat</h1>
                <p>Du har {correctAnswersCount} av {quizData.length} rätt!</p>
                <ul>
                    {userAnswers.map((answer, index) => {
                        const isCorrect = answer.isCorrect;
                        return (
                            <li key={index}>
                                {answer.question} - 
                                <span 
                                    style={{ 
                                        color: isCorrect ? 'green' : 'red', 
                                        fontWeight: isCorrect ? 'bold' : 'normal' 
                                    }}
                                >
                                    Ditt Svar: {answer.selected}
                                </span> - 
                                <span style={{ color: 'green', fontWeight: 'bold' }}>
                                    Rätt Svar: {answer.correct}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <br />
                <br />
                <button className="ResetQuizButton" onClick={() => window.location.reload()}>Starta om Quizet</button>
            </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar/>
        <div className="quiz-container">
            <h1>Grammatik Quiz</h1>
            <div className="question-container">
                <h3 className="question">{currentQuestion.question}</h3>
                <ul className="options">
                    {currentQuestion.options.map((option, index) => {
                        let optionClass = "option";
                        if (isOptionSelected) {
                            if (option === currentQuestion.correctAnswer) {
                                optionClass += ' correct';
                            } else if (option === selectedOption) {
                                optionClass += ' incorrect';
                            }
                        }
                        return (
                            <li key={index} className={optionClass} onClick={() => handleOptionSelect(option)} style={{ cursor: isOptionSelected ? 'not-allowed' : 'pointer' }}>
                                {option}
                            </li>
                        );
                    })}
                </ul>
                <div className="navigation">
                    <button onClick={() => setCurrentQuestionIndex(0)} disabled={currentQuestionIndex === 0}>
                        Tillbaka till Första Frågan
                    </button>
                    <button onClick={nextQuestion} disabled={!isOptionSelected}>
                        {currentQuestionIndex === quizData.length - 1 ? 'Visa Resultat' : 'Nästa'}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Prov2;
