import { useEffect, useRef, useState } from 'react';

interface GameTimerProps {
  startSignal: number;
  running: boolean;
  onFinish: (durationMs: number) => void;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  startSignal,
  running,
  onFinish,
}) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: startSignal is intentionally used to trigger timer reset
  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setElapsedMs(0);
    startTimeRef.current = performance.now();

    intervalRef.current = window.setInterval(() => {
      const now = performance.now();
      if (startTimeRef.current !== null) {
        setElapsedMs(now - startTimeRef.current);
      }
    }, 50);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startSignal]);

  useEffect(() => {
    if (!running && startTimeRef.current !== null) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const finalDuration = performance.now() - startTimeRef.current;
      onFinish(finalDuration);
      startTimeRef.current = null;
    }
  }, [running, onFinish]);

  return (
    <div className="text-5xl text-white font-mono font-bold mb-2">
      {(elapsedMs / 1000).toFixed(2)}s
    </div>
  );
};
