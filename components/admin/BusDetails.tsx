import React from 'react';

const StatusIndicator: React.FC<{ status: 'On Route' | 'Delayed' | 'At Garage' }> = ({ status }) => {
    const statusStyles = {
        'On Route': {
            dot: 'bg-green-500',
            text: 'text-green-500',
        },
        'Delayed': {
            dot: 'bg-red-500',
            text: 'text-red-500',
        },
        'At Garage': {
            dot: 'bg-gray-500',
            text: 'text-gray-500',
        },
    };
    const currentStyle = statusStyles[status];
    
    return (
        <div className="flex items-center space-x-2">
            <span className={`h-2.5 w-2.5 ${currentStyle.dot} rounded-full`}></span>
            <span className={currentStyle.text}>{status}</span>
        </div>
    );
};


const BusDetails: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Bus Details</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Real-time tracking and route information for all campus buses.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="p-3">Route No.</th>
              <th className="p-3">Driver Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700">
              <td className="p-3 font-semibold">5</td>
              <td className="p-3">Mr. Suresh</td>
              <td className="p-3">98765 43210</td>
              <td className="p-3"><StatusIndicator status="On Route" /></td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-3 font-semibold">12A</td>
              <td className="p-3">Mr. Ramesh</td>
              <td className="p-3">98765 43211</td>
              <td className="p-3"><StatusIndicator status="On Route" /></td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-3 font-semibold">8</td>
              <td className="p-3">Mr. Kumar</td>
              <td className="p-3">98765 43212</td>
              <td className="p-3"><StatusIndicator status="Delayed" /></td>
            </tr>
             <tr>
              <td className="p-3 font-semibold">3</td>
              <td className="p-3">Mr. Singh</td>
              <td className="p-3">98765 43213</td>
              <td className="p-3"><StatusIndicator status="At Garage" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusDetails;
