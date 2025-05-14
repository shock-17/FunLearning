import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../components/Character';
import { Button } from '../components/Button';
export function SubjectSelectionPage() {
  const navigate = useNavigate();
  return <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">
        Choose a Subject
      </h1>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 w-64 h-80 flex flex-col items-center justify-center" onClick={() => navigate('/difficulty/math')}>
          <div className="w-32 h-32 mb-4 flex items-center justify-center">
            <img src="https://cdn-icons-png.flaticon.com/512/897/897368.png" alt="Math calculations with numbers and symbols" className="object-contain w-full h-full drop-shadow-lg" />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Math</h2>
          <p className="text-gray-600">Numbers and counting fun!</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 w-64 h-80 flex flex-col items-center justify-center" onClick={() => navigate('/difficulty/english')}>
          <div className="w-32 h-32 mb-4 flex items-center justify-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" alt="Open book with alphabet letters" className="object-contain w-full h-full drop-shadow-lg" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">English</h2>
          <p className="text-gray-600">Letters and words adventure!</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="text-lg text-indigo-600 hover:text-indigo-800 flex items-center" onClick={() => navigate('/profile-selection')}>
          <span className="mr-2">←</span> Change Player
        </button>
        <Button onClick={() => navigate('/kid-profiles')} size="small" variant="secondary">
          Parent Dashboard
        </Button>
      </div>
    </div>;
}