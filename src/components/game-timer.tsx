import { useEffect, useRef, useState } from 'react';

interface GameTimerProps {
  running: boolean;
  onFinish: (durationMs: number) => void;
}

export const GameTimer: React.FC<GameTimerProps> = ({ running, onFinish }) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      startTimeRef.current = performance.now();
      intervalRef.current = window.setInterval(() => {
        const now = performance.now();
        if (startTimeRef.current !== null) {
          setElapsedMs(now - startTimeRef.current);
        }
      }, 50);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (startTimeRef.current !== null) {
        const finalDuration = performance.now() - startTimeRef.current;
        onFinish(finalDuration);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, onFinish]);

  return (
    <div className="text-5xl text-white font-mono font-bold mb-2">
      {(elapsedMs / 1000).toFixed(2)}s
    </div>
  );
};
