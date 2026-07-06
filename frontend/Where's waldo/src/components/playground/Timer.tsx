import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Clock } from "lucide-react";

type TimerProps = {
  isGameRunning: boolean;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};

export function Timer({ duration, setDuration, isGameRunning }: TimerProps) {
  useEffect(() => {
    if (!isGameRunning) return;
    const timer = setInterval(() => {
      setDuration((prev) => {
        const nextSeconds = prev + 1;
        return nextSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameRunning, duration, setDuration]);

  return (
    <div className="max-w-2xl mx-auto md:border-3 rounded-full md:border-purple-400 relative">
      <div
        className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2
        -translate-y-1/2 bg-purple-700 text-white w-30 py-0.5 rounded-xl"
      >
        <Clock size={30} />
        <span className="text-lg">{duration}</span>
      </div>
    </div>
  );
}
