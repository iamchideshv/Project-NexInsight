import React from 'react';

interface NavCardProps {
  title: string;
  icon: React.ReactNode;
  color: 'blue' | 'teal' | 'indigo' | 'green' | 'purple' | 'red' | 'orange' | 'yellow';
  onClick?: () => void;
}

const colorMap = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-500' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-500' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/50', text: 'text-indigo-500' },
  green: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-500' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-500' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-500' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-500' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-500' },
};

const NavCard: React.FC<NavCardProps> = ({ title, icon, color, onClick }) => {
  const selectedColor = colorMap[color];
  return (
    <div 
        onClick={onClick}
        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex items-center space-x-4"
    >
        <div className={`p-3 rounded-lg ${selectedColor.bg}`}>
            <div className={`w-6 h-6 ${selectedColor.text}`}>
                {icon}
            </div>
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
    </div>
  );
};

export default NavCard;