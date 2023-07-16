import React, { useState, useEffect } from "react";
import questionsData from "./components/questionsData";
import Question from "./components/Question";
import Options from "./components/Options";
import Result from "./components/Result";


import "./styles.css";

const MockExam = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [
    currentQuestionPaletteIndex,
    setCurrentQuestionPaletteIndex
  ] = useState(-1);

  const handleQuestionPaletteSelect = (index) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestionPaletteIndex(index);
    setShowResult(false); // Reset showResult to false to navigate to the selected question
  };

  useEffect(() => {
    if (
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < questionsData[currentSectionIndex].questions.length
    ) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setShowResult(true);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, currentSectionIndex]);

  const handleStartExam = () => {
    setCurrentSectionIndex(0);
  };

  const handleStartSection = () => {
    setCurrentQuestionIndex(0);
    setAnswers(
      Array(questionsData[currentSectionIndex].questions.length).fill("")
    );
    setTimeRemaining(600);
  };

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleFinishSection = () => {
    if (currentSectionIndex === questionsData.length - 1) {
      setShowResult(true);
    } else {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(-1);
      setAnswers([]);
    }
  };

  const handleRestart = () => {
    setCurrentSectionIndex(-1);
    setCurrentQuestionIndex(-1);
    setAnswers([]);
    setShowResult(false);
    setTimeRemaining(600);
  };

  const calculateScore = () => {
    let score = 0;
    questionsData.forEach((section, sectionIndex) => {
      answers.forEach((answer, answerIndex) => {
        if (
          answerIndex !== section.questions.length &&
          sectionIndex === answerIndex &&
          answer === section.questions[answerIndex].correctAnswer
        ) {
          score++;
        }
      });
    });
    return score;
  };

  const s = calculateScore();

  return (
    <div className="mock-exam">
      {showResult ? (
        <>
          <Result
            score={s}
            totalQuestions={questionsData.reduce(
              (total, section) => total + section.questions.length,
              0
            )}
            answers={answers}
            questions={questionsData}
            handleRestart={handleRestart}
          />
        </>
      ) : (
        <>
          {currentQuestionIndex === -1 ? (
            <>
              {currentSectionIndex === -1 ? (
                <div className="start-page">
                  <h2>Welcome to the Mock Exam</h2>
                  <p>This exam consists of multiple sections.</p>
                  <p>Each section has a time limit of 10 minutes.</p>
                  <p>Please click the button below to start the exam.</p>
                  <button className="start-button" onClick={handleStartExam}>
                    Start Exam
                  </button>
                </div>
              ) : (
                <div className="start-page">
                  <h2>Section {currentSectionIndex + 1}</h2>
                  <p>Time allotted for this section: 10 minutes</p>
                  <p>
                    Please click the button below to start Section{" "}
                    {currentSectionIndex + 1}.
                  </p>
                  <button className="start-button" onClick={handleStartSection}>
                    Start Section {currentSectionIndex + 1}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="question-page">
              <h2>Question {currentQuestionIndex + 1}</h2>
              <Question
                questionText={
                  questionsData[currentSectionIndex].questions[
                    currentQuestionIndex
                  ].questionText
                }
              />
              <Options
                options={
                  questionsData[currentSectionIndex].questions[
                    currentQuestionIndex
                  ].options
                }
                selectedOption={answers[currentQuestionIndex]}
                handleAnswer={handleAnswer}
              />
              <div className="timer">
                Time Remaining: {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
              <div className="button-container">
                <button
                  className="previous-button"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Previous
                </button>
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex ===
                    questionsData[currentSectionIndex].questions.length - 1
                  }
                >
                  Next →
                </button>
                {currentQuestionIndex >= 0 && (
                  // questionsData[currentSectionIndex].questions.length - 1
                  <button
                    className="submit-button"
                    onClick={handleFinishSection}
                  >
                    {currentSectionIndex === questionsData.length - 1
                      ? "Submit"
                      : "Finish Section"}
                  </button>
                )}
              </div>
              <div className="question-palette">
                {questionsData[currentSectionIndex].questions.map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`palette-button ${
                        currentQuestionPaletteIndex === index ? "selected" : ""
                      }`}
                      onClick={() => handleQuestionPaletteSelect(index)} // Updated line
                    >
                      <span className="button-label">Q</span>
                      <span className="button-value">{index + 1}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MockExam;
