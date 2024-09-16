// src/components/Homepage.js
import React from 'react';
import './HomePage.css'; // Existing styles
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import quizzes from '../quizzes'; // Import quizzes

function Homepage() {
  const navigate = useNavigate();

  const startQuiz = (quizIndex) => {
    navigate(`/quiz/${quizIndex}`);
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to QuizQuest</h1>
      <div className="home-content">
        <div className="quiz-list">
          {quizzes.map((quiz, index) => (
            <Card key={index} className="quiz-card">
              <Card.Body>
                <Card.Title className="card-title">{quiz.title}</Card.Title>
                <Card.Text className="card-text">
                  Time Limit: {quiz.timeLimit}<br />
                  Number of Questions: {quiz.questions.length}
                </Card.Text>
                <Button
                  onClick={() => startQuiz(index)}
                  variant="danger" // Use Bootstrap's 'danger' variant for red
                  className="start-button"
                >
                  Start Quiz
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
