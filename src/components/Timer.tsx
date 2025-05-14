import React, { useEffect, useState } from "react";
type TimerProps = {
  isActive: boolean;
  onTimeUp: () => void;
  key?: string;
};
export function Timer({
  isActive,
  onTimeUp
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    if (isActive) {
      setTimeLeft(60);
    }
  }, [isActive]);
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isActive) {
      onTimeUp();
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timeLeft, isActive, onTimeUp]);
  const getColorClass = () => {
    if (timeLeft > 30) return "text-green-500";
    if (timeLeft > 10) return "text-yellow-500";
    return "text-red-500 animate-pulse";
  };
  return <div className="bg-white rounded-full px-4 py-2 shadow-md">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`text-xl font-bold ${getColorClass()}`}>
          {timeLeft} sec
        </span>
      </div>
    </div>;
}