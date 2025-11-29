import React from 'react';
import AttendanceView from '../shared/AttendanceView';

// Mock the logged-in student's ID
const LOGGED_IN_STUDENT_ID = '22AIDS050';

const MyAttendance: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Attendance</h2>
      <AttendanceView studentId={LOGGED_IN_STUDENT_ID} />
    </div>
  );
};

export default MyAttendance;
