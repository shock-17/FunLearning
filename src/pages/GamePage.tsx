import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { LivesDisplay } from '../components/LivesDisplay';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { QuestionCountDisplay } from '../components/QuestionCountDisplay';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useGameContext } from '../context/GameContext';
import { useAuth } from '../context/AuthContext'; // Add this import
export function GamePage() {
  const {
    subject = 'math',
    difficulty = 'easy'
  } = useParams<{
    subject: string;
    difficulty: string;
  }>();
  const navigate = useNavigate();
  const {
    updateKidScore
  } = useAuth(); // Add this
  const {
    score,
    lives,
    setLives,
    questionCount,
    totalQuestions,
    setTotalQuestions,
    incrementScore,
    incrementQuestionCount,
    resetGame,
    playSound,
    setQuestionCount,
    setScore
  } = useGameContext();
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  useEffect(() => {
    resetGame();
    if (difficulty === 'medium') {
      setTotalQuestions(15);
    } else if (difficulty === 'hard') {
      setTotalQuestions(10);
      setLives(3);
    }
    setTimerActive(true);
  }, [difficulty, resetGame, setLives, setTotalQuestions]);
  useEffect(() => {
    if (questionCount >= totalQuestions && totalQuestions > 0) {
      setGameWon(score >= Math.ceil(totalQuestions * 0.6));
      setGameOver(true);
      // Save the score when game is over
      updateKidScore(subject, difficulty, score);
    }
  }, [questionCount, totalQuestions, score, subject, difficulty, updateKidScore]);
  const handleTimeUp = () => {
    if (gameOver) return;
    playSound('failure');
    setFeedbackMessage("Time's up!");
    if (difficulty === 'hard') {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
        return;
      }
    }
    showFeedbackThenNextQuestion(false);
  };
  const handleCorrectAnswer = () => {
    if (gameOver) return;
    playSound('success');
    setFeedbackMessage('Correct! 🎉');
    incrementScore();
    showFeedbackThenNextQuestion(true);
  };
  const handleWrongAnswer = () => {
    if (gameOver) return;
    playSound('failure');
    setFeedbackMessage('Incorrect! 😕');
    if (difficulty === 'hard') {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
        return;
      }
    }
    showFeedbackThenNextQuestion(false);
  };
  const showFeedbackThenNextQuestion = (wasCorrect: boolean) => {
    setTimerActive(false);
    setTimeout(() => {
      setFeedbackMessage(null);
      incrementQuestionCount();
      setTimeout(() => {
        setTimerActive(true);
      }, 100);
    }, 1000);
  };
  const startCustomGame = () => {
    resetGame();
    setTotalQuestions(customQuestionCount);
    setGameStarted(true);
  };
  if (!gameStarted && difficulty === 'easy') {
    return <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Choose Number of Questions
        </h1>
        <Character type="rabbit" className="w-32 h-32 mb-6" />
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 w-full max-w-sm">
          <label className="block text-gray-700 text-lg mb-2">
            How many questions?
          </label>
          <input type="range" min="1" max="20" value={customQuestionCount} onChange={e => setCustomQuestionCount(Number(e.target.value))} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
          <div className="text-2xl font-bold text-indigo-600 mt-2">
            {customQuestionCount}
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={startCustomGame} variant="secondary">
            Start Game
          </Button>
          <Button onClick={() => navigate(`/difficulty/${subject}`)} variant="primary">
            Back
          </Button>
        </div>
      </div>;
  }
  if (gameOver) {
    return <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">
          {gameWon ? 'Great Job!' : 'Game Over'}
        </h1>
        <Character type={gameWon ? 'rabbit' : 'turtle'} className="w-40 h-40 mb-6" />
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            Your Score
          </h2>
          <p className="text-4xl font-bold text-indigo-600 mb-2">
            {score} / {totalQuestions}
          </p>
          <p className="text-gray-600">
            {gameWon ? "Amazing! You've completed this level!" : "Don't worry! You can try again."}
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => {
          resetGame();
          setGameOver(false);
          setGameWon(false);
          if (difficulty === 'easy') {
            setGameStarted(false);
          } else {
            setTimerActive(true);
          }
        }} variant="secondary">
            Play Again
          </Button>
          <Button onClick={() => navigate(`/difficulty/${subject}`)} variant="primary">
            Choose Different Level
          </Button>
        </div>
      </div>;
  }
  return <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600 capitalize">
            {subject} - {difficulty}
          </h1>
          <Button onClick={() => navigate(`/difficulty/${subject}`)} size="small" variant="primary">
            Exit
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <ScoreDisplay />
            {feedbackMessage === 'Correct! 🎉' && <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                +1
              </div>}
          </div>
          <QuestionCountDisplay />
          {difficulty !== 'easy' && <Timer isActive={timerActive && !gameOver} onTimeUp={handleTimeUp} key={`timer-${questionCount}`} />}
          {difficulty === 'hard' && <LivesDisplay />}
        </div>
        {feedbackMessage && <div className={`text-center mb-4 text-xl font-bold ${feedbackMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedbackMessage}
          </div>}
        <div className="flex justify-center mb-8">
          <QuestionCard subject={subject} difficulty={difficulty} onCorrectAnswer={handleCorrectAnswer} onWrongAnswer={handleWrongAnswer} key={`question-${questionCount}`} />
        </div>
        {process.env.NODE_ENV === 'development' && <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm opacity-70">
            <p>Debug - Score: {score}</p>
            <p>
              Debug - Question: {questionCount + 1} of {totalQuestions}
            </p>
          </div>}
      </div>
    </div>;
}