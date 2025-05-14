import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../components/Character';
import { useAuth } from '../context/AuthContext';
export function ProfileSelectionPage() {
  const navigate = useNavigate();
  const {
    user,
    selectKidProfile
  } = useAuth();
  if (!user) return null;
  const handleSelectProfile = (profileId: string) => {
    selectKidProfile(profileId);
    navigate('/subjects');
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-12">
          Who's Playing?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {user.kidProfiles.map(profile => <button key={profile.id} onClick={() => handleSelectProfile(profile.id)} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <Character type={profile.avatar} className="w-32 h-32 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-indigo-600 text-center">
                {profile.name}
              </h2>
            </button>)}
        </div>
        <div className="mt-12 text-center">
          <button onClick={() => navigate('/kid-profiles')} className="text-indigo-600 hover:text-indigo-800">
            ← Manage Profiles
          </button>
        </div>
      </div>
    </div>;
}