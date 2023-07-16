import React from "react";

const Result = ({ score, totalTimeTaken, handleRestart }) => {
  return (
    <div className="result-page">
      <h2>Quiz Completed</h2>
      <p>Your Score: {score}</p>
      {/* <p>Total Time Taken: {totalTimeTaken} seconds</p> */}
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
};

export default Result;
