import React from 'react';
import './App.css';
import ExpandableTable from './components/ExpandableTable';
import InteractiveButtons from './components/InteractiveButtons';
import ConditionalHighlightTable from './components/ConditionalHighlightTable';
import OpenAIIntegration from './components/OpenAIIntegration';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Features</h1>
        <ExpandableTable />
        <InteractiveButtons />
        <ConditionalHighlightTable />
        <OpenAIIntegration />
      </header>
    </div>
  );
}

export default App;
