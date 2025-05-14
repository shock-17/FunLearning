import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../components/Character";
export function DifficultySelectionPage() {
  const navigate = useNavigate();
  const {
    subject
  } = useParams<{
    subject: string;
  }>();
  const difficultyInfo = [{
    level: "easy",
    title: "Easy",
    description: "No time limit, choose how many questions",
    character: "rabbit",
    color: "bg-green-100 border-green-300",
    textColor: "text-green-600"
  }, {
    level: "medium",
    title: "Medium",
    description: "15 questions, 60 seconds per question",
    character: "turtle",
    color: "bg-yellow-100 border-yellow-300",
    textColor: "text-yellow-600"
  }, {
    level: "hard",
    title: "Hard",
    description: "10 questions, 60 seconds, 3 lives",
    character: "bear",
    color: "bg-red-100 border-red-300",
    textColor: "text-red-600"
  }];
  return <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-2 text-indigo-600">
        Choose Difficulty
      </h1>
      <h2 className="text-2xl font-medium mb-8 capitalize text-purple-500">
        {subject}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {difficultyInfo.map(diff => <div key={diff.level} className={`${diff.color} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-64 flex flex-col items-center`} onClick={() => navigate(`/play/${subject}/${diff.level}`)}>
            <Character type={diff.character as any} className="w-24 h-24 mb-4" />
            <h2 className={`text-2xl font-bold ${diff.textColor} mb-2`}>
              {diff.title}
            </h2>
            <p className="text-gray-600 text-sm">{diff.description}</p>
          </div>)}
      </div>
      <button className="text-lg text-indigo-600 hover:text-indigo-800 flex items-center" onClick={() => navigate("/subjects")}>
        <span className="mr-2">←</span> Back to Subjects
      </button>
    </div>;
}