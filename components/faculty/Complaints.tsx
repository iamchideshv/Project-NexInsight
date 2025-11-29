
import React, { useState } from 'react';
import { complaintsData } from '../../data/complaintsData';
import { Complaint, ComplaintStatus, Sentiment } from '../../types';
import Toast from '../shared/Toast';

// Mock logged-in faculty to be consistent with the dashboard
const LOGGED_IN_FACULTY = "Mrs. M. Parvathi";

// Helper to guess sentiment based on keywords
const analyzeSentiment = (text: string): Sentiment => {
    const lowerText = text.toLowerCase();
    if (/\b(urgent|asap|emergency|immediately|critical|immediately)\b/.test(lowerText)) {
        return 'Urgent';
    }
    if (/\b(angry|terrible|awful|disappointed|frustrated|broken|not working|bad)\b/.test(lowerText)) {
        return 'Frustrated';
    }
    return 'Suggestion';
};

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

const StatusBadge: React.FC<{ status: ComplaintStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case 'Raised':
      return <span className={`${baseClasses} bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200`}>Raised</span>;
    case 'In Review':
      return <span className={`${baseClasses} bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300`}>In Review</span>;
    case 'Resolved':
      return <span className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`}>Resolved</span>;
    default:
      return null;
  }
};

const Complaints: React.FC = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [myComplaints, setMyComplaints] = useState(complaintsData.filter(c => c.submittedBy === LOGGED_IN_FACULTY));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title.trim() || !details.trim()) {
        setToast({ message: "Please fill out all fields.", type: 'error' });
        return;
    }

    const sentiment = analyzeSentiment(title + ' ' + details);

    const newComplaint: Complaint = {
        id: complaintsData.length + 1,
        title,
        details,
        submittedBy: LOGGED_IN_FACULTY,
        role: 'Faculty',
        date: new Date().toISOString().split('T')[0],
        status: 'Raised',
        sentiment,
    };

    complaintsData.unshift(newComplaint);
    setMyComplaints(prev => [newComplaint, ...prev]);
    
    setToast({ message: `Complaint submitted and categorized as "${sentiment}".`, type: 'success' });
    setTitle('');
    setDetails('');
  };


  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Submit a Complaint</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Have an issue? Let us know.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-8">
         <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Complaint Title</label>
          <input 
            id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="e.g., Broken projector in Hall-B" required
          />
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Details</label>
          <textarea 
            id="details" rows={4} value={details} onChange={(e) => setDetails(e.target.value)}
            className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="Provide more information about the issue. Use words like 'urgent' or 'broken' for faster response." required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
            Submit
          </button>
        </div>
      </form>

      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">My Submitted Complaints</h3>
      <div className="space-y-4">
        {myComplaints.length > 0 ? myComplaints.map(complaint => (
          <div key={complaint.id} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{complaint.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{complaint.details}</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Submitted on {complaint.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <SentimentBadge sentiment={complaint.sentiment} />
                <StatusBadge status={complaint.status} />
              </div>
            </div>
          </div>
        )) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">You have not submitted any complaints yet.</p>
        )}
      </div>
    </div>
  );
};

export default Complaints;
