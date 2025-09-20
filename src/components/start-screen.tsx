import type React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold mb-50">🏔️ Summit</h1>
      <button
        type="button"
        onClick={onStart}
        className="bg-purple-600 px-6 py-3 rounded text-xl hover:bg-purple-700"
      >
        Start
      </button>
    </div>
  );
};
