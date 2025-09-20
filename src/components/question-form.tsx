import type React from 'react';

interface QuestionFormProps {
  question: string;
  userAnswer: string;
  onChange: (val: string) => void;
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
  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <div className="mb-4 text-xl text-center">
        Question {currentIndex + 1} of {totalQuestions}
      </div>
      <div className="mb-4 text-2xl text-center font-mono">{question}</div>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => onChange(e.target.value)}
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
  );
};
