
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import NavCard from './shared/NavCard';
import { DashboardIcon, ClipboardCheckIcon, BusIcon, BellIcon, ClockIcon, SearchIcon, UserCircleIcon, ClipboardListIcon, BookOpenIcon, CalendarDaysIcon, BriefcaseIcon, Cog6ToothIcon } from './icons/Icons';
import ViewWrapper from './admin/ViewWrapper';
import DashboardCustomizationModal, { WidgetConfig } from './shared/DashboardCustomizationModal';
import { timetableData, timeSlots } from './timetableData';
import { marksData } from '../data/marksData';
import { subjects } from '../data/subjects';

// Views
import StudentProfile from './student/Profile';
import MyAttendance from './student/MyAttendance';
import StudentTimeTable from './student/TimeTable';
import BusDetails from './student/BusDetails';
import Notifications from './student/Notifications';
import Complaints from './student/Complaints';
import LostAndFound from './shared/LostAndFound';
import MyMarks from './student/MyMarks';
import OnDuty from './student/OnDuty';
import FacultyList from './shared/FacultyList';

interface StudentDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const studentWidgets: WidgetConfig[] = [
    { id: 'quick_actions', name: 'Quick Actions' },
    { id: 'todays_timetable', name: 'Today\'s Timetable' },
    { id: 'attendance_overview', name: 'Attendance Overview' },
    { id: 'recent_marks', name: 'Recent Marks' },
];

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, theme, setTheme }) => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userName="R. Kumar";
  const userId="22AIDS050";

  const sidebarItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, action: () => setActiveView('Dashboard') },
    { label: 'My Profile', icon: <UserCircleIcon />, action: () => setActiveView('Profile') },
    { label: 'Attendance', icon: <CalendarDaysIcon />, action: () => setActiveView('Attendance') },
    { label: 'My Marks', icon: <BookOpenIcon />, action: () => setActiveView('Marks') },
    { label: 'On Duty Request', icon: <ClipboardCheckIcon />, action: () => setActiveView('On Duty') },
    { label: 'My Timetable', icon: <ClockIcon />, action: () => setActiveView('Timetable') },
    { label: 'Faculty Directory', icon: <BriefcaseIcon />, action: () => setActiveView('Faculty Directory') },
    { label: 'Notifications', icon: <BellIcon />, action: () => setActiveView('Notifications') },
    { label: 'Bus Details', icon: <BusIcon />, action: () => setActiveView('Bus Details') },
    { label: 'Complaints', icon: <ClipboardListIcon />, action: () => setActiveView('Complaints') },
    { label: 'Lost & Found', icon: <SearchIcon />, action: () => setActiveView('Lost & Found') },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView setActiveView={setActiveView} />;
      case 'Profile':
        return <ViewWrapper><StudentProfile /></ViewWrapper>;
      case 'Attendance':
        return <ViewWrapper><MyAttendance /></ViewWrapper>;
      case 'Marks':
        return <ViewWrapper><MyMarks /></ViewWrapper>;
      case 'On Duty':
        return <ViewWrapper><OnDuty /></ViewWrapper>;
      case 'Timetable':
        return <ViewWrapper><StudentTimeTable /></ViewWrapper>;
      case 'Faculty Directory':
        return <ViewWrapper><FacultyList /></ViewWrapper>;
      case 'Notifications':
        return <ViewWrapper><Notifications /></ViewWrapper>;
      case 'Bus Details':
        return <ViewWrapper><BusDetails /></ViewWrapper>;
      case 'Complaints':
        return <ViewWrapper><Complaints /></ViewWrapper>;
      case 'Lost & Found':
        return <ViewWrapper><LostAndFound /></ViewWrapper>;
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };
  
  return (
    <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 ${theme}`}>
      <Sidebar 
        items={sidebarItems} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeView={activeView}
        userName={userName}
        userId={userId}
      />
      
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          theme={theme}
          setTheme={setTheme}
        />
        <main className="p-6 flex-1 overflow-y-auto">{renderView()}</main>
      </div>
    </div>
  );
};

// --- Dashboard Widgets ---
const QuickActionsWidget: React.FC<{setActiveView: (view: string) => void}> = ({setActiveView}) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <NavCard title="My Attendance" icon={<CalendarDaysIcon className="w-6 h-6"/>} color="blue" onClick={() => setActiveView('Attendance')} />
            <NavCard title="My Marks" icon={<BookOpenIcon className="w-6 h-6"/>} color="green" onClick={() => setActiveView('Marks')} />
            <NavCard title="My Timetable" icon={<ClockIcon className="w-6 h-6"/>} color="yellow" onClick={() => setActiveView('Timetable')} />
            <NavCard title="On Duty Request" icon={<ClipboardCheckIcon className="w-6 h-6"/>} color="purple" onClick={() => setActiveView('On Duty')} />
            <NavCard title="Faculty Directory" icon={<BriefcaseIcon className="w-6 h-6"/>} color="teal" onClick={() => setActiveView('Faculty Directory')} />
            <NavCard title="Bus Details" icon={<BusIcon className="w-6 h-6"/>} color="orange" onClick={() => setActiveView('Bus Details')} />
        </div>
    </div>
);

const TodaysTimetableWidget: React.FC = () => {
    const todaySchedule = timetableData.schedule.MON; // Mocking with Monday's schedule
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Today's Schedule</h3>
            <div className="overflow-x-auto -m-2 p-2">
                <div className="flex space-x-4">
                    {todaySchedule.map((period, index) => (
                        <div key={index} className="flex-shrink-0 w-32 text-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{timeSlots[index]}</p>
                            <p className="text-sm font-semibold mt-1 truncate">{period?.subject || '-'}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{period?.faculty || ''}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AttendanceOverviewWidget: React.FC = () => (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col justify-center items-center text-center">
        <p className="text-gray-500 dark:text-gray-400 font-semibold">Overall Attendance</p>
        <p className="text-5xl font-bold text-green-500 my-2">92.5%</p>
        <p className="text-xs text-gray-400">Last updated: Today</p>
    </div>
);

const RecentMarksWidget: React.FC = () => {
    const recentMark = marksData.find(m => m.studentId === '22AIDS050' && m.status === 'Published');
    const subject = subjects.find(s=>s.code === recentMark?.subjectCode);
    return (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Recent Marks Published</h3>
            {recentMark && subject ? (
                 <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Marks for <span className="font-semibold">{subject.name}</span> are available.
                    </p>
                    <p className="text-2xl font-bold mt-2">CAT 2: {recentMark.cat2} <span className="text-base font-normal text-gray-500">/ {recentMark.maxMarks}</span></p>
                </div>
            ) : <p className="text-sm text-gray-500 dark:text-gray-400">No new marks published.</p>}
        </div>
    );
};

const DashboardView: React.FC<{setActiveView: (view: string) => void}> = ({setActiveView}) => {
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [enabledWidgets, setEnabledWidgets] = useState<string[]>([]);

    useEffect(() => {
        const savedWidgets = localStorage.getItem('student_dashboard_widgets');
        if (savedWidgets) {
            setEnabledWidgets(JSON.parse(savedWidgets));
        } else {
            setEnabledWidgets(studentWidgets.map(w => w.id));
        }
    }, []);

    const handleSaveCustomization = (newEnabledWidgetIds: string[]) => {
        setEnabledWidgets(newEnabledWidgetIds);
        localStorage.setItem('student_dashboard_widgets', JSON.stringify(newEnabledWidgetIds));
    };

    const widgetComponents = {
        quick_actions: <QuickActionsWidget setActiveView={setActiveView} />,
        todays_timetable: <TodaysTimetableWidget />,
        attendance_overview: <AttendanceOverviewWidget />,
        recent_marks: <RecentMarksWidget />,
    };

    const widgetsToRender = studentWidgets.filter(w => enabledWidgets.includes(w.id));

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome, R. Kumar.</p>
                </div>
                <button onClick={() => setIsCustomizeModalOpen(true)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Cog6ToothIcon className="w-6 h-6" />
                </button>
            </div>
            
            <div className="space-y-6">
                {widgetsToRender.map(widget => (
                    <div key={widget.id}>
                        {widgetComponents[widget.id as keyof typeof widgetComponents]}
                    </div>
                ))}
            </div>

            <DashboardCustomizationModal
                isOpen={isCustomizeModalOpen}
                onClose={() => setIsCustomizeModalOpen(false)}
                onSave={handleSaveCustomization}
                availableWidgets={studentWidgets}
                enabledWidgets={enabledWidgets}
            />
        </div>
    );
};

export default StudentDashboard;
