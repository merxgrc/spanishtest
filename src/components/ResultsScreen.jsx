import React from 'react';

const ResultsScreen = ({ results, onRestart }) => {
  const getCEFRLevel = (accuracy, highestLevel) => {
    if (accuracy >= 90) return highestLevel;
    if (accuracy >= 80) return highestLevel;
    if (accuracy >= 70) {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      const currentIndex = levels.indexOf(highestLevel);
      return currentIndex > 0 ? levels[currentIndex - 1] : 'A1';
    }
    if (accuracy >= 60) {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      const currentIndex = levels.indexOf(highestLevel);
      return currentIndex > 1 ? levels[currentIndex - 2] : 'A1';
    }
    return 'A1';
  };

  const getLevelDescription = (level) => {
    const descriptions = {
      'A1': {
        title: 'Beginner',
        description: 'Can understand and use familiar everyday expressions and very basic phrases.',
        skills: ['Basic greetings', 'Simple vocabulary', 'Numbers and colors', 'Personal information']
      },
      'A2': {
        title: 'Elementary',
        description: 'Can communicate in simple and routine tasks requiring a simple exchange of information.',
        skills: ['Present tense verbs', 'Daily activities', 'Basic grammar', 'Simple conversations']
      },
      'B1': {
        title: 'Intermediate',
        description: 'Can deal with most situations likely to arise while traveling in an area where the language is spoken.',
        skills: ['Past and future tenses', 'Complex sentences', 'Reading comprehension', 'Expressing opinions']
      },
      'B2': {
        title: 'Upper Intermediate',
        description: 'Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers possible.',
        skills: ['Subjunctive mood', 'Academic vocabulary', 'Complex grammar', 'Detailed discussions']
      },
      'C1': {
        title: 'Advanced',
        description: 'Can express ideas fluently and spontaneously without much obvious searching for expressions.',
        skills: ['Advanced grammar', 'Academic writing', 'Complex topics', 'Native-like fluency']
      }
    };
    return descriptions[level] || descriptions['A1'];
  };

  const getAreasOfStrength = (accuracy) => {
    if (accuracy >= 80) {
      return ['Strong vocabulary', 'Good grammar understanding', 'Reading comprehension'];
    } else if (accuracy >= 60) {
      return ['Basic vocabulary', 'Some grammar knowledge', 'Simple reading'];
    } else {
      return ['Basic greetings', 'Simple phrases', 'Numbers and colors'];
    }
  };

  const getSuggestedStartingPoint = (level) => {
    const suggestions = {
      'A1': 'Start with basic vocabulary and greetings. Focus on pronunciation and simple present tense verbs.',
      'A2': 'Continue with daily activities vocabulary and practice present tense conjugations regularly.',
      'B1': 'Work on past and future tenses. Practice reading short texts and expressing opinions.',
      'B2': 'Focus on subjunctive mood and complex grammar structures. Read authentic materials.',
      'C1': 'Practice advanced grammar and academic vocabulary. Engage in complex discussions and writing.'
    };
    return suggestions[level] || suggestions['A1'];
  };

  const estimatedLevel = getCEFRLevel(results.accuracy, results.highestLevelReached);
  const levelInfo = getLevelDescription(estimatedLevel);
  const strengths = getAreasOfStrength(results.accuracy);
  const suggestion = getSuggestedStartingPoint(estimatedLevel);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Test Complete!
          </h1>
          <p className="text-xl text-gray-600">
            Here are your Spanish proficiency results
          </p>
        </div>

        {/* Score Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {results.score}/{results.totalQuestions}
            </div>
            <div className="text-gray-600">Questions Correct</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {results.accuracy}%
            </div>
            <div className="text-gray-600">Accuracy</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {results.highestLevelReached}
            </div>
            <div className="text-gray-600">Highest Level Reached</div>
          </div>
        </div>

        {/* CEFR Level */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 mb-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              Your Estimated Level: {estimatedLevel}
            </h2>
            <h3 className="text-xl font-semibold mb-4">
              {levelInfo.title}
            </h3>
            <p className="text-lg opacity-90">
              {levelInfo.description}
            </p>
          </div>
        </div>

        {/* Skills and Recommendations */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Areas of Strength */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              💪 Areas of Strength
            </h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills at This Level */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🎯 Skills at {estimatedLevel} Level
            </h3>
            <ul className="space-y-2">
              {levelInfo.skills.map((skill, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Starting Point */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            📚 Suggested Starting Point
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {suggestion}
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🚀 Next Steps
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Practice daily for 15-30 minutes</li>
                <li>• Focus on your weakest areas</li>
                <li>• Use language learning apps</li>
                <li>• Find a conversation partner</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Resources:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Duolingo or Babbel for practice</li>
                <li>• Spanish podcasts for listening</li>
                <li>• Grammar books for {estimatedLevel} level</li>
                <li>• Online tutors or classes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            🔄 Take Test Again
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            🖨️ Print Results
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This assessment is based on the Common European Framework of Reference for Languages (CEFR).
            <br />
            For the most accurate placement, consider taking a comprehensive test with a qualified instructor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen; 