
import React from 'react';
import { Role } from '../types';
import { AdminIcon, FacultyIcon, StudentIcon } from './RoleIcons';

interface HomePageProps {
  onLoginSelect: (role: Role) => void;
}

const RoleButton: React.FC<{
  role: Role;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ role, icon, onClick }) => (
  <button
    onClick={onClick}
    className="group w-full text-left p-6 md:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center space-x-6"
  >
    <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{role}</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Login as {role}</p>
    </div>
  </button>
);

const HomePage: React.FC<HomePageProps> = ({ onLoginSelect }) => {
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2">NexInsight</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{greeting()}, select your role to continue.</p>
      </div>
      <div className="w-full max-w-md md:max-w-lg space-y-6">
        <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <RoleButton role={Role.Admin} icon={<AdminIcon className="w-8 h-8" />} onClick={() => onLoginSelect(Role.Admin)} />
        </div>
        <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <RoleButton role={Role.Faculty} icon={<FacultyIcon className="w-8 h-8" />} onClick={() => onLoginSelect(Role.Faculty)} />
        </div>
        <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <RoleButton role={Role.Student} icon={<StudentIcon className="w-8 h-8" />} onClick={() => onLoginSelect(Role.Student)} />
        </div>
      </div>
    </div>
  );
};

// Placeholder icons for roles
const RoleIcons: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default HomePage;
