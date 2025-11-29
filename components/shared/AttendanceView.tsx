import React, { useState, useMemo } from 'react';
import { attendanceRecords, mockStudents } from '../../data/attendanceData';
import { subjects } from '../../data/subjects';
import SimpleBarChart from '../charts/SimpleBarChart';
import PieChart from '../charts/PieChart';
import { Student } from '../../types';

type FilterType = 'week' | 'month' | 'year';

const AttendanceView: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [filter, setFilter] = useState<FilterType>('week');
  const student = mockStudents.find(s => s.id === studentId);

  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    switch (filter) {
      case 'week':
        startDate.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }
    startDate.setHours(0, 0, 0, 0);

    return attendanceRecords.filter(
      record => record.studentId === studentId && new Date(record.date) >= startDate
    );
  }, [filter, studentId]);

  const summary = useMemo(() => {
    const presentCount = filteredData.filter(r => r.status === 'Present').length;
    const absentCount = filteredData.filter(r => r.status === 'Absent').length;
    
    // For demonstration, let's assume some absent days were 'On Leave'
    const onLeaveCount = Math.floor(absentCount * 0.15); // 15% of absences are 'On Leave'
    const actualAbsentCount = absentCount - onLeaveCount;

    const total = presentCount + absentCount; // Total is based on original data
    const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;
    
    return { present: presentCount, absent: actualAbsentCount, onLeave: onLeaveCount, total, percentage };
  }, [filteredData]);
  
  const subjectWiseStats = useMemo(() => {
    const stats: { [code: string]: { present: number, total: number } } = {};
    subjects.forEach(s => stats[s.code] = { present: 0, total: 0 });

    filteredData.forEach(record => {
        if(stats[record.subjectCode]) {
            stats[record.subjectCode].total++;
            if (record.status === 'Present') {
                stats[record.subjectCode].present++;
            }
        }
    });
    
    return Object.entries(stats)
        .map(([code, data]) => {
            const subject = subjects.find(s => s.code === code);
            return {
                code,
                name: subject?.name || code,
                percentage: data.total > 0 ? (data.present / data.total) * 100 : 0
            };
        })
        .filter(s => s.percentage > 0); // Only show subjects with attendance in the period
  }, [filteredData]);

  const FilterButton: React.FC<{ type: FilterType; label: string }> = ({ type, label }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${filter === type ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
    >
      {label}
    </button>
  );

  if (!student) {
    return <p>Student not found.</p>;
  }

  return (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Report for: {student.name} ({student.id})
            </h3>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FilterButton type="week" label="This Week" />
                <FilterButton type="month" label="This Month" />
                <FilterButton type="year" label="This Year" />
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            <StatCard label="Attendance %" value={`${summary.percentage}%`} color="text-primary dark:text-primary/90" />
            <StatCard label="Present" value={summary.present.toString()} color="text-green-500" />
            <StatCard label="Absent" value={summary.absent.toString()} color="text-red-500" />
            <StatCard label="On Leave" value={summary.onLeave.toString()} color="text-yellow-500" />
            <StatCard label="Total Classes" value={summary.total.toString()} color="text-gray-700 dark:text-gray-200" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <PieChart
                title="Overall Attendance Distribution"
                data={[
                    { label: 'Present', value: summary.present, color: '#10B981' },
                    { label: 'Absent', value: summary.absent, color: '#EF4444' },
                    { label: 'On Leave', value: summary.onLeave, color: '#F59E0B' },
                ]}
            />
            <SimpleBarChart 
                title="Subject-wise Performance"
                data={subjectWiseStats.map(s => ({
                    label: s.code,
                    value: s.percentage,
                    color: s.percentage < 75 ? '#FBBF24' : '#10B981'
                }))}
            />
        </div>
    </div>
  );
};

const StatCard: React.FC<{label: string, value: string, color: string}> = ({label, value, color}) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    </div>
);


export default AttendanceView;