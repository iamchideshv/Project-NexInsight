import React, { useState } from 'react';
import { LostAndFoundItem } from '../../types';

interface ClaimVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { email: string; phone: string }) => void;
  item: LostAndFoundItem;
}

const ClaimVerificationModal: React.FC<ClaimVerificationModalProps> = ({ isOpen, onClose, onConfirm, item }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && phone.trim()) {
      onConfirm({ email, phone });
    } else {
      alert('Please fill in both fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md m-4 transform animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Claim Verification</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You are claiming the item: <strong className="text-primary">{item.name}</strong>.
          Please provide your contact details for verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email ID
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
              placeholder="98765 43210"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition"
            >
              Confirm Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimVerificationModal;
