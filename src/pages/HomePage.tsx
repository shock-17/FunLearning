import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Character } from "../components/Character";
export function HomePage() {
  const navigate = useNavigate();
  return <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-5xl font-bold mb-6 text-indigo-600">
        <span className="text-red-500">L</span>
        <span className="text-yellow-500">e</span>
        <span className="text-green-500">a</span>
        <span className="text-blue-500">r</span>
        <span className="text-purple-500">n</span>
        <span className="text-pink-500">i</span>
        <span className="text-orange-500">n</span>
        <span className="text-teal-500">g</span>
        <span className="ml-3 text-indigo-600">A</span>
        <span className="text-red-500">d</span>
        <span className="text-green-500">v</span>
        <span className="text-blue-500">e</span>
        <span className="text-purple-500">n</span>
        <span className="text-yellow-500">t</span>
        <span className="text-pink-500">u</span>
        <span className="text-teal-500">r</span>
        <span className="text-orange-500">e</span>
        <span className="text-indigo-500">s</span>
      </h1>
      <div className="flex justify-center mb-8 relative">
        <Character type="fox" className="w-32 h-32 -mr-4 transform -rotate-6" />
        <Character type="bear" className="w-40 h-40 z-10" />
        <Character type="rabbit" className="w-32 h-32 -ml-4 transform rotate-6" />
      </div>
      <p className="text-2xl mb-10 text-purple-700 max-w-md">
        Learn and play with fun activities! Are you ready for an adventure?
      </p>
      <Button onClick={() => navigate("/subjects")} className="animate-bounce">
        Let's Start!
      </Button>
    </div>;
}