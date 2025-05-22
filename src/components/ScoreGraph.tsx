import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
type ScoreEntry = {
  playerName: string;
  profileId: string;
  scoreId: string;
  subject: string;
  difficulty: string;
  score: number;
  date: string;
};
type ScoreGraphProps = {
  scores: ScoreEntry[];
  activeProfileId?: string;
};
export function ScoreGraph({
  scores,
  activeProfileId
}: ScoreGraphProps) {
  // Process data for the chart
  const chartData = useMemo(() => {
    // Group scores by player and subject
    const groupedByPlayer: Record<string, Record<string, number[]>> = {};
    scores.forEach(entry => {
      // Initialize player if not exists
      if (!groupedByPlayer[entry.playerName]) {
        groupedByPlayer[entry.playerName] = {
          math: [],
          english: []
        };
      }
      // Add score to the appropriate subject array
      if (entry.subject === 'math') {
        groupedByPlayer[entry.playerName].math.push(entry.score);
      } else if (entry.subject === 'english') {
        groupedByPlayer[entry.playerName].english.push(entry.score);
      }
    });
    // Calculate average scores for each player and subject
    return Object.keys(groupedByPlayer).map(playerName => {
      const playerData = groupedByPlayer[playerName];
      const mathScores = playerData.math;
      const englishScores = playerData.english;
      // Calculate averages (or use 0 if no scores)
      const mathAvg = mathScores.length ? mathScores.reduce((sum, score) => sum + score, 0) / mathScores.length : 0;
      const englishAvg = englishScores.length ? englishScores.reduce((sum, score) => sum + score, 0) / englishScores.length : 0;
      // Find most recent scores
      const recentMathScore = mathScores.length ? mathScores[mathScores.length - 1] : 0;
      const recentEnglishScore = englishScores.length ? englishScores[englishScores.length - 1] : 0;
      // Find best scores
      const bestMathScore = mathScores.length ? Math.max(...mathScores) : 0;
      const bestEnglishScore = englishScores.length ? Math.max(...englishScores) : 0;
      return {
        name: playerName,
        mathAvg: Math.round(mathAvg * 10) / 10,
        englishAvg: Math.round(englishAvg * 10) / 10,
        recentMathScore,
        recentEnglishScore,
        bestMathScore,
        bestEnglishScore,
        totalGames: mathScores.length + englishScores.length
      };
    });
  }, [scores]);
  // If no data, show a placeholder
  if (chartData.length === 0) {
    return <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <p className="text-gray-500">
          No score data available yet. Start playing to see your progress!
        </p>
      </div>;
  }
  return <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">
        Performance Overview
      </h3>
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          Average Scores by Subject
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="mathAvg" name="Math Average" fill="#8884d8" />
            <Bar dataKey="englishAvg" name="English Average" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          Best Scores
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="bestMathScore" name="Math Best" fill="#8884d8" />
            <Bar dataKey="bestEnglishScore" name="English Best" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {chartData.map(player => <div key={player.name} className={`bg-gray-50 p-4 rounded-lg ${activeProfileId && scores.some(s => s.playerName === player.name && s.profileId === activeProfileId) ? 'border-2 border-indigo-300' : ''}`}>
            <h4 className="font-bold text-indigo-600">{player.name}</h4>
            <p className="text-gray-700">Total Games: {player.totalGames}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-sm text-gray-500">Math Average:</p>
                <p className="font-semibold">{player.mathAvg}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">English Average:</p>
                <p className="font-semibold">{player.englishAvg}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Math Best:</p>
                <p className="font-semibold">{player.bestMathScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">English Best:</p>
                <p className="font-semibold">{player.bestEnglishScore}</p>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}