import React from 'react';

const staffAttendanceData = [
  { id: 'S001', name: 'Dr. Evelyn Reed', department: 'Computer Science', status: 'Present' },
  { id: 'S002', name: 'Mr. David Chen', department: 'Mechanical', status: 'Present' },
  { id: 'S003', name: 'Ms. Maria Garcia', department: 'Civil', status: 'Absent' },
  { id: 'S004', name: 'Dr. Ben Carter', department: 'AI & DS', status: 'On Leave' },
  { id: 'S005', name: 'Mrs. M. Parvathi', department: 'AI & DS', status: 'Present' },
  { id: 'S006', name: 'Mr. Jagadeesh', department: 'AI & DS', status: 'Present' },
];

const totalStaff = staffAttendanceData.length;
const presentCount = staffAttendanceData.filter(s => s.status === 'Present').length;
const absentCount = staffAttendanceData.filter(s => s.status === 'Absent').length;
const onLeaveCount = staffAttendanceData.filter(s => s.status === 'On Leave').length;

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
  switch (status) {
    case 'Present':
      return <span className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`}>Present</span>;
    case 'Absent':
      return <span className={`${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300`}>Absent</span>;
    case 'On Leave':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300`}>On Leave</span>;
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>;
  }
};

const StaffAttendance: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Staff Attendance</h2>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-300">{presentCount}</p>
              <p className="text-sm font-medium text-green-500 dark:text-green-400">Present</p>
          </div>
           <div className="bg-red-50 dark:bg-red-900/40 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-red-600 dark:text-red-300">{absentCount}</p>
              <p className="text-sm font-medium text-red-500 dark:text-red-400">Absent</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/40 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">{onLeaveCount}</p>
              <p className="text-sm font-medium text-yellow-500 dark:text-yellow-400">On Leave</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700/80 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">{totalStaff}</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Staff</p>
          </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="p-3">Staff ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-400">
            {staffAttendanceData.map(staff => (
              <tr key={staff.id} className="border-b dark:border-gray-700">
                <td className="p-3 font-mono">{staff.id}</td>
                <td className="p-3 font-semibold">{staff.name}</td>
                <td className="p-3">{staff.department}</td>
                <td className="p-3 text-center"><StatusBadge status={staff.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAttendance;
