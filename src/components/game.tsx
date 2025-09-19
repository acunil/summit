import type React from 'react';
import { useState } from 'react';

// Utility to generate 10 sums of increasing difficulty
function generateQuestions(): Array<{ question: string; answer: number }> {
  const questions = [];
  for (let i = 1; i <= 10; i++) {
    const max = i * 10; // Difficulty increases with each question
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    questions.push({
      question: `${a} + ${b}`,
      answer: a + b,
    });
  }
  return questions;
}

export const Game: React.FC = () => {
  const [questions] = useState(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numericAnswer = parseInt(userAnswer, 10);
    if (numericAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setUserAnswer('');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-0 p-4">
      <h1 className="text-3xl font-bold mb-6">🏔️ Summit</h1>

      {!finished ? (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4 text-xl text-center">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="mb-4 text-2xl text-center font-mono">
            {currentQuestion.question}
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-lg"
            placeholder="Your answer"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Game Over 🎉</h2>
          <p className="text-lg">
            Your score: {score} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};
