import React, { useState } from 'react';
import axios from 'axios';
import '../OpenAIIntegration.css';

const OpenAIIntegration = ({ question }) => {
  const [steps, setSteps] = useState([""]);
  const [completedAnswerSteps, setCompletedAnswerSteps] = useState([]);
  const [done, setDone] = useState(false);

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const generateNextStep = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Solve the following problem step by step: ${question}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        }
      });

      setCompletedAnswerSteps([...completedAnswerSteps, response.data.choices[0].text.trim()]);
    } catch (error) {
      console.error('Error generating step:', error);
    }
  };

  const handleDone = () => {
    setDone(true);
  };

  const handleStartOver = () => {
    setSteps([""]);
    setCompletedAnswerSteps([]);
    setDone(false);
  };

  return (
    <div>
      <h3>{question}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <h4>Step-by-Step Answer</h4>
          {steps.map((step, index) => (
            <textarea
              key={index}
              value={step}
              placeholder={index === 0 ? "Write the first step" : "Write the next step"}
              onChange={(e) => updateStep(index, e.target.value)}
              style={{ width: '100%', marginBottom: '10px', color: step === "" ? '#ccc' : '#000' }}
            />
          ))}
          <button onClick={addStep}>Add Step</button>
          <button onClick={handleDone} style={{ backgroundColor: done ? 'gold' : '' }}>
            {done ? "✓ Done!" : "Done!"}
          </button>
          <button onClick={handleStartOver}>Start Over</button>
        </div>
        <div style={{ width: '45%' }}>
          <h4>Completed Answer</h4>
          <button onClick={generateNextStep}>
            {completedAnswerSteps.length === 0 ? "Generate 1st step of completed answer" : "Generate next step of the completed answer"}
          </button>
          {completedAnswerSteps.map((step, index) => (
            <textarea key={index} value={step} readOnly style={{ width: '100%', marginTop: '10px' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenAIIntegration;
