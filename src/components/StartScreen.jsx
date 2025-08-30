import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🇪🇸 Spanish Placement Test
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your Spanish proficiency level with our adaptive assessment
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Adaptive Testing</h3>
            <p className="text-gray-600">Questions adjust to your skill level in real-time</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Results</h3>
            <p className="text-gray-600">Get your CEFR level and personalized recommendations</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick & Easy</h3>
            <p className="text-gray-600">Complete in just 10 minutes with instant results</p>
          </div>
        </div>

        {/* Test Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📝 Test Format:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• 10 multiple-choice questions</li>
                <li>• Vocabulary, grammar, and reading</li>
                <li>• Adaptive difficulty progression</li>
                <li>• Instant feedback</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📈 Levels Covered:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• A1 (Beginner)</li>
                <li>• A2 (Elementary)</li>
                <li>• B1 (Intermediate)</li>
                <li>• B2 (Upper Intermediate)</li>
                <li>• C1 (Advanced)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          🚀 Start Your Test
        </button>

        <p className="text-gray-500 mt-4 text-sm">
          No registration required • Takes ~10 minutes • Get results instantly
        </p>
      </div>
    </div>
  );
};

export default StartScreen; 