
import React, { useState } from 'react';

const Notifications: React.FC = () => {
  const [recipient, setRecipient] = useState('III-A');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
        alert("Message cannot be empty.");
        return;
    }
    alert(`Notification sent to ${recipient}: "${message}"`);
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Send Notification</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Compose and send notifications to your classes.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient</label>
          <select 
            id="recipient" 
            value={recipient} 
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
          >
            <option value="III-A">III Year - Section A</option>
            <option value="III-B">III Year - Section B</option>
            <option value="ALL">All my classes</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea 
            id="message" 
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
            placeholder="e.g., The deadline for the AI lab assignment has been extended..."
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
