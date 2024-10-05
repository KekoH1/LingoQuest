
import React, { useEffect, useState } from 'react';
import '../../assets/prov3.css';
import Navbar from '../../components/navbar';

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

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = option === currentQuestion.correctAnswer;

      console.log(`Fråga: ${currentQuestion.question}`);
      console.log(`Valt alternativ: ${option}`);
      console.log(`Korrekt svar: ${currentQuestion.correctAnswer}`);
      console.log(isCorrect ? "Rätt svar!" : "Fel svar!");

      if (isCorrect) {
        setCorrectAnswersCount(prevCount => prevCount + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setResults(prevResults => [
      ...prevResults,
      {
        question: currentQuestion.question,
        selectedOption,
        isCorrect,
      },
    ]);

    console.log(`Resultat hittills: ${correctAnswersCount} rätt av ${currentQuestionIndex + 1} frågor.`);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setAnswerSelected(false); 
    } else {
      setShowResults(true);
      console.log(`Quiz avslutat! Du fick ${correctAnswersCount} av ${questions.length} rätt.`);
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
      correctAnswers: correctAnswersCount 
    };

    try {
      const response = await fetch('https://localhost:7196/api/ImagesResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultData)
      });

      if (!response.ok) {
        throw new Error('Misslyckades med att spara quizresultat');
      }

      console.log('Resultat sparat framgångsrikt');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (questions.length === 0) {
    return <p>Laddar frågor...</p>;
  }

  if (showResults) {
    return (
      <div>
        <Navbar />
        <div className="quiz-container">
          <h2>Resultat</h2>
          <p>Du fick {correctAnswersCount} av {questions.length} rätt!</p>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="result-item">
                <span className="question-text">{result.question}</span>
                <span className={result.isCorrect ? 'correct' : 'incorrect'}>
                  {result.selectedOption} ({result.isCorrect ? 'Rätt' : 'Fel'})
                </span>
                {!result.isCorrect && (
                  <span className="correct-answer"> - Rätt svar: {questions[index].correctAnswer}</span>
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.reload()}>Spela igen</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion.options || [];

  return (
    <div >
      <Navbar />
      <div className="quiz-container">
        <h2>{currentQuestion.question}</h2>
        <img 
          src={`${process.env.PUBLIC_URL}/images/${currentQuestion.imagePath}`} 
          alt="Frågebild" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <div className="options-container">
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;

            let buttonClass = 'option-button';
            if (answerSelected) { 
              if (isSelected) {
                buttonClass += isCorrect ? ' correct' : ' incorrect'; 
              } else if (isCorrect) {
                buttonClass += ' correct'; 
              }
            }

            return (
              <button 
                key={index} 
                onClick={() => handleOptionSelect(option)}
                className={buttonClass}
                disabled={answerSelected} 
              >
                {option}
              </button>
            );
          })}
        </div>
        {selectedOption && <p className="selected-option">Du valde: {selectedOption}</p>}
        
        <div className="navigation-buttons">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Föregående fråga
          </button>
          <button onClick={handleGoToFirstQuestion}>
            Tillbaka till start
          </button>
          <button onClick={handleNextQuestion} disabled={selectedOption === ''}>
            Nästa fråga
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prov3;
