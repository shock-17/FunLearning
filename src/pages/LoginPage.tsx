import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/home';
      navigate(from, {
        replace: true
      });
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Parent Login
        </h1>
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-indigo-600 hover:text-indigo-800" disabled={isLoading}>
              Register here
            </button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-800" disabled={isLoading}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>;
}