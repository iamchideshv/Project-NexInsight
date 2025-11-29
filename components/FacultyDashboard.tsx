
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import NavCard from './shared/NavCard';
import { DashboardIcon, ClipboardListIcon, BellIcon, ClockIcon, SearchIcon, UserCircleIcon, BookOpenIcon, CalendarDaysIcon, IdentificationIcon, BriefcaseIcon, Cog6ToothIcon } from './icons/Icons';
import ViewWrapper from './admin/ViewWrapper';
import { facultyData } from '../data/facultyData';
import DashboardCustomizationModal, { WidgetConfig } from './shared/DashboardCustomizationModal';
import { timetableData, timeSlots } from './timetableData';

// Views
import FacultyProfile from './faculty/Profile';
import MarkAttendance from './faculty/StudentAttendance'; // Renamed component
import Complaints from './faculty/Complaints';
import Notifications from './faculty/Notifications';
import FacultyTimeTable from './faculty/TimeTable';
import LostAndFound from './shared/LostAndFound';
import MarksManagement from './faculty/MarksManagement';
import StudentList from './shared/StudentList';
import FacultyList from './shared/FacultyList';

interface FacultyDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const facultyWidgets: WidgetConfig[] = [
    { id: 'quick_actions', name: 'Quick Actions' },
    { id: 'upcoming_classes', name: 'Upcoming Classes' },
    { id: 'pending_tasks', name: 'Pending Tasks' },
];

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onLogout, theme, setTheme }) => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userName = "Mrs. M. Parvathi";
  const userId = "FACULTY02";

  const facultyProfile = facultyData.find(f => f.name.includes("Parvathi M"));
  const userPhotoUrl = facultyProfile?.photoUrl;

  const sidebarItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, action: () => setActiveView('Dashboard') },
    { label: 'My Profile', icon: <UserCircleIcon />, action: () => setActiveView('Profile') },
    { label: 'Students List', icon: <IdentificationIcon />, action: () => setActiveView('Students List') },
    { label: 'Faculty Directory', icon: <BriefcaseIcon />, action: () => setActiveView('Faculty Directory') },
    { label: 'Attendance', icon: <CalendarDaysIcon />, action: () => setActiveView('Attendance Management') },
    { label: 'Marks', icon: <BookOpenIcon />, action: () => setActiveView('Marks Management') },
    { label: 'My Timetable', icon: <ClockIcon />, action: () => setActiveView('Timetable') },
    { label: 'Send Notification', icon: <BellIcon />, action: () => setActiveView('Notifications') },
    { label: 'Complaints', icon: <ClipboardListIcon />, action: () => setActiveView('Complaints') },
    { label: 'Lost & Found', icon: <SearchIcon />, action: () => setActiveView('Lost & Found') },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView setActiveView={setActiveView} />;
      case 'Profile':
        return <ViewWrapper><FacultyProfile /></ViewWrapper>;
      case 'Students List':
        return <ViewWrapper><StudentList /></ViewWrapper>;
      case 'Faculty Directory':
        return <ViewWrapper><FacultyList /></ViewWrapper>;
      case 'Attendance Management':
        return <ViewWrapper><MarkAttendance /></ViewWrapper>;
      case 'Marks Management':
        return <ViewWrapper><MarksManagement /></ViewWrapper>;
      case 'Timetable':
        return <ViewWrapper><FacultyTimeTable /></ViewWrapper>;
      case 'Notifications':
        return <ViewWrapper><Notifications /></ViewWrapper>;
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
        userPhotoUrl={userPhotoUrl}
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
            <NavCard title="Mark Attendance" icon={<CalendarDaysIcon className="w-6 h-6"/>} color="blue" onClick={() => setActiveView('Attendance Management')} />
            <NavCard title="Manage Marks" icon={<BookOpenIcon className="w-6 h-6"/>} color="green" onClick={() => setActiveView('Marks Management')} />
            <NavCard title="My Timetable" icon={<ClockIcon className="w-6 h-6"/>} color="yellow" onClick={() => setActiveView('Timetable')} />
            <NavCard title="Students List" icon={<IdentificationIcon className="w-6 h-6"/>} color="indigo" onClick={() => setActiveView('Students List')} />
            <NavCard title="Faculty Directory" icon={<BriefcaseIcon className="w-6 h-6"/>} color="teal" onClick={() => setActiveView('Faculty Directory')} />
        </div>
    </div>
);

const UpcomingClassesWidget: React.FC = () => {
    const LOGGED_IN_FACULTY = "Mrs. M. Parvathi";
    const todayClasses = timetableData.schedule.MON
        .map((period, index) => ({...period, time: timeSlots[index]}))
        .filter(p => p.faculty && p.faculty.includes(LOGGED_IN_FACULTY));

    return (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Today's Classes</h3>
            <ul className="space-y-3">
                {todayClasses.length > 0 ? todayClasses.slice(0, 3).map(c => (
                    <li key={c.time} className="flex items-center justify-between text-sm">
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-200">{c.subject}</p>
                            <p className="text-gray-500 dark:text-gray-400">III Year / A Section</p>
                        </div>
                        <p className="font-mono text-gray-600 dark:text-gray-300">{c.time}</p>
                    </li>
                )) : <p className="text-sm text-gray-500 dark:text-gray-400">No classes scheduled for today.</p>}
            </ul>
        </div>
    );
};

const PendingTasksWidget: React.FC = () => (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Pending Tasks</h3>
        <ul className="space-y-3">
            <li className="flex items-center space-x-3 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                <p className="text-gray-700 dark:text-gray-200">Review & publish CAT-2 marks for 'AI'.</p>
            </li>
             <li className="flex items-center space-x-3 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                <p className="text-gray-700 dark:text-gray-200">Approve On-Duty request from R. Kumar.</p>
            </li>
        </ul>
    </div>
);

const DashboardView: React.FC<{setActiveView: (view: string) => void}> = ({setActiveView}) => {
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [enabledWidgets, setEnabledWidgets] = useState<string[]>([]);
    
    useEffect(() => {
        const savedWidgets = localStorage.getItem('faculty_dashboard_widgets');
        if (savedWidgets) {
            setEnabledWidgets(JSON.parse(savedWidgets));
        } else {
            setEnabledWidgets(facultyWidgets.map(w => w.id));
        }
    }, []);

    const handleSaveCustomization = (newEnabledWidgetIds: string[]) => {
        setEnabledWidgets(newEnabledWidgetIds);
        localStorage.setItem('faculty_dashboard_widgets', JSON.stringify(newEnabledWidgetIds));
    };

    const widgetComponents = {
        quick_actions: <QuickActionsWidget setActiveView={setActiveView} />,
        upcoming_classes: <UpcomingClassesWidget />,
        pending_tasks: <PendingTasksWidget />,
    };

    const widgetsToRender = facultyWidgets.filter(w => enabledWidgets.includes(w.id));
    
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome, Mrs. M. Parvathi.</p>
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
                availableWidgets={facultyWidgets}
                enabledWidgets={enabledWidgets}
            />
        </div>
    );
};


export default FacultyDashboard;
