// src/components/QuizPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizzes from '../quizzes'; // Import quizzes data
import './QuizPage.css'; // Add specific styles for quiz page
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap

function QuizPage() {
  const { quizIndex } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown (600 seconds)
  const [intervalId, setIntervalId] = useState(null);

  const quiz = quizzes[quizIndex];

  // Countdown timer
  useEffect(() => {
    if (quiz && timeLeft > 0) {
      const id = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (timeLeft === 0) {
      handleSubmit(); // Submit the quiz if time runs out
    }
  }, [quiz, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const question = quiz.questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
    clearInterval(intervalId); // Stop the timer
  };

  if (quizCompleted) {
    const score = answers.filter((answer, index) => answer === quiz.questions[index].answer).length;
    const timeTaken = 600 - timeLeft; // Time taken to complete the quiz

    return (
      <div className="quiz-page">
        <div className="quiz-content">
          <h1 className="quiz-completed-text">Quiz Completed</h1>
          <p className="score-text">Score: {score} / {quiz.questions.length}</p>
          <p className="time-taken-text">Time Taken: {formatTime(timeTaken)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="timer">
        <p className="timer-text">{formatTime(timeLeft)}</p>
      </div>
      <div className="quiz-content">
        <h1>{quiz.title}</h1>
        <div className="question-container">
          <p className="question-text">{question.question}</p>
          <div className="options">
            {question.options.map((option, index) => {
              const isCorrect = option === question.answer;
              const isSelected = selectedOption === option;
              let buttonClass = '';

              if (selectedOption) {
                if (isCorrect) {
                  buttonClass = 'correct';
                } else if (isSelected) {
                  buttonClass = 'incorrect';
                }
              }

              return (
                <Button
                  key={index}
                  className={`option-button ${buttonClass}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </Button>
              );
            })}
          </div>
          <div className="navigation-buttons">
            <Button
              onClick={handleNext}
              variant="danger"
              className="next-button"
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
