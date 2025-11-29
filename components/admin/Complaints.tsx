import React, { useState, useMemo } from 'react';
import { complaintsData } from '../../data/complaintsData';
import { Complaint, ComplaintStatus, Sentiment } from '../../types';

const SentimentBadge: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (sentiment) {
    case 'Urgent':
      return <span className={`${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300`}>Urgent</span>;
    case 'Frustrated':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300`}>Frustrated</span>;
    case 'Suggestion':
      return <span className={`${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300`}>Suggestion</span>;
    default:
      return null;
  }
};

const getStatusColorClasses = (status: ComplaintStatus) => {
    switch (status) {
        case 'Raised':
            return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
        case 'In Review':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300';
        case 'Resolved':
            return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
    }
};


const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState(complaintsData);
  const [activeTab, setActiveTab] = useState<ComplaintStatus | 'All'>('All');

  const handleStatusChange = (complaintId: number, newStatus: ComplaintStatus) => {
    // Update local state for immediate UI feedback
    const updatedComplaints = complaints.map(c =>
      c.id === complaintId ? { ...c, status: newStatus } : c
    );
    setComplaints(updatedComplaints);

    // Update the mock data source to persist changes
    const complaintInData = complaintsData.find(c => c.id === complaintId);
    if (complaintInData) {
      complaintInData.status = newStatus;
    }
  };
  
  const sortedAndFilteredComplaints = useMemo(() => {
    const sentimentPriority = { 'Urgent': 1, 'Frustrated': 2, 'Suggestion': 3 };

    const filtered = activeTab === 'All' 
        ? complaints 
        : complaints.filter(c => c.status === activeTab);
    
    return filtered.sort((a, b) => {
      const priorityA = sentimentPriority[a.sentiment];
      const priorityB = sentimentPriority[b.sentiment];
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  }, [activeTab, complaints]);

  const TabButton: React.FC<{label: ComplaintStatus | 'All'}> = ({label}) => (
    <button onClick={() => setActiveTab(label)} className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === label ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        {label}
    </button>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Complaints Management</h2>
      
      <div className="flex space-x-2 border-b dark:border-gray-700 mb-6">
        <TabButton label="All" />
        <TabButton label="Raised" />
        <TabButton label="In Review" />
        <TabButton label="Resolved" />
      </div>

      <div className="space-y-4">
        {sortedAndFilteredComplaints.length > 0 ? sortedAndFilteredComplaints.map(complaint => (
          <div key={complaint.id} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white">{complaint.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{complaint.details}</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Submitted by: <strong>{complaint.submittedBy} ({complaint.role})</strong> on {complaint.date}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <SentimentBadge sentiment={complaint.sentiment} />
                <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint.id, e.target.value as ComplaintStatus)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border-transparent focus:ring-2 focus:ring-primary appearance-none ${getStatusColorClasses(complaint.status)}`}
                >
                    <option value="Raised">Raised</option>
                    <option value="In Review">In Review</option>
                    <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        )) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No complaints in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Complaints;