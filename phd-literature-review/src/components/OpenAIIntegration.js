// src/components/OpenAIIntegration.js
import React, { useState } from 'react';
import axios from 'axios';

const OpenAIIntegration = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  const fetchQuestion = async () => {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: 'Generate a probability question',
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      }
    });
    setQuestion(response.data.choices[0].text);
  };

  const checkAnswer = async () => {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Check if the following answer is correct for the question: ${question} Answer: ${userAnswer}`,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      }
    });
    setAnswer(response.data.choices[0].text);
  };

  return (
    <div>
      <button onClick={fetchQuestion}>Get Question</button>
      <div>{question}</div>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Check Answer</button>
      <div>{answer}</div>
    </div>
  );
};

export default OpenAIIntegration;
