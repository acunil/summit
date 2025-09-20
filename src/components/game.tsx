import type React from 'react';
import { useEffect, useState } from 'react';

import { generateQuestions } from '@/utils/generate-questions';

import { GameTimer } from './game-timer';
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
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [startSignal, setStartSignal] = useState<number>(Date.now());
  const [pendingFinish, setPendingFinish] = useState(false);
  const [started, setStarted] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (pendingFinish && durationMs !== null) {
      setFinished(true);
      setPendingFinish(false);
    }
  }, [pendingFinish, durationMs]);

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
      setPendingFinish(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {!started ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
          <h1 className="text-5xl font-bold mb-6">🏔️ Summit</h1>
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setStartSignal(Date.now());
            }}
            className="bg-purple-600 px-6 py-3 rounded text-xl hover:bg-purple-700"
          >
            Start
          </button>
        </div>
      ) : !finished ? (
        <>
          <h1 className="text-3xl font-bold mb-6">🏔️ Summit</h1>
          <GameTimer
            startSignal={startSignal}
            running={!pendingFinish}
            onFinish={(ms) => setDurationMs(ms)}
          />
          <QuestionForm
            question={currentQuestion.question}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleSubmit}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">🏔️ Summit</h1>
          <ResultsList
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            durationMs={durationMs}
          />
          <PlayAgainButton
            onClick={() => {
              setQuestions(generateQuestions());
              setCurrentIndex(0);
              setUserAnswer('');
              setUserAnswers([]);
              setScore(0);
              setFinished(false);
              setDurationMs(null);
              setStartSignal(Date.now());
              setStarted(false);
            }}
          />
        </>
      )}
    </div>
  );
};
