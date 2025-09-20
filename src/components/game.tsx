import type React from 'react';
import { useState } from 'react';

// Utility to generate 10 sums of increasing difficulty
function generateQuestions(): Array<{ question: string; answer: number }> {
  const questions = [];
  for (let i = 1; i <= 10; i++) {
    const max = i * 10;
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
  const [questions, setQuestions] = useState(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<Array<number>>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numericAnswer = parseInt(userAnswer, 10);
    const updatedAnswers = [...userAnswers, numericAnswer];
    setUserAnswers(updatedAnswers);

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
          <p className="text-lg mb-4">
            Your score: {score} / {questions.length}
          </p>

          <div className="text-left inline-block">
            <h3 className="text-xl font-semibold mb-2">Your Answers:</h3>
            <ul className="space-y-1">
              {questions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.answer;
                return (
                  <li
                    key={q.question}
                    className="text-white flex items-center gap-2"
                  >
                    <span>{isCorrect ? '✅' : '❌'}</span>
                    <span>
                      {q.question} ={' '}
                      <span
                        className={
                          isCorrect ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {userAns}
                      </span>{' '}
                      {!isCorrect && (
                        <span className="text-white">({q.answer})</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setQuestions(generateQuestions()); // regenerate new questions
                setCurrentIndex(0);
                setUserAnswer('');
                setUserAnswers([]);
                setScore(0);
                setFinished(false);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
