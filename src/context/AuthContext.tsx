import React, { useEffect, useState, createContext, useContext } from 'react';
type KidProfile = {
  id: string;
  name: string;
  avatar: 'fox' | 'bear' | 'rabbit' | 'owl' | 'turtle';
  scores: {
    id: string; // Add unique ID to each score
    subject: string;
    difficulty: string;
    score: number;
    date: string;
  }[];
};
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'parent' | 'child';
  kidProfiles: KidProfile[];
  activeKidProfile?: KidProfile;
};
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addKidProfile: (name: string, avatar: KidProfile['avatar']) => void;
  deleteKidProfile: (profileId: string) => void;
  updateKidProfile: (profileId: string, name: string, avatar: KidProfile['avatar']) => void;
  selectKidProfile: (profileId: string) => void;
  updateKidScore: (subject: string, difficulty: string, score: number) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USERS_STORAGE_KEY = 'registeredUsers';
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    // Find user with matching email and password
    const foundUser = registeredUsers.find((u: User) => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser));
  };
  const register = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Get existing users
    const registeredUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    // Check if email already exists
    if (registeredUsers.some((u: User) => u.email === email)) {
      throw new Error('Email already registered');
    }
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      password,
      role: 'parent',
      kidProfiles: []
    };
    // Add to registered users
    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    // Log user in
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const addKidProfile = (name: string, avatar: KidProfile['avatar']) => {
    if (!user) return;
    const newProfile: KidProfile = {
      id: Math.random().toString(36).substring(7),
      name,
      avatar,
      scores: []
    };
    const updatedUser = {
      ...user,
      kidProfiles: [...user.kidProfiles, newProfile]
    };
    // Update both current user and the registered users list
    updateUserState(updatedUser);
  };
  const updateKidProfile = (profileId: string, name: string, avatar: KidProfile['avatar']) => {
    if (!user) return;
    // Find the profile to update
    const profileIndex = user.kidProfiles.findIndex(profile => profile.id === profileId);
    if (profileIndex === -1) return;
    // Create a deep copy of all profiles to avoid reference issues
    const updatedProfiles = JSON.parse(JSON.stringify(user.kidProfiles));
    // Update the profile
    updatedProfiles[profileIndex].name = name;
    updatedProfiles[profileIndex].avatar = avatar;
    // Check if the profile being updated is the active profile
    const isActiveProfile = user.activeKidProfile?.id === profileId;
    // Create the updated user object
    const updatedUser = {
      ...user,
      kidProfiles: updatedProfiles,
      // Update activeKidProfile if it's the one being edited
      activeKidProfile: isActiveProfile ? {
        ...user.activeKidProfile!,
        name,
        avatar
      } : user.activeKidProfile
    };
    // Update both current user and the registered users list
    updateUserState(updatedUser);
  };
  const deleteKidProfile = (profileId: string) => {
    if (!user) return;
    // Check if the profile to delete is currently active
    const isActiveProfile = user.activeKidProfile?.id === profileId;
    // Filter out the profile to delete
    const updatedProfiles = user.kidProfiles.filter(profile => profile.id !== profileId);
    // Create updated user object
    const updatedUser = {
      ...user,
      kidProfiles: updatedProfiles,
      // Remove activeKidProfile if it's the one being deleted
      activeKidProfile: isActiveProfile ? undefined : user.activeKidProfile
    };
    // Update both current user and the registered users list
    updateUserState(updatedUser);
  };
  const selectKidProfile = (profileId: string) => {
    if (!user) return;
    const profile = user.kidProfiles.find(p => p.id === profileId);
    if (!profile) return;
    // Create a deep copy of the profile to avoid reference issues
    const profileCopy = JSON.parse(JSON.stringify(profile));
    const updatedUser = {
      ...user,
      activeKidProfile: profileCopy
    };
    // Update both current user and the registered users list
    updateUserState(updatedUser);
  };
  const updateKidScore = (subject: string, difficulty: string, score: number) => {
    if (!user?.activeKidProfile) return;
    // Create a new score entry with a unique ID
    const newScore = {
      id: `score_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      subject,
      difficulty,
      score,
      date: new Date().toISOString()
    };
    // Find the active profile in the kidProfiles array (by ID)
    const activeProfileId = user.activeKidProfile.id;
    const activeProfileIndex = user.kidProfiles.findIndex(p => p.id === activeProfileId);
    if (activeProfileIndex === -1) return;
    // Create a deep copy of all profiles to avoid reference issues
    const updatedProfiles = JSON.parse(JSON.stringify(user.kidProfiles));
    // Ensure scores array exists
    if (!updatedProfiles[activeProfileIndex].scores) {
      updatedProfiles[activeProfileIndex].scores = [];
    }
    // Add the new score to the specific profile
    updatedProfiles[activeProfileIndex].scores.push(newScore);
    // Create the updated active profile reference (deep copy)
    const updatedActiveProfile = JSON.parse(JSON.stringify(updatedProfiles[activeProfileIndex]));
    // Create the full updated user
    const updatedUser = {
      ...user,
      kidProfiles: updatedProfiles,
      activeKidProfile: updatedActiveProfile
    };
    // Update both current user and the registered users list
    updateUserState(updatedUser);
  };
  // Helper function to update user in state and localStorage
  const updateUserState = (updatedUser: User) => {
    // Update local state
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    // Update in registered users
    const registeredUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUsers = registeredUsers.map((u: User) => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    login,
    register,
    logout,
    addKidProfile,
    deleteKidProfile,
    updateKidProfile,
    selectKidProfile,
    updateKidScore
  }}>
      {children}
    </AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};