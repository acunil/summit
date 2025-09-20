import type React from 'react';

interface Question {
  question: string;
  answer: number;
}

interface ResultsListProps {
  questions: Array<Question>;
  userAnswers: Array<number>;
  score: number;
  durationMs: number | null;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  questions,
  userAnswers,
  score,
  durationMs,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Game Over 🎉</h2>
      {durationMs !== null && (
        <p className="text-md text-white font-mono font-bold mt-4">
          Time:{(durationMs / 1000).toFixed(2)}s
        </p>
      )}
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
                    className={isCorrect ? 'text-green-500' : 'text-red-500'}
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
    </div>
  );
};
