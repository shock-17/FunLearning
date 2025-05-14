import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KidProfilesPage } from './pages/KidProfilesPage';
import { ProfileSelectionPage } from './pages/ProfileSelectionPage';
import { SubjectSelectionPage } from './pages/SubjectSelectionPage';
import { DifficultySelectionPage } from './pages/DifficultySelectionPage';
import { GamePage } from './pages/GamePage';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
export function App() {
  return <Router>
      <AuthProvider>
        <GameProvider>
          <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 font-sans">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<ProtectedRoute>
                    <KidProfilesPage />
                  </ProtectedRoute>} />
              <Route path="/kid-profiles" element={<ProtectedRoute>
                    <KidProfilesPage />
                  </ProtectedRoute>} />
              <Route path="/profile-selection" element={<ProtectedRoute>
                    <ProfileSelectionPage />
                  </ProtectedRoute>} />
              <Route path="/subjects" element={<ProtectedRoute>
                    <SubjectSelectionPage />
                  </ProtectedRoute>} />
              <Route path="/difficulty/:subject" element={<ProtectedRoute>
                    <DifficultySelectionPage />
                  </ProtectedRoute>} />
              <Route path="/play/:subject/:difficulty" element={<ProtectedRoute>
                    <GamePage />
                  </ProtectedRoute>} />
            </Routes>
          </div>
        </GameProvider>
      </AuthProvider>
    </Router>;
}