import React from "react";
import { useGameContext } from "../context/GameContext";
export function QuestionCountDisplay() {
  const {
    questionCount,
    totalQuestions
  } = useGameContext();
  const displayedQuestionNumber = questionCount + 1;
  const progress = totalQuestions > 0 ? questionCount / totalQuestions * 100 : 0;
  return <div className="w-full bg-white rounded-full px-4 py-2 shadow-md">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-indigo-600">
          Question {displayedQuestionNumber} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
}