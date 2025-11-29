import React, { useMemo } from 'react';
import { Student } from '../../types';
import AttendanceView from './AttendanceView';
import { UserIcon } from '../icons/Icons';
import { marksData } from '../../data/marksData';
import { subjects } from '../../data/subjects';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ isOpen, onClose, student }) => {
  const studentMarks = useMemo(() => {
    if (!student) return [];
    return marksData
      .filter(mark => mark.studentId === student.id)
      .map(mark => {
        const subjectInfo = subjects.find(s => s.code === mark.subjectCode);
        const total = mark.cat1 + mark.cat2 + mark.internal;
        const maxTotal = mark.maxMarks * 3;
        const percentage = (total / maxTotal) * 100;
        return {
          ...mark,
          subjectName: subjectInfo?.name || mark.subjectCode,
          total,
          percentage,
          status: percentage >= 50 ? 'PASS' : 'FAIL',
        };
      });
  }, [student]);

  if (!isOpen || !student) return null;
  
  const studentEmail = `${student.id.toLowerCase()}@nexinsight.edu`;
  const studentPhone = `+91 98765 ${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 z-10 border-b dark:border-gray-700">
             <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{student.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-mono">{student.id}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
       
        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Details</h3>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p><strong>Department:</strong> {student.department}</p>
                        <p><strong>Year/Section:</strong> {student.year} / {student.section}</p>
                        <p><strong>Email:</strong> {studentEmail}</p>
                        <p><strong>Phone:</strong> {studentPhone}</p>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Academic History</h3>
                    <div className="overflow-x-auto max-h-32">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-500 dark:text-gray-400"><tr className="border-b dark:border-gray-600"><th className="py-1 text-left">Subject</th><th className="py-1 text-right">Total</th><th className="py-1 text-right">Status</th></tr></thead>
                            <tbody className="text-gray-700 dark:text-gray-300">
                                {studentMarks.map(mark => (
                                    <tr key={mark.subjectCode}><td className="py-1">{mark.subjectName}</td><td className="py-1 text-right font-semibold">{mark.total}</td><td className={`py-1 text-right font-bold ${mark.status === 'PASS' ? 'text-green-500' : 'text-red-500'}`}>{mark.status}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Attendance Summary</h3>
                <AttendanceView studentId={student.id} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;
