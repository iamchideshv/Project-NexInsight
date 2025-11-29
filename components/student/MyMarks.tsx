import React, { useState, useEffect } from 'react';
import { marksData } from '../../data/marksData';
import { subjects } from '../../data/subjects';
import { InformationCircleIcon } from '../icons/Icons';
import ProgressBar from '../shared/ProgressBar';
import { MarksRecord } from '../../types';

// Mock the logged-in student's ID
const LOGGED_IN_STUDENT_ID = '22AIDS050';

const SubjectMarkCard: React.FC<{ mark: MarksRecord }> = ({ mark }) => {
    const subject = subjects.find(s => s.code === mark.subjectCode);
    const totalMarks = mark.cat1 + mark.cat2 + mark.internal;
    const maxTotalMarks = mark.maxMarks * 3;
    const percentage = (totalMarks / maxTotalMarks) * 100;
    const result = percentage >= 50 ? 'PASS' : 'FAIL';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{subject?.name || mark.subjectCode}</h3>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${result === 'PASS' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                    {result}
                </span>
            </div>
            
            <div className="space-y-3 mt-4 flex-grow">
                <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">CAT 1 Marks</span><span className="font-semibold text-gray-700 dark:text-gray-300">{mark.cat1} / {mark.maxMarks}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">CAT 2 Marks</span><span className="font-semibold text-gray-700 dark:text-gray-300">{mark.cat2} / {mark.maxMarks}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Internal Marks</span><span className="font-semibold text-gray-700 dark:text-gray-300">{mark.internal} / {mark.maxMarks}</span></div>
            </div>

            <div className="pt-4 mt-4 border-t dark:border-gray-700">
                <ProgressBar percentage={percentage} />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Total: {totalMarks} / {maxTotalMarks}</span>
                    <span>{percentage.toFixed(1)}%</span>
                </div>
            </div>

            <div className="text-center mt-4 pt-4 border-t dark:border-gray-700">
                <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200">
                    View Feedback
                </button>
            </div>
        </div>
    );
};


const MyMarks: React.FC = () => {
    const [myMarks, setMyMarks] = useState<MarksRecord[]>([]);
    const [marksReleased, setMarksReleased] = useState(true);

    useEffect(() => {
        const studentMarks = marksData.filter(mark => mark.studentId === LOGGED_IN_STUDENT_ID);
        setMyMarks(studentMarks);
    }, []);

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Marks</h2>
            
            {marksReleased ? (
                myMarks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myMarks.map(mark => (
                            <SubjectMarkCard key={mark.subjectCode} mark={mark} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
                        <InformationCircleIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">No Marks Recorded</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Your marks have not been recorded yet. Please check back later.</p>
                    </div>
                )
            ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
                    <InformationCircleIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Marks Not Released Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Marks not released yet. Please check after the scheduled date.</p>
                </div>
            )}
        </div>
    );
};

export default MyMarks;
