
import React from 'react';
import { timetableData, timeSlots, Period } from '../timetableData';

const StudentTimeTable: React.FC = () => {
  const { department, semester, section, schedule } = timetableData;
  const days = Object.keys(schedule);

  const getCellColor = (period: Period | null) => {
    if (!period) return 'bg-gray-50 dark:bg-gray-800/50';
    switch (period.type) {
      case 'LAB':
        return 'bg-blue-100 dark:bg-blue-900/50';
      case 'TUTORIAL':
        return 'bg-yellow-100 dark:bg-yellow-900/50';
      default:
        return 'bg-green-100 dark:bg-green-900/50';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📅 My Time Table</h2>
        <p className="text-gray-600 dark:text-gray-400">Class: {department} - {semester} Year / Section {section}</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: '80px repeat(7, 1fr)'}}>
          {/* Header Row */}
          <div className="p-2 font-bold text-center text-gray-700 dark:text-gray-300">Day/Time</div>
          {timeSlots.map(time => (
            <div key={time} className="p-2 font-bold text-center text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center min-w-[120px]">{time}</div>
          ))}

          {/* Data Rows */}
          {days.map(day => (
            <React.Fragment key={day}>
              <div className="p-3 font-bold text-center flex items-center justify-center bg-gray-100 dark:bg-gray-700">{day}</div>
              {(schedule as any)[day].map((period: Period | null, index: number) => (
                <div key={`${day}-${index}`} className={`p-2 rounded-lg m-1 text-center flex flex-col justify-center ${getCellColor(period)}`}>
                  {period ? (
                    <>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">{period.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{period.faculty}</p>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTable;
