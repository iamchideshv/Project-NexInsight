import React, { useState } from 'react';
import { UserIcon } from '../icons/Icons';
import EditableProfileCard from '../shared/EditableProfileCard';
import Toast from '../shared/Toast';

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [profileData, setProfileData] = useState({
    email: 'admin@nexinsight.edu',
    phone: '(123) 456-7890',
  });

  const [formData, setFormData] = useState(profileData);

  const handleToggleEdit = () => {
    setIsEditing(true);
    setFormData(profileData); // Ensure form starts with current data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // No need to reset form data, as it will be reset on next edit toggle
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    setToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Profile</h2>
      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Harish</h3>
          <p className="text-gray-500 dark:text-gray-400">Administrator</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditableProfileCard
          title="Contact Information"
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        >
          {isEditing ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email:</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-600 border-transparent rounded-lg focus:ring-primary focus:border-primary transition" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone:</label>
                <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-600 border-transparent rounded-lg focus:ring-primary focus:border-primary transition" />
              </div>
            </>
          ) : (
            <>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
            </>
          )}
        </EditableProfileCard>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Professional Details</h4>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>Qualification:</strong> M.Tech in Computer Science</p>
            <p><strong>Experience:</strong> 5 Years</p>
            <p><strong>Date of Joining:</strong> 15 June 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;