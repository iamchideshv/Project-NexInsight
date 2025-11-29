import React, { useState } from 'react';
import { LostAndFoundItem } from '../../types';

type NewItemData = Omit<LostAndFoundItem, 'id' | 'status' | 'image' | 'claimedByEmail' | 'claimedByPhone'>;

interface ReportItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: NewItemData & { image: string | null }) => void;
}

const ReportItemModal: React.FC<ReportItemModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'Lost' | 'Found'>('Lost');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim() && location.trim()) {
      onConfirm({ name, type, description, location, date, image: imageData });
    } else {
      alert('Please fill in all fields.');
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Report an Item</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the details for the item you've lost or found.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Type</label>
            <div className="flex space-x-2 mt-1">
                <button type="button" onClick={() => setType('Lost')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${type === 'Lost' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Lost</button>
                <button type="button" onClick={() => setType('Found')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${type === 'Found' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Found</button>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary" required />
          </div>
           <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Image (Optional)</label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
          </div>
          {imageData && (
            <div className="mt-2">
              <img src={imageData} alt="Item preview" className="w-full h-32 object-cover rounded-lg" />
            </div>
          )}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary" required />
          </div>
           <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg" required />
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
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemModal;