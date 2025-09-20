import type React from 'react';

interface PlayAgainButtonProps {
  onClick: () => void;
}

export const PlayAgainButton: React.FC<PlayAgainButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={onClick}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Play Again
      </button>
    </div>
  );
};
