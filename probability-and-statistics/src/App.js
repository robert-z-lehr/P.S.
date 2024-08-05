import React, { useState } from 'react';
import ExpandableTable from './components/ExpandableTable';
import './App.css';

function App() {
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [question, setQuestion] = useState("");
  const [completedAnswerSteps, setCompletedAnswerSteps] = useState([]);
  const [answerSteps, setAnswerSteps] = useState(["Write the first step"]);
  const [done, setDone] = useState(false);

  const terms = [
    { term: "Mean", symbol: "x̄", definition: "The average of a set of numbers", whenToUse: "When you need to find the central value", whenNotToUse: "When there are extreme outliers" },
    { term: "Median", symbol: "Med", definition: "The middle value in a set of numbers", whenToUse: "When the data set has outliers", whenNotToUse: "For small data sets" },
    { term: "Mode", symbol: "Mo", definition: "The most frequently occurring value", whenToUse: "When you need to find the most common value", whenNotToUse: "For continuous data" },
    { term: "Standard Deviation", symbol: "σ", definition: "A measure of the amount of variation in a set of values", whenToUse: "To understand the spread of data", whenNotToUse: "For skewed data sets" },
    { term: "Variance", symbol: "σ²", definition: "The square of the standard deviation", whenToUse: "When comparing data dispersion", whenNotToUse: "For non-numeric data" },
    { term: "Probability", symbol: "P", definition: "A measure of the likelihood of an event", whenToUse: "For predictive analysis", whenNotToUse: "When outcomes are deterministic" },
    { term: "Correlation", symbol: "r", definition: "A measure of the relationship between two variables", whenToUse: "To find linear relationships", whenNotToUse: "For non-linear data" },
    { term: "Regression", symbol: "y = mx + b", definition: "A method for modeling relationships between variables", whenToUse: "For predictive analysis", whenNotToUse: "When variables are independent" },
    { term: "Sample", symbol: "n", definition: "A subset of a population", whenToUse: "When population is too large", whenNotToUse: "When complete data is available" },
    { term: "Population", symbol: "N", definition: "The entire set of individuals or items", whenToUse: "When complete data is needed", whenNotToUse: "For large-scale studies" },
  ];

  const handleRadioChange = (term) => {
    setSelectedTerms((prevSelectedTerms) => {
      if (prevSelectedTerms.includes(term)) {
        return prevSelectedTerms.filter((t) => t !== term);
      } else {
        return [...prevSelectedTerms, term];
      }
    });
  };

  const generateQuestion = () => {
    setQuestion("What is the mean of the following data set: [1, 2, 3, 4, 5]?");
  };

  const addStep = () => {
    if (!done) {
      setAnswerSteps([...answerSteps, "Write the next step"]);
    }
  };

  const markAsDone = () => {
    setDone(true);
  };

  const startOver = () => {
    setAnswerSteps(["Write the first step"]);
    setDone(false);
    setCompletedAnswerSteps([]);
  };

  const generateCompletedAnswerStep = () => {
    if (question && completedAnswerSteps.length === 0) {
      setCompletedAnswerSteps(["Step 1: Add up all the numbers in the data set: 1 + 2 + 3 + 4 + 5 = 15"]);
    } else if (question && completedAnswerSteps.length === 1) {
      setCompletedAnswerSteps([...completedAnswerSteps, "Step 2: Divide the sum by the number of data points: 15 / 5 = 3"]);
    } else if (question && completedAnswerSteps.length === 2) {
      setCompletedAnswerSteps([...completedAnswerSteps, "Answer Complete!"]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Civil Engineering Probability & Statistics Reference Sheet</h1>
        <h2>Familiarize yourself with this technical language and practice solving problems in each civil engineering domain.</h2>
        <h3>Terms, Concepts, Jargon, and Symbols to Memorize!</h3>
        <div className="table-container">
          <ExpandableTable terms={terms} selectedTerms={selectedTerms} onCheck={handleRadioChange} />
          <div className="difficulty-buttons">
            <p>Practice your knowledge with a 'Mix n' Match' exercise. There are four levels, choose your difficulty below!</p>
            <div className="buttons-container">
              <button>Freshman</button>
              <button>Sophomore</button>
              <button>Junior</button>
              <button>Senior</button>
            </div>
          </div>
        </div>
        <button onClick={generateQuestion} style={{ marginTop: '20px', fontSize: '16px' }}>Generate Random Question</button>
        {question && (
          <div>
            <h3>Generated Question: {question}</h3>
            <div className="answer-section">
              <div className="left-side">
                {answerSteps.map((step, index) => (
                  <div key={index}>
                    <input type="text" placeholder={step} />
                    {index === answerSteps.length - 1 && (
                      <>
                        <button onClick={addStep} disabled={done}>Add Step</button>
                        <button onClick={markAsDone} style={{ backgroundColor: done ? 'gold' : '' }}>{done ? '✓ Done!' : 'Done!'}</button>
                        <button onClick={startOver}>Start Over</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="right-side">
                <h4>Completed Answer</h4>
                <button
                  onClick={generateCompletedAnswerStep}
                  disabled={completedAnswerSteps.length === 3}
                  style={{ backgroundColor: completedAnswerSteps.length === 3 ? 'gold' : '' }}
                >
                  {completedAnswerSteps.length === 0
                    ? "Generate 1st step of completed answer"
                    : completedAnswerSteps.length === 2
                      ? "Complete Answer!"
                      : "Generate next step of the completed answer"}
                </button>
                {completedAnswerSteps.map((step, index) => (
                  <div key={index}>
                    <input type="text" value={step} readOnly />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
