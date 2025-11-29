import React, { useState } from 'react';
import { facultyData } from '../../data/facultyData';
import { FacultyMember } from '../../types';
import FacultyProfileModal from './FacultyProfileModal';

const FacultyCard: React.FC<{ faculty: FacultyMember, onClick: () => void }> = ({ faculty, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden cursor-pointer">
    <img src={faculty.photoUrl} alt={`Profile of ${faculty.name}`} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{faculty.name}</h3>
        <p className="text-primary font-semibold mt-1">{faculty.designation}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex-grow">{faculty.specialization}</p>
      </div>
      <div className="border-t dark:border-gray-700 mt-4 pt-4">
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><strong>Qualification:</strong> {faculty.qualification}</p>
          <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`} onClick={(e) => e.stopPropagation()} className="hover:underline">{faculty.email}</a></p>
          {faculty.phone && <p><strong>Phone:</strong> <a href={`tel:${faculty.phone}`} onClick={(e) => e.stopPropagation()} className="hover:underline">{faculty.phone}</a></p>}
        </div>
      </div>
    </div>
  </div>
);

const FacultyList: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (faculty: FacultyMember) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Faculty Directory</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Meet the dedicated faculty of the Artificial Intelligence and Data Science department.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyData.map(faculty => (
          <FacultyCard key={faculty.email} faculty={faculty} onClick={() => handleCardClick(faculty)} />
        ))}
      </div>
      
      <FacultyProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        faculty={selectedFaculty}
      />
    </div>
  );
};

export default FacultyList;