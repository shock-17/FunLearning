import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register
  } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      setError('Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Create Parent Account
        </h1>
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required disabled={isLoading} />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-indigo-600 hover:text-indigo-800" disabled={isLoading}>
              Login here
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