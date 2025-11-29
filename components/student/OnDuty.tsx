import React, { useState } from 'react';
import { onDutyData } from '../../data/onDutyData';
import { OnDutyRequest, OnDutyStatus } from '../../types';
import { timeSlots } from '../timetableData';

const StatusBadge: React.FC<{ status: OnDutyStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case 'Approved':
      return <span className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`}>Approved</span>;
    case 'Rejected':
      return <span className={`${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300`}>Rejected</span>;
    case 'Pending':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300`}>Pending</span>;
    default:
      return null;
  }
};

const OnDuty: React.FC = () => {
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [requests, setRequests] = useState(onDutyData);
    const [filter, setFilter] = useState<OnDutyStatus | 'All'>('All');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) {
            alert("Please provide a reason.");
            return;
        }

        const newRequest: OnDutyRequest = {
            id: requests.length + 1,
            reason,
            date,
            hours: [0, 1, 2, 3, 4, 5, 6], // Mocking full day
            status: 'Pending'
        };

        setRequests(prev => [newRequest, ...prev]);
        onDutyData.unshift(newRequest); // Also add to mock data source

        setReason('');
        alert("On Duty request submitted successfully.");
    };

    const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);
    
    const FilterButton: React.FC<{label: OnDutyStatus | 'All'}> = ({label}) => (
      <button onClick={() => setFilter(label)} className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${filter === label ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
          {label}
      </button>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">On Duty Request</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-8">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                    <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg"/>
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason for Leave</label>
                    <textarea id="reason" rows={3} value={reason} onChange={e => setReason(e.target.value)} required className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg" placeholder="e.g., Attending National Level Symposium"/>
                </div>
                <div className="text-right">
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
                        Submit Request
                    </button>
                </div>
            </form>

            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">My Past Requests</h3>
            
            <div className="flex space-x-2 border-b dark:border-gray-700 mb-6 pb-2">
              <FilterButton label="All" />
              <FilterButton label="Pending" />
              <FilterButton label="Approved" />
              <FilterButton label="Rejected" />
            </div>

            <div className="space-y-4">
                {filteredRequests.map(req => (
                    <div key={req.id} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800 dark:text-white">{req.reason}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Requested for: {req.date}</p>
                            </div>
                            <StatusBadge status={req.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnDuty;
