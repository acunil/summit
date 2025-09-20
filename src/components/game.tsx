import type React from 'react';
import { useState } from 'react';

import { generateQuestions } from '@/utils/generate-questions';

import { PlayAgainButton } from './play-again-button';
import { QuestionForm } from './question-form';
import { ResultsList } from './results-list';

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
        <QuestionForm
          question={currentQuestion.question}
          userAnswer={userAnswer}
          onChange={setUserAnswer}
          onSubmit={handleSubmit}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <>
          <ResultsList
            questions={questions}
            userAnswers={userAnswers}
            score={score}
          />
          <PlayAgainButton
            onClick={() => {
              setQuestions(generateQuestions());
              setCurrentIndex(0);
              setUserAnswer('');
              setUserAnswers([]);
              setScore(0);
              setFinished(false);
            }}
          />
        </>
      )}
    </div>
  );
};
