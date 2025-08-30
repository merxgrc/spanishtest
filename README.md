# Spanish Placement Test

A modern, adaptive Spanish proficiency assessment built with React and Tailwind CSS. This application provides a comprehensive placement test that adjusts difficulty based on user performance and provides detailed results with CEFR level estimation.

## Features

- **Adaptive Testing**: Questions automatically adjust difficulty based on performance
- **CEFR Level Assessment**: Provides accurate A1-C1 level estimation
- **Comprehensive Results**: Detailed breakdown of strengths and recommendations
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Easy to Extend**: JSON-based question database for easy expansion

## Test Structure

- **10 questions maximum** per test
- **Adaptive progression**: Start at A1, move up/down based on performance
- **Multiple question types**: Vocabulary, grammar, and reading comprehension
- **Early termination**: Test ends after 2 consecutive wrong answers at the same level

## Question Levels

- **A1 (Beginner)**: Basic vocabulary, greetings, simple present tense
- **A2 (Elementary)**: Daily activities, basic grammar, simple conversations
- **B1 (Intermediate)**: Past/future tenses, complex sentences, reading comprehension
- **B2 (Upper Intermediate)**: Subjunctive mood, academic vocabulary, complex grammar
- **C1 (Advanced)**: Advanced grammar, academic writing, complex topics

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spanishassesment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── StartScreen.jsx      # Landing page
│   ├── QuizScreen.jsx       # Main test interface
│   └── ResultsScreen.jsx    # Results display
├── data/
│   └── questions.js         # Question database
├── App.jsx                  # Main application component
├── main.jsx                 # React entry point
└── index.css               # Global styles
```

## Adding Questions

To add new questions, edit `src/data/questions.js`. Each question should follow this structure:

```javascript
{
  level: "A1",                    // CEFR level (A1, A2, B1, B2, C1)
  type: "vocabulary",             // Question type (vocabulary, grammar, reading)
  question: "¿Cómo se dice 'house' en español?",
  options: ["Casa", "Perro", "Libro", "Escuela"],
  answer: "Casa"
}
```

## Customization

### Styling
The application uses Tailwind CSS. You can customize the design by modifying:
- `tailwind.config.js` for theme configuration
- Component classes for specific styling
- `src/index.css` for global styles

### Test Logic
The adaptive testing logic is in `QuizScreen.jsx`. You can modify:
- Number of questions per test
- Difficulty progression rules
- Early termination conditions

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: ES6+ features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository. 