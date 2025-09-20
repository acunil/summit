import { useEffect, useRef } from 'react';

interface QuestionFormProps {
  question: string;
  userAnswer: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  userAnswer,
  onChange,
  onSubmit,
  currentIndex,
  totalQuestions,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <p className="mb-2 text-lg text-white">
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <p className="mb-4 text-2xl text-white font-bold">{question}</p>
      <input
        ref={inputRef}
        type="number"
        required
        inputMode="numeric"
        pattern="[0-9]*"
        value={userAnswer}
        onChange={(e) => onChange(e.target.value)}
        className="text-center text-2xl px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-32"
      />
      <button
        type="submit"
        className="mt-4 bg-purple-600 px-6 py-2 rounded text-white text-lg hover:bg-purple-700"
      >
        Submit
      </button>
    </form>
  );
};
