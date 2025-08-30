import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [testResults, setTestResults] = useState(null);

  const startTest = () => {
    setCurrentScreen('quiz');
  };

  const finishTest = (results) => {
    setTestResults(results);
    setCurrentScreen('results');
  };

  const restartTest = () => {
    setTestResults(null);
    setCurrentScreen('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {currentScreen === 'start' && (
          <StartScreen onStart={startTest} />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen onFinish={finishTest} />
        )}
        {currentScreen === 'results' && (
          <ResultsScreen results={testResults} onRestart={restartTest} />
        )}
      </div>
    </div>
  );
}

export default App; 