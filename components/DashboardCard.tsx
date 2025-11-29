import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  details?: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, details, icon, iconBgClass, iconTextClass, onClick, children }) => {
  const cardClasses = `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between`;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      <div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${iconBgClass}`}>
            <div className={iconTextClass}>{icon}</div>
          </div>
        </div>
        {details && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{details}</p>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default DashboardCard;