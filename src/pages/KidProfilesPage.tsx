import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useAuth } from '../context/AuthContext';
export function KidProfilesPage() {
  const navigate = useNavigate();
  const {
    user,
    addKidProfile
  } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Character['type']>('fox');
  const avatarOptions: Character['type'][] = ['fox', 'bear', 'rabbit', 'owl', 'turtle'];
  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addKidProfile(newName, selectedAvatar);
    setIsAdding(false);
    setNewName('');
  };
  if (!user) return null;
  return <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Kid Profiles</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}!</span>
            <Button onClick={() => navigate('/home')} size="small">
              Parent Dashboard
            </Button>
          </div>
        </div>
        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {user.kidProfiles.map(profile => <div key={profile.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105" onClick={() => {
          navigate('/profile-selection');
        }}>
              <Character type={profile.avatar} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center text-indigo-600">
                {profile.name}
              </h3>
            </div>)}
          {/* Add Profile Button */}
          {user.kidProfiles.length < 5 && !isAdding && <button onClick={() => setIsAdding(true)} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center">
              <div className="text-4xl text-indigo-400 mb-2">+</div>
              <span className="text-indigo-600 font-medium">Add Profile</span>
            </button>}
        </div>
        {/* Add Profile Form */}
        {isAdding && <div className="bg-white rounded-xl p-6 shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
              Create Kid Profile
            </h2>
            <form onSubmit={handleAddProfile} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input id="name" type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Choose an Avatar
                </label>
                <div className="grid grid-cols-5 gap-4">
                  {avatarOptions.map(avatar => <button key={avatar} type="button" onClick={() => setSelectedAvatar(avatar)} className={`p-2 rounded-lg transition-all ${selectedAvatar === avatar ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'hover:bg-gray-100'}`}>
                      <Character type={avatar} className="w-12 h-12" />
                    </button>)}
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="secondary" className="w-full" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="w-full">
                  Create Profile
                </Button>
              </div>
            </form>
          </div>}
        {/* Leaderboard */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            Leaderboard
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user.kidProfiles.length > 0 ?
              // Create an array of all scores with player information
              user.kidProfiles.flatMap(profile => profile.scores.map(score => ({
                playerName: profile.name,
                profileId: profile.id,
                scoreId: score.id || `${profile.id}-${score.date}`,
                subject: score.subject,
                difficulty: score.difficulty,
                score: score.score,
                date: score.date
              }))).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50) // Limit to last 50 scores
              .map(scoreEntry => <tr key={scoreEntry.scoreId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {scoreEntry.playerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                          {scoreEntry.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                          {scoreEntry.difficulty}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {scoreEntry.score}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(scoreEntry.date).toLocaleString()}
                        </td>
                      </tr>) : <tr>
                    <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                      No profiles created yet. Add a kid profile to get started!
                    </td>
                  </tr>}
                {user.kidProfiles.length > 0 && user.kidProfiles.flatMap(p => p.scores).length === 0 && <tr>
                      <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                        No scores yet. Start playing to see your scores here!
                      </td>
                    </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
}