import React, { useState, useEffect, useMemo, useRef } from 'react';
import { mockStudents } from '../../data/attendanceData';
import { Student } from '../../types';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon, SpinnerIcon } from '../icons/Icons';
import StudentProfileModal from './StudentProfileModal';
import BulkActionBar from './BulkActionBar';

type SortableKeys = 'name' | 'id' | 'department' | 'year';

const StudentList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayStudents, setDisplayStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    // Fix: Create a ref for the 'select all' checkbox to manage its indeterminate state
    const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            // 1. Filter
            const lowercasedQuery = searchQuery.toLowerCase();
            let results = searchQuery.trim() === ''
                ? [...mockStudents]
                : mockStudents.filter(student =>
                    student.name.toLowerCase().includes(lowercasedQuery) ||
                    student.id.toLowerCase().includes(lowercasedQuery)
                );

            // 2. Sort
            if (sortConfig !== null) {
                results.sort((a, b) => {
                    const valA = a[sortConfig.key];
                    const valB = b[sortConfig.key];

                    if (valA < valB) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (valA > valB) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            
            setDisplayStudents(results);
            setIsLoading(false);
        }, 300); // Simulate processing time

        return () => clearTimeout(timer);
    }, [searchQuery, sortConfig]);

    // Fix: Use useEffect to programmatically set the indeterminate property of the checkbox
    useEffect(() => {
        if (selectAllCheckboxRef.current) {
            selectAllCheckboxRef.current.indeterminate = selectedStudents.length > 0 && selectedStudents.length < displayStudents.length;
        }
    }, [selectedStudents, displayStudents]);

    const requestSort = (key: SortableKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleRowClick = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleSelect = (studentId: string) => {
        setSelectedStudents(prev => 
            prev.includes(studentId) 
                ? prev.filter(id => id !== studentId) 
                : [...prev, studentId]
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudents(displayStudents.map(s => s.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const SortableHeader: React.FC<{ label: string; columnKey: SortableKeys; className?: string; textClass?: string;}> = ({ label, columnKey, className, textClass }) => (
        <th className={`p-3 ${className}`}>
            <button onClick={() => requestSort(columnKey)} className={`flex items-center space-x-1 font-semibold uppercase text-xs ${textClass}`}>
                <span>{label}</span>
                {sortConfig?.key === columnKey && (
                    sortConfig.direction === 'asc' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />
                )}
            </button>
        </th>
    );

    return (
        <div className="pb-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Student Directory</h2>
            
            <div className="relative mb-6">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search students by name or ID..."
                    className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-700 border-transparent border rounded-lg focus:ring-primary focus:border-primary transition"
                />
            </div>

            <div className="overflow-x-auto max-h-[60vh]">
                <table className="w-full text-left table-auto">
                    <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700/80 backdrop-blur-sm z-10">
                        <tr className="text-gray-600 dark:text-gray-300">
                            <th className="p-3">
                                {/* Fix: Attach ref and remove invalid 'indeterminate' prop */}
                                <input 
                                    ref={selectAllCheckboxRef}
                                    type="checkbox" 
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    onChange={handleSelectAll}
                                    checked={selectedStudents.length === displayStudents.length && displayStudents.length > 0}
                                />
                            </th>
                            <SortableHeader label="Name" columnKey="name" />
                            <SortableHeader label="ID" columnKey="id" />
                            <SortableHeader label="Department" columnKey="department" className="hidden md:table-cell" />
                            <SortableHeader label="Year / Sec" columnKey="year" textClass="mx-auto" />
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-400">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center p-8">
                                    <div className="flex justify-center items-center text-gray-500 dark:text-gray-400">
                                        <SpinnerIcon className="w-6 h-6 mr-2" />
                                        <span>Loading students...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : displayStudents.length > 0 ? (
                            displayStudents.map((student, index) => (
                                <tr 
                                    key={student.id} 
                                    className={`border-b dark:border-gray-700 transition-colors duration-200 ${selectedStudents.includes(student.id) ? 'bg-primary/10' : (index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50')}`}
                                >
                                    <td className="p-3">
                                        <input 
                                            type="checkbox" 
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleSelect(student.id)}
                                        />
                                    </td>
                                    <td className="p-3 font-semibold text-gray-800 dark:text-white cursor-pointer" onClick={() => handleRowClick(student)}>{student.name}</td>
                                    <td className="p-3 font-mono cursor-pointer" onClick={() => handleRowClick(student)}>{student.id}</td>
                                    <td className="p-3 hidden md:table-cell cursor-pointer" onClick={() => handleRowClick(student)}>{student.department}</td>
                                    <td className="p-3 text-center cursor-pointer" onClick={() => handleRowClick(student)}>{student.year} / {student.section}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-8 text-gray-500 dark:text-gray-400">
                                    No students found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <StudentProfileModal 
                student={selectedStudent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {selectedStudents.length > 0 && (
                 <BulkActionBar 
                    selectedCount={selectedStudents.length}
                    onDeselectAll={() => setSelectedStudents([])}
                    onDownload={() => alert(`Downloading reports for ${selectedStudents.length} students.`)}
                    onNotify={() => alert(`Opening notification composer for ${selectedStudents.length} students.`)}
                    onReleaseMarks={() => alert(`Releasing marks for ${selectedStudents.length} students.`)}
                />
            )}
        </div>
    );
};

export default StudentList;