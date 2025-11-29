
import React from 'react';

const StatusIndicator: React.FC<{ status: 'On Route' | 'Delayed' | 'At Garage' }> = ({ status }) => {
    const statusStyles = {
        'On Route': { dot: 'bg-green-500', text: 'text-green-500' },
        'Delayed': { dot: 'bg-red-500', text: 'text-red-500' },
        'At Garage': { dot: 'bg-gray-500', text: 'text-gray-500' },
    };
    const currentStyle = statusStyles[status];
    
    return (
        <div className="flex items-center space-x-2">
            <span className={`h-2.5 w-2.5 ${currentStyle.dot} rounded-full`}></span>
            <span className={currentStyle.text}>{status}</span>
        </div>
    );
};

const studentBusData = [
    { route: '5', driver: 'Mr. Suresh', contact: '98765 43210', status: 'On Route' as const, eta: '8:45 AM' },
    { route: '12A', driver: 'Mr. Ramesh', contact: '98765 43211', status: 'On Route' as const, eta: '8:50 AM' },
];

const BusDetails: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Bus Details</h2>
      
      {studentBusData.map(bus => (
        <div key={bus.route} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Route No.</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{bus.route}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                     <StatusIndicator status={bus.status} />
                     <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">ETA at Campus: <strong>{bus.eta}</strong></p>
                </div>
            </div>
            <div className="border-t dark:border-gray-600 my-4"></div>
            <div>
                <p><strong>Driver:</strong> {bus.driver}</p>
                <p><strong>Contact:</strong> {bus.contact}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default BusDetails;
