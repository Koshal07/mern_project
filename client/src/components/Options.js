

import React from "react";

const Options = ({ options, selectedOption, handleAnswer }) => {
  return (
    <div className="options">
      {options.map((option) => (
        <div key={option} className="option">
          <input
            type="checkbox"
            id={option}
            className="option-checkbox"
            checked={selectedOption === option}
            onChange={() => handleAnswer(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Options;
