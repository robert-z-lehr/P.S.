import React, { useState } from 'react';

const InteractiveButtons = ({ setQuestion }) => {
  const generateQuestion = () => {
    // Replace this with actual question generation logic
    const question = "What is the mean of the following data set: [1, 2, 3, 4, 5]?";
    setQuestion(question);
  };

  return (
    <div>
      <button onClick={generateQuestion} style={{ fontSize: '16px', padding: '10px 20px' }}>Generate Random Question</button>
    </div>
  );
};

export default InteractiveButtons;
