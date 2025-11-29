import React from 'react';
import { PencilIcon } from '../icons/Icons';

interface EditableProfileCardProps {
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const EditableProfileCard: React.FC<EditableProfileCardProps> = ({ title, isEditing, onToggleEdit, onSave, onCancel, children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-lg text-gray-800 dark:text-white">{title}</h4>
        {!isEditing && (
          <button onClick={onToggleEdit} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition">
            <PencilIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        {children}
      </div>
      {isEditing && (
        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableProfileCard;
