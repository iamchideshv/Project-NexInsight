import React, { useState, useEffect, useMemo } from 'react';
import { mockStudents } from '../../data/attendanceData';
import { subjects } from '../../data/subjects';
import { Student } from '../../types';
import { UserIcon, XMarkIcon, ExclamationTriangleIcon } from '../icons/Icons';
import Toast from '../shared/Toast';

const MarkAttendance: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState('III-A');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
    const [selectedSubject, setSelectedSubject] = useState('AI');
    const [absenteeInput, setAbsenteeInput] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [confirmationData, setConfirmationData] = useState<{
        absentees: Student[];
        presents: Student[];
        invalidIds: string[];
    } | null>(null);

    const studentsInClass = useMemo(() => {
        const [year, section] = selectedClass.split('-');
        const yearNum = year === 'III' ? 3 : 4; // Simple mapping
        return mockStudents.filter(s => s.year === yearNum && s.section === section);
    }, [selectedClass]);

    const handleMarkAndSubmit = () => {
        if (!absenteeInput.trim()) {
            // If input is empty, confirm if all are present
            if (confirm("No absentees entered. Do you want to mark all students as present?")) {
                 setConfirmationData({ absentees: [], presents: studentsInClass, invalidIds: [] });
            }
            return;
        }

        const absenteeIds = absenteeInput
            .split(/[\s,]+/) // Split by spaces, commas, or newlines
            .map(id => id.trim().toUpperCase())
            .filter(id => id.length > 0);
        
        const uniqueAbsenteeIds = [...new Set(absenteeIds)];

        const absentees = studentsInClass.filter(student => uniqueAbsenteeIds.includes(student.id.toUpperCase()));
        const presents = studentsInClass.filter(student => !uniqueAbsenteeIds.includes(student.id.toUpperCase()));
        const invalidIds = uniqueAbsenteeIds.filter(id => !studentsInClass.some(s => s.id.toUpperCase() === id));
        
        setConfirmationData({ absentees, presents, invalidIds });
    };

    const handleConfirmSubmit = () => {
        if (!confirmationData) return;
        
        const totalMarked = confirmationData.absentees.length + confirmationData.presents.length;

        // Here you would typically send the data to a backend
        console.log("Submitting attendance:", {
            class: selectedClass,
            date: selectedDate,
            subject: selectedSubject,
            absentees: confirmationData.absentees.map(s => s.id),
            presents: confirmationData.presents.map(s => s.id),
        });

        setToast({ message: `Attendance for ${totalMarked} students submitted!`, type: 'success' });
        setConfirmationData(null);
        setAbsenteeInput('');
    };
    
    if (confirmationData) {
        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Confirm Attendance</h2>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                    <p><strong>Class:</strong> {selectedClass} | <strong>Subject:</strong> {selectedSubject} | <strong>Date:</strong> {selectedDate}</p>
                </div>

                {confirmationData.invalidIds.length > 0 && (
                     <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-lg mb-4">
                        <div className="flex items-center space-x-3">
                            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-300"/>
                            <div>
                                <h4 className="font-bold text-red-700 dark:text-red-200">Invalid Roll Numbers</h4>
                                <p className="text-sm text-red-600 dark:text-red-300">These IDs were not found in the class list: <span className="font-mono">{confirmationData.invalidIds.join(', ')}</span></p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Absentees */}
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <h3 className="font-bold text-red-600 dark:text-red-300 mb-2">Marked as Absent ({confirmationData.absentees.length})</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {confirmationData.absentees.map(s => <StudentChip key={s.id} student={s} />)}
                        </div>
                    </div>
                    {/* Presents */}
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h3 className="font-bold text-green-600 dark:text-green-300 mb-2">Marked as Present ({confirmationData.presents.length})</h3>
                         <div className="space-y-2 max-h-60 overflow-y-auto">
                            {confirmationData.presents.map(s => <StudentChip key={s.id} student={s} />)}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setConfirmationData(null)} className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                        Edit
                    </button>
                    <button onClick={handleConfirmSubmit} className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition transform hover:scale-105">
                        Confirm & Submit
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Mark Attendance (AI Assisted)</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Focus only on who's missing. Enter absentee roll numbers to mark them, and the system will mark everyone else as present.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <option value="III-A">III Year - Section A</option>
                    <option value="III-B">III Year - Section B</option>
                </select>
                <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {subjects.map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}
                </select>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700" />
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <label htmlFor="absentee-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter Absentee Roll Numbers
                </label>
                <textarea
                    id="absentee-input"
                    rows={8}
                    value={absenteeInput}
                    onChange={e => setAbsenteeInput(e.target.value)}
                    className="w-full p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 border rounded-lg focus:ring-primary focus:border-primary transition font-mono"
                    placeholder="Enter roll numbers separated by commas, spaces, or new lines. e.g., 22AIDS003, 22AIDS005"
                />
            </div>
            
            <div className="mt-6 text-right">
                <button onClick={handleMarkAndSubmit} className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition transform hover:scale-105">
                    Mark & Submit Attendance
                </button>
            </div>
        </div>
    );
};


const StudentChip: React.FC<{ student: Student }> = ({ student }) => (
    <div className="bg-white dark:bg-gray-700 p-2 rounded-md flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-700 dark:text-gray-200">{student.name}</span>
        <span className="font-mono text-gray-500 dark:text-gray-400 text-xs">{student.id}</span>
    </div>
);


export default MarkAttendance;