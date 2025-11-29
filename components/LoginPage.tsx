
import React, { useState } from 'react';
import { Role } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('harish');
  const [password, setPassword] = useState('HR');
  const [email, setEmail] = useState('admin@nexinsight.edu');
  const [error, setError] = useState('');

  // Signup form state
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.toLowerCase() === 'harish' && password === 'HR') {
      const normalizedEmail = email.toLowerCase();
      if (normalizedEmail.includes('admin')) {
        onLoginSuccess(Role.Admin);
      } else if (normalizedEmail.includes('faculty')) {
        onLoginSuccess(Role.Faculty);
      } else {
        onLoginSuccess(Role.Student); // Default to student
      }
    } else {
      setError('Invalid username or password.');
    }
  };
  
  const handleGuestLogin = () => {
    // Defaulting guest to Student role
    onLoginSuccess(Role.Student);
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signup feature coming soon');
  }

  const renderLoginForm = () => (
    <div key="login-form" className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="Harish" autoComplete="username" required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="HR" autoComplete="current-password" required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email (for role)</label>
          <input
            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="e.g., admin@nexinsight.edu" autoComplete="email" required
          />
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div className="pt-2 space-y-4">
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-primary transition-transform transform hover:scale-105">
            Login
          </button>
          <button type="button" onClick={handleGuestLogin} className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-primary transition">
            Continue as Guest
          </button>
        </div>
         <p className="text-sm text-center text-gray-600 dark:text-gray-400 pt-2">
            Don’t have an account?{' '}
            <button type="button" onClick={() => setActiveTab('signup')} className="font-semibold text-primary hover:underline focus:outline-none">
                Sign Up
            </button>
        </p>
      </form>
    </div>
  );

  const renderSignupForm = () => (
    <div key="signup-form" className="animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
        <div>
            <label htmlFor="signup-fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input id="signup-fullname" type="text" value={signupFullName} onChange={(e) => setSignupFullName(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"/>
        </div>
        <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"/>
        </div>
        <div>
            <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input id="signup-username" type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"/>
        </div>
        <div>
            <label htmlFor="signup-password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"/>
        </div>
        <div className="pt-2">
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-primary transition-transform transform hover:scale-105">
                Sign Up
            </button>
        </div>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button type="button" onClick={() => setActiveTab('login')} className="font-semibold text-primary hover:underline focus:outline-none">
                Login
            </button>
        </p>
        </form>
    </div>
  );


  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pb-16 md:pb-24 transition-colors duration-500 font-sans overflow-hidden">
       <div className="text-center absolute top-8 md:top-12 left1/2 -translate-x-1/2 w-full px-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
        <h1 className="text-6xl md:text-7xl font-bold text-primary dark:text-primary/90">
          NexInsight
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Smart Campus. Smarter Insights.</p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slide-up opacity 0" style={{ animationFillMode: 'forwards' }}>
          <div className="p-8 md:p-10">
            {activeTab === 'login' ? renderLoginForm() : renderSignupForm()}
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
