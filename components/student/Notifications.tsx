
import React from 'react';
import { BellIcon } from '../icons/Icons';

const notificationsData = [
    { from: "Admin", message: "The library will be closed this Saturday for maintenance.", date: "2024-07-23" },
    { from: "Mrs. M. Parvathi (AI)", message: "AI Lab assignment deadline extended to Friday, July 26th.", date: "2024-07-22" },
    { from: "Placement Cell", message: "TCS recruitment drive registration is now open.", date: "2024-07-21" },
];

const Notifications: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Notifications</h2>
      
      <div className="space-y-4">
        {notificationsData.length > 0 ? notificationsData.map((notification, index) => (
          <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
                <BellIcon className="w-5 h-5 text-primary"/>
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">{notification.from}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.date}</p>
            </div>
          </div>
        )) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
