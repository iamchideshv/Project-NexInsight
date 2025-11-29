import React from 'react';
import { FacultyMember } from '../../types';
import { PaperAirplaneIcon, XMarkIcon } from '../icons/Icons';

interface FacultyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  faculty: FacultyMember | null;
}

const FacultyProfileModal: React.FC<FacultyProfileModalProps> = ({ isOpen, onClose, faculty }) => {
  if (!isOpen || !faculty) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm transform animate-zoom-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={faculty.photoUrl} alt={`Profile of ${faculty.name}`} className="w-full h-48 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{faculty.name}</h2>
          <p className="text-primary font-semibold mt-1">{faculty.designation}</p>
          
          <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-2 text-sm">
            <p><strong className="text-gray-500 dark:text-gray-400">Qualification:</strong> <span className="text-gray-700 dark:text-gray-300">{faculty.qualification}</span></p>
            <p><strong className="text-gray-500 dark:text-gray-400">Specialization:</strong> <span className="text-gray-700 dark:text-gray-300">{faculty.specialization}</span></p>
          </div>
          
          <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-2 text-sm">
             <p><strong className="text-gray-500 dark:text-gray-400">Email:</strong> <a href={`mailto:${faculty.email}`} className="text-primary hover:underline">{faculty.email}</a></p>
             {faculty.phone && <p><strong className="text-gray-500 dark:text-gray-400">Phone:</strong> <a href={`tel:${faculty.phone}`} className="text-primary hover:underline">{faculty.phone}</a></p>}
          </div>

          <a
            href={`mailto:${faculty.email}`}
            className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-transform transform hover:scale-105"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfileModal;
