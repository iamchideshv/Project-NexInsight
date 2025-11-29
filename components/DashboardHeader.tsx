import React from 'react';
import { MenuIcon, SunIcon, MoonIcon, SearchIcon, BellIcon } from './icons/Icons';

interface DashboardHeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onMenuClick: () => void;
  // Fix: Add optional props to satisfy components that pass them.
  title?: string;
  isHome?: boolean;
  onBackClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ theme, setTheme, onMenuClick }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 p-4 h-20 flex items-center justify-between sticky top-0 z-10 border-b dark:border-gray-700">
      {/* Left side: Menu button for mobile and Search for desktop */}
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
          <MenuIcon className="w-6 h-6" />
        </button>
         <div className="relative hidden md:block">
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
                type="text" 
                placeholder="Search students, staff, etc..."
                className="w-full md:w-80 p-3 pl-12 bg-gray-100 dark:bg-gray-700 border-transparent border rounded-lg focus:ring-primary focus:border-primary transition"
            />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center justify-end space-x-2">
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
        <button className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;