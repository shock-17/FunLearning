import React, { useMemo, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { ScoreGraph } from '../components/ScoreGraph';
import { useAuth } from '../context/AuthContext';
import { LogOutIcon, EditIcon, TrashIcon, PlayIcon, BarChart2Icon, ListIcon } from 'lucide-react';
// Define a type for score entries to improve type safety
type ScoreEntry = {
  playerName: string;
  profileId: string;
  scoreId: string;
  subject: string;
  difficulty: string;
  score: number;
  date: string;
};
export function KidProfilesPage() {
  const navigate = useNavigate();
  const {
    user,
    addKidProfile,
    logout,
    selectKidProfile,
    deleteKidProfile,
    updateKidProfile
  } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Character['type']>('fox');
  const [viewMode, setViewMode] = useState<'table' | 'graph'>('graph');
  const avatarOptions: Character['type'][] = ['fox', 'bear', 'rabbit', 'owl', 'turtle'];
  // Use useMemo to process scores only when user or profiles change
  const scoreEntries = useMemo(() => {
    if (!user || !user.kidProfiles.length) return [];
    const entries: ScoreEntry[] = [];
    // Process each profile and its scores
    user.kidProfiles.forEach(profile => {
      if (!profile.scores || !profile.scores.length) return;
      profile.scores.forEach(score => {
        entries.push({
          playerName: profile.name,
          profileId: profile.id,
          scoreId: score.id || `${profile.id}-${score.date}-${Math.random()}`,
          subject: score.subject,
          difficulty: score.difficulty,
          score: score.score,
          date: score.date
        });
      });
    });
    // Sort by date (newest first)
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [user]);
  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addKidProfile(newName, selectedAvatar);
    setIsAdding(false);
    setNewName('');
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleStartGame = (profileId: string) => {
    selectKidProfile(profileId);
    navigate('/subjects');
  };
  const handleEditProfile = (profileId: string) => {
    setIsEditing(profileId);
    const profile = user?.kidProfiles.find(p => p.id === profileId);
    if (profile) {
      setNewName(profile.name);
      setSelectedAvatar(profile.avatar);
    }
  };
  const handleUpdateProfile = (profileId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    updateKidProfile(profileId, newName, selectedAvatar);
    setIsEditing(null);
  };
  const handleDeleteProfile = (profileId: string) => {
    deleteKidProfile(profileId);
    setShowDeleteConfirm(null);
  };
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'graph' : 'table');
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
            <Button onClick={handleLogout} size="small" variant="danger" className="flex items-center justify-center">
              <LogOutIcon size={16} className="mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {user.kidProfiles.map(profile => <div key={profile.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative">
              <Character type={profile.avatar} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center text-indigo-600 mb-4">
                {profile.name}
              </h3>
              <div className="flex justify-center gap-2 mt-2">
                <button onClick={() => handleStartGame(profile.id)} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full" title="Start Game">
                  <PlayIcon size={16} />
                </button>
                <button onClick={() => handleEditProfile(profile.id)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full" title="Edit Profile">
                  <EditIcon size={16} />
                </button>
                <button onClick={() => setShowDeleteConfirm(profile.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full" title="Delete Profile">
                  <TrashIcon size={16} />
                </button>
              </div>
              {showDeleteConfirm === profile.id && <div className="absolute inset-0 bg-white bg-opacity-90 rounded-xl flex flex-col items-center justify-center p-4">
                  <p className="text-red-600 font-bold mb-3">
                    Delete this profile?
                  </p>
                  <div className="flex gap-2">
                    <Button size="small" variant="danger" onClick={() => handleDeleteProfile(profile.id)}>
                      Delete
                    </Button>
                    <Button size="small" onClick={() => setShowDeleteConfirm(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>}
            </div>)}
          {/* Add Profile Button */}
          {user.kidProfiles.length < 5 && !isAdding && <button onClick={() => setIsAdding(true)} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center transform hover:scale-105">
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
                <Button type="button" variant="danger" className="w-full" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="w-full">
                  Create Profile
                </Button>
              </div>
            </form>
          </div>}
        {/* Editing Profile Form */}
        {isEditing && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
                Edit Kid Profile
              </h2>
              <form onSubmit={e => handleUpdateProfile(isEditing, e)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="editName">
                    Name
                  </label>
                  <input id="editName" type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
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
                  <Button type="button" variant="danger" className="w-full" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-full">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>}
        {/* Leaderboard */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              Progress Tracking
            </h2>
            <button onClick={toggleViewMode} className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-3 py-2 rounded-lg transition-colors">
              {viewMode === 'table' ? <>
                  <BarChart2Icon size={16} />
                  <span>Graph View</span>
                </> : <>
                  <ListIcon size={16} />
                  <span>Table View</span>
                </>}
            </button>
          </div>
          {/* View toggle between graph and table */}
          {viewMode === 'graph' ? <ScoreGraph scores={scoreEntries} /> : <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                  {scoreEntries.length > 0 ?
              // Use the memoized score entries
              scoreEntries.slice(0, 50).map(scoreEntry => <tr key={scoreEntry.scoreId} className="hover:bg-gray-50">
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
                        {user.kidProfiles.length === 0 ? 'No profiles created yet. Add a kid profile to get started!' : 'No scores yet. Start playing to see your scores here!'}
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>}
        </div>
      </div>
    </div>;
}