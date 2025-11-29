import React, { useState } from 'react';
import { mockStudents } from '../../data/attendanceData';
import AttendanceView from '../shared/AttendanceView';
import { SearchIcon } from '../icons/Icons';

const StudentAttendance: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStudentId, setSearchedStudentId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSearchedStudentId(null);

        const foundStudent = mockStudents.find(student => student.id.toLowerCase() === searchQuery.toLowerCase());
        
        if (foundStudent) {
            setSearchedStudentId(foundStudent.id);
        } else {
            setError(`No student found with ID: ${searchQuery}`);
        }
    };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Student Attendance Report</h2>
      
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Student ID (e.g., 22AIDS050)"
            className="flex-grow p-3 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition"
        />
        <button type="submit" className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            <SearchIcon className="w-6 h-6" />
        </button>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {searchedStudentId ? (
        <div className="mt-6 animate-fade-in">
            <AttendanceView studentId={searchedStudentId} />
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">Enter a student ID to view their detailed attendance report.</p>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
