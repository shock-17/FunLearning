import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
export function LandingPage() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-indigo-600">
            Learning Adventures
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
            A fun and safe educational platform where kids can learn Math and
            English through interactive games and challenges.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/login')} variant="primary">
              Parent Login
            </Button>
            <Button onClick={() => navigate('/register')} variant="secondary">
              Create Account
            </Button>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
            Why Choose Learning Adventures?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon="👨‍👩‍👧‍👦" title="Parent Controlled" description="Safe, monitored learning environment with parental controls and progress tracking." />
            <FeatureCard icon="🎮" title="Learn Through Play" description="Engaging games and activities that make learning fun and interactive." />
            <FeatureCard icon="📈" title="Track Progress" description="Monitor your child's learning journey with detailed progress reports." />
          </div>
        </div>
      </div>
      {/* Subjects Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
            Available Subjects
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <SubjectCard icon="🔢" title="Mathematics" description="Fun counting games and basic arithmetic suitable for young learners." />
            <SubjectCard icon="📚" title="English" description="Learn letters, words, and basic grammar through interactive exercises." />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">
            Start Your Learning Adventure Today!
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Join thousands of parents who trust Learning Adventures for their
            children's educational journey.
          </p>
          <Button onClick={() => navigate('/register')} variant="primary" size="large">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>;
}
function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
}
function SubjectCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
}