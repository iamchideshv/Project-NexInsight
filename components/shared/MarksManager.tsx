import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { marksData as initialMarksData } from '../../data/marksData';
import { mockStudents } from '../../data/attendanceData';
import { subjects } from '../../data/subjects';
import { SearchIcon, PlusCircleIcon, DocumentArrowUpIcon, ArrowDownTrayIcon, SparklesIcon, ChartBarIcon, PencilSquareIcon, SpinnerIcon, ArrowUpIcon, ArrowDownIcon, ExclamationTriangleIcon } from '../icons/Icons';
import { MarksRecord, Student } from '../../types';
import ToggleSwitch from './ToggleSwitch';
import Toast from './Toast';

type StudentWithMarks = Student & {
    cat1: number | null;
    cat2: number | null;
    internal: number | null;
    avg: number | null;
    result: 'Pass' | 'Fail' | null;
};
type SortableKeys = 'name' | 'id' | 'avg';

// Main Component
const MarksManager: React.FC = () => {
    const [marksData, setMarksData] = useState<MarksRecord[]>(initialMarksData);
    const [displayData, setDisplayData] = useState<StudentWithMarks[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<StudentWithMarks | null>(null);
    const [isMobileFormVisible, setMobileFormVisible] = useState(false);
    const [showOnlyFailed, setShowOnlyFailed] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

    const [filters, setFilters] = useState({
        department: 'AI & DS',
        year: '3',
        section: 'A',
        subject: 'AI'
    });

    useEffect(() => {
        // 1. Filter students from mock data
        const studentsInClass = mockStudents.filter(student =>
            student.department.includes(filters.department) &&
            student.year.toString() === filters.year &&
            student.section === filters.section &&
            (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             student.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // 2. Join with marks and calculate results
        const studentsWithMarks: StudentWithMarks[] = studentsInClass.map(student => {
            const mark = marksData.find(m => m.studentId === student.id && m.subjectCode === filters.subject);
            const cat1 = mark?.cat1 ?? null;
            const cat2 = mark?.cat2 ?? null;
            const internal = mark?.internal ?? null;
            
            const avg = (cat1 !== null && cat2 !== null && internal !== null) 
                ? (cat1 + cat2 + internal) / 3 
                : null;
                
            const result = (avg !== null) ? (avg >= 40 ? 'Pass' : 'Fail') : null;
            
            return { ...student, cat1, cat2, internal, avg, result };
        });

        // 3. Apply "Show only failed" filter
        let finalResults = showOnlyFailed 
            ? studentsWithMarks.filter(s => s.result === 'Fail')
            : studentsWithMarks;
        
        // 4. Apply sorting
        finalResults.sort((a, b) => {
            const valA = a[sortConfig.key];
            const valB = b[sortConfig.key];
            if (valA === null) return 1;
            if (valB === null) return -1;
            
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        setDisplayData(finalResults);
        setSelectedStudent(null); // Deselect student on filter change
    }, [searchQuery, filters, marksData, showOnlyFailed, sortConfig]);

    const handleSelectStudent = (student: StudentWithMarks) => {
        setSelectedStudent(student);
        if (window.innerWidth < 1024) { setMobileFormVisible(true); }
    };
    
    const requestSort = (key: SortableKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Marks Manager</h2>
            <FilterCard filters={filters} setFilters={setFilters} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <StudentMarksTable 
                    students={displayData} 
                    selectedStudent={selectedStudent} 
                    onSelectStudent={handleSelectStudent} 
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    showOnlyFailed={showOnlyFailed}
                    setShowOnlyFailed={setShowOnlyFailed}
                />
                <div className="hidden lg:block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <MarksEntryPanel student={selectedStudent} subject={filters.subject} marksData={marksData} setMarksData={setMarksData} />
                </div>
            </div>
            {!isMobileFormVisible && (
                 <button onClick={() => setMobileFormVisible(true)} className="lg:hidden fixed bottom-20 right-5 bg-primary text-white p-4 rounded-full shadow-lg z-30 transform hover:scale-110 transition-transform">
                    <PlusCircleIcon className="w-8 h-8"/>
                 </button>
            )}
            {isMobileFormVisible && (
                <div className="lg:hidden fixed inset-0 bg-gray-100 dark:bg-gray-900 z-40 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-10">
                        <button onClick={() => { setMobileFormVisible(false); setSelectedStudent(null); }} className="font-semibold text-primary">&larr; Back to List</button>
                    </div>
                    <div className="p-4">
                        <MarksEntryPanel student={selectedStudent} subject={filters.subject} marksData={marksData} setMarksData={setMarksData} />
                    </div>
                </div>
            )}
        </div>
    );
};

// Sub-components
const FilterCard: React.FC<any> = ({ filters, setFilters, searchQuery, setSearchQuery }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg space-y-4">
            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search student by name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-primary focus:border-primary transition" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <select name="department" value={filters.department} onChange={handleFilterChange} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm w-full"><option>AI & DS</option><option>CSE</option></select>
                <select name="year" value={filters.year} onChange={handleFilterChange} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm w-full"><option>3</option><option>4</option></select>
                <select name="section" value={filters.section} onChange={handleFilterChange} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm w-full"><option>A</option><option>B</option></select>
                <select name="subject" value={filters.subject} onChange={handleFilterChange} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm w-full">{subjects.map(s => <option key={s.code} value={s.code}>{s.code}</option>)}</select>
            </div>
        </div>
    );
};

const StudentMarksTable: React.FC<any> = ({ students, selectedStudent, onSelectStudent, sortConfig, requestSort, showOnlyFailed, setShowOnlyFailed }) => {
    const analytics = useMemo(() => {
        const studentsWithResults = students.filter((s: StudentWithMarks) => s.result !== null);
        if (studentsWithResults.length === 0) return { classAvg: 0, passCount: 0, failCount: 0 };
        const totalAvg = studentsWithResults.reduce((sum: number, s: StudentWithMarks) => sum + (s.avg || 0), 0);
        const passCount = studentsWithResults.filter((s: StudentWithMarks) => s.result === 'Pass').length;
        return {
            classAvg: totalAvg / studentsWithResults.length,
            passCount,
            failCount: studentsWithResults.length - passCount
        };
    }, [students]);

    const SortableHeader: React.FC<{ label: string; columnKey: SortableKeys; className?: string; }> = ({ label, columnKey, className }) => (
        <th className={`p-3 text-xs uppercase text-gray-500 dark:text-gray-400 ${className}`}>
            <button onClick={() => requestSort(columnKey)} className="flex items-center space-x-1 font-semibold">
                <span>{label}</span>
                {sortConfig?.key === columnKey && (sortConfig.direction === 'asc' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />)}
            </button>
        </th>
    );

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
            <SummaryCards analytics={analytics} />
            <div className="flex justify-end my-2">
                <ToggleSwitch enabled={showOnlyFailed} onChange={setShowOnlyFailed} label="Show only failed students" />
            </div>
            <div className="overflow-auto max-h-[60vh]">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm z-10">
                        <tr className="border-b dark:border-gray-700">
                            <SortableHeader label="Name / ID" columnKey="name" />
                            <th className="p-3 text-xs uppercase text-gray-500 dark:text-gray-400 text-center">CAT1</th>
                            <th className="p-3 text-xs uppercase text-gray-500 dark:text-gray-400 text-center">CAT2</th>
                            <th className="p-3 text-xs uppercase text-gray-500 dark:text-gray-400 text-center">Int</th>
                            <SortableHeader label="Avg" columnKey="avg" className="text-center" />
                            <th className="p-3 text-xs uppercase text-gray-500 dark:text-gray-400 text-center">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map((s: StudentWithMarks) => (
                            <tr key={s.id} onClick={() => onSelectStudent(s)} className={`cursor-pointer transition-colors border-b dark:border-gray-700/50 hover:bg-primary/5 ${selectedStudent?.id === s.id ? 'bg-primary/10' : ''}`}>
                                <td className="p-3 font-medium text-gray-800 dark:text-white">{s.name}<br/><span className="font-mono text-xs text-gray-500">{s.id}</span></td>
                                <td className="p-3 text-center font-mono">{s.cat1 ?? '-'}</td>
                                <td className="p-3 text-center font-mono">{s.cat2 ?? '-'}</td>
                                <td className="p-3 text-center font-mono">{s.internal ?? '-'}</td>
                                <td className="p-3 text-center font-semibold">{s.avg?.toFixed(1) ?? '-'}</td>
                                <td className="p-3 text-center font-bold text-xs">
                                    {s.result && <span className={`px-2 py-1 rounded-full ${s.result === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.result}</span>}
                                    {!s.result && '-'}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="text-center p-8 text-gray-500">No results found for the selected filters.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SummaryCards: React.FC<{ analytics: { classAvg: number, passCount: number, failCount: number } }> = ({ analytics }) => (
    <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-lg text-center">
            <div className="text-xs text-primary/80">Class Avg</div>
            <div className="text-xl font-bold text-primary">{analytics.classAvg.toFixed(1)}</div>
        </div>
        <div className="bg-green-500/10 p-2 rounded-lg text-center">
            <div className="text-xs text-green-500/80">Passed</div>
            <div className="text-xl font-bold text-green-500">{analytics.passCount}</div>
        </div>
        <div className="bg-red-500/10 p-2 rounded-lg text-center">
            <div className="text-xs text-red-500/80">Failed</div>
            <div className="text-xl font-bold text-red-500">{analytics.failCount}</div>
        </div>
    </div>
);


const MarksEntryPanel: React.FC<{ student: StudentWithMarks | null, subject: string, marksData: MarksRecord[], setMarksData: Function }> = ({ student, subject, marksData, setMarksData }) => {
    const [formState, setFormState] = useState({ cat1: '', cat2: '', internal: '', attendance: '', remarks: '' });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        if (student) {
            setFormState({
                cat1: student.cat1?.toString() || '',
                cat2: student.cat2?.toString() || '',
                internal: student.internal?.toString() || '',
                attendance: marksData.find(m => m.studentId === student.id)?.attendancePercentage?.toString() || '',
                remarks: marksData.find(m => m.studentId === student.id)?.remarks || ''
            });
            setAiSuggestion('');
        } else {
            setFormState({ cat1: '', cat2: '', internal: '', attendance: '', remarks: '' });
            setAiSuggestion('');
        }
    }, [student, subject, marksData]);

    const handleSave = (status: 'Draft' | 'Published') => {
        if (!student) {
            setToast({ message: 'Please select a student first.', type: 'error' });
            return;
        }
        
        const newRecord: MarksRecord = {
            studentId: student.id,
            subjectCode: subject,
            cat1: parseInt(formState.cat1) || 0,
            cat2: parseInt(formState.cat2) || 0,
            internal: parseInt(formState.internal) || 0,
            maxMarks: 50,
            attendancePercentage: parseInt(formState.attendance) || 0,
            remarks: formState.remarks,
            status
        };

        const existingIndex = marksData.findIndex(m => m.studentId === student.id && m.subjectCode === subject);
        let updatedMarks;
        if (existingIndex > -1) {
            updatedMarks = [...marksData];
            updatedMarks[existingIndex] = newRecord;
        } else {
            updatedMarks = [...marksData, newRecord];
        }
        setMarksData(updatedMarks);
        setToast({ message: `Marks for ${student.name} saved as ${status}.`, type: 'success' });
    };
    
    const handleGetAiSuggestion = async () => {
        if (!formState.cat1 || !formState.cat2) {
            setToast({ message: 'CAT 1 and CAT 2 marks are needed for AI suggestion.', type: 'error' });
            return;
        }
        setIsAiLoading(true);
        setAiSuggestion('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const subjectName = subjects.find(s => s.code === subject)?.name || subject;
            const prompt = `A student in the subject '${subjectName}' scored ${formState.cat1}/50 in CAT-1 and ${formState.cat2}/50 in CAT-2. Based on these scores, what are the likely weak topics or concepts this student might be struggling with? Provide 2-3 bullet points of potential weak areas. Keep the response concise and actionable.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setAiSuggestion(response.text);
        } catch (error) {
            console.error("Gemini API call failed", error);
            setToast({ message: 'Failed to get AI suggestion.', type: 'error' });
        }
        setIsAiLoading(false);
    };

    if (!student) return <div className="flex flex-col items-center justify-center h-full text-center py-20 text-gray-500"><PencilSquareIcon className="w-12 h-12 mb-4 text-gray-400" /><p>Select a student from the list to enter or view marks.</p></div>;

    const { avg, result } = student;
    
    return (
        <div className="space-y-4">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <h3 className="text-lg font-bold">Editing Marks for: <span className="text-primary">{student.name}</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div><label className="text-xs text-gray-500">CAT 1</label><input type="number" max="50" value={formState.cat1} onChange={e => setFormState({...formState, cat1: e.target.value})} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-center" /></div>
                <div><label className="text-xs text-gray-500">CAT 2</label><input type="number" max="50" value={formState.cat2} onChange={e => setFormState({...formState, cat2: e.target.value})} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-center" /></div>
                <div><label className="text-xs text-gray-500">Internal</label><input type="number" max="50" value={formState.internal} onChange={e => setFormState({...formState, internal: e.target.value})} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-center" /></div>
                <div><label className="text-xs text-gray-500">Attendance %</label><input type="number" max="100" value={formState.attendance} onChange={e => setFormState({...formState, attendance: e.target.value})} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-center" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                <div><div className="text-xs text-gray-500">Average</div><div className="font-bold text-lg">{avg?.toFixed(1) ?? '-'}</div></div>
                <div><div className="text-xs text-gray-500">Result</div><div className={`font-bold text-lg ${result === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>{result ?? '-'}</div></div>
            </div>
            <div><label className="text-xs text-gray-500">Remarks</label><textarea value={formState.remarks} onChange={e => setFormState({...formState, remarks: e.target.value})} rows={2} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg"></textarea></div>
            <div className="bg-primary/5 dark:bg-primary/20 p-4 rounded-lg space-y-2">
                <button onClick={handleGetAiSuggestion} disabled={isAiLoading} className="flex items-center space-x-2 font-semibold text-primary text-sm disabled:opacity-50">
                    <SparklesIcon className="w-5 h-5"/>
                    <span>Get AI Suggestion</span>
                </button>
                {isAiLoading && <div className="flex items-center text-sm text-gray-500"><SpinnerIcon className="w-4 h-4 mr-2" /><span>Analyzing marks...</span></div>}
                {aiSuggestion && <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{aiSuggestion}</div>}
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t dark:border-gray-700">
                <button onClick={() => handleSave('Draft')} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg text-sm">Save Draft</button>
                <button onClick={() => handleSave('Published')} className="flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-lg text-sm">Publish Marks</button>
            </div>
        </div>
    );
};

export default MarksManager;