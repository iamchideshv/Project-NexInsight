
import React from 'react';

const ViewWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-fade-in bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      {children}
    </div>
  );
};

export default ViewWrapper;
