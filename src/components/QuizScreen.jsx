import React, { useState, useEffect } from 'react';
import { questions, getQuestionsByLevel } from '../data/questions';

const QuizScreen = ({ onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState('A1');
  const [score, setScore] = useState(0);
  const [wrongAnswersAtCurrentLevel, setWrongAnswersAtCurrentLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  useEffect(() => {
    // Initialize with A1 questions
    const a1Questions = getQuestionsByLevel('A1');
    setAvailableQuestions(a1Questions);
    setCurrentQuestion(a1Questions[0]);
  }, []);

  const getNextLevel = (currentLevel) => {
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
  };

  const getPreviousLevel = (currentLevel) => {
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex > 0 ? levels[currentIndex - 1] : currentLevel;
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Add delay before moving to next question
    setTimeout(() => {
      if (correct) {
        setScore(score + 1);
        setWrongAnswersAtCurrentLevel(0);
        
        // Move to next level if available
        const nextLevel = getNextLevel(currentLevel);
        if (nextLevel !== currentLevel) {
          setCurrentLevel(nextLevel);
          const nextLevelQuestions = getQuestionsByLevel(nextLevel);
          setAvailableQuestions(nextLevelQuestions);
          setCurrentQuestionIndex(0);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } else {
        setWrongAnswersAtCurrentLevel(wrongAnswersAtCurrentLevel + 1);
        
        // If 2 wrong answers at current level, move down
        if (wrongAnswersAtCurrentLevel + 1 >= 2) {
          const prevLevel = getPreviousLevel(currentLevel);
          if (prevLevel !== currentLevel) {
            setCurrentLevel(prevLevel);
            const prevLevelQuestions = getQuestionsByLevel(prevLevel);
            setAvailableQuestions(prevLevelQuestions);
            setCurrentQuestionIndex(0);
          }
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }

      setQuestionsAnswered(questionsAnswered + 1);
    }, 1500); // 1.5 second delay
  };

  useEffect(() => {
    if (availableQuestions.length > 0 && currentQuestionIndex < availableQuestions.length) {
      setCurrentQuestion(availableQuestions[currentQuestionIndex]);
      // Reset selection state when question changes
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }, [availableQuestions, currentQuestionIndex]);

  useEffect(() => {
    // Check if test should end
    if (questionsAnswered >= 10 || (wrongAnswersAtCurrentLevel >= 2 && questionsAnswered >= 5)) {
      const results = {
        score,
        totalQuestions: questionsAnswered,
        highestLevelReached: currentLevel,
        accuracy: Math.round((score / questionsAnswered) * 100),
        levelBreakdown: calculateLevelBreakdown(),
        recommendations: generateRecommendations()
      };
      onFinish(results);
    }
  }, [questionsAnswered, wrongAnswersAtCurrentLevel, score, currentLevel]);

  const calculateLevelBreakdown = () => {
    // This would track performance by level in a real implementation
    return {
      A1: { correct: 0, total: 0 },
      A2: { correct: 0, total: 0 },
      B1: { correct: 0, total: 0 },
      B2: { correct: 0, total: 0 },
      C1: { correct: 0, total: 0 }
    };
  };

  const generateRecommendations = () => {
    const accuracy = Math.round((score / questionsAnswered) * 100);
    if (accuracy >= 80) {
      return `You're ready for ${currentLevel} level courses!`;
    } else if (accuracy >= 60) {
      return `Consider reviewing ${currentLevel} concepts before advancing.`;
    } else {
      return `Focus on mastering ${currentLevel} fundamentals first.`;
    }
  };

  const getEstimatedLevel = () => {
    const accuracy = Math.round((score / questionsAnswered) * 100);
    if (accuracy >= 80) return currentLevel;
    if (accuracy >= 60) return getPreviousLevel(currentLevel);
    return getPreviousLevel(getPreviousLevel(currentLevel)) || 'A1';
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {questionsAnswered + 1} of 10
            </span>
            <span className="text-sm font-medium text-gray-700">
              Level: {currentLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((questionsAnswered + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Score Display */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-800">
            Score: {score}/{questionsAnswered}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            Accuracy: {questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 0}%
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                {currentQuestion.type.toUpperCase()}
              </span>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentQuestion.level}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    : selectedAnswer === option
                    ? option === currentQuestion.answer
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : 'border-red-500 bg-red-100 text-red-800'
                    : option === currentQuestion.answer
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-6 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {isCorrect ? '✅' : '❌'}
              </span>
              <div>
                <h3 className={`font-semibold ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <p className={`${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect 
                    ? 'Great job! Moving to the next level.' 
                    : `The correct answer is: ${currentQuestion.answer}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Auto-advance indicator */}
        {showFeedback && (
          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                {questionsAnswered >= 9 ? 'Test complete! Processing results...' : 'Moving to next question...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen; 