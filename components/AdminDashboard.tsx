
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import NavCard from './shared/NavCard';
import { DashboardIcon, UsersIcon, ClipboardListIcon, BusIcon, ClockIcon, SearchIcon, UserCircleIcon, BellIcon, BookOpenIcon, CalendarDaysIcon, IdentificationIcon, BriefcaseIcon, ClipboardCheckIcon, ExclamationTriangleIcon, Cog6ToothIcon, MegaphoneIcon } from './icons/Icons';
import ViewWrapper from './admin/ViewWrapper';
import { mockStudents } from '../data/attendanceData';
import { facultyData } from '../data/facultyData';
import { complaintsData } from '../data/complaintsData';
import DashboardCustomizationModal, { WidgetConfig } from './shared/DashboardCustomizationModal';


// Views
import AdminProfile from './admin/Profile';
import StaffAttendance from './admin/StaffAttendance';
import StudentAttendance from './admin/StudentAttendance';
import Complaints from './admin/Complaints';
import BusDetails from './admin/BusDetails';
import TimeTable from './admin/TimeTable';
import LostAndFound from './shared/LostAndFound';
import MarksOverview from './admin/MarksOverview';
import StudentList from './shared/StudentList';
import FacultyList from './shared/FacultyList';


interface AdminDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; accentColor: string; }> = ({ icon, title, value, accentColor }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm flex items-center space-x-4">
    <div className={`p-3 rounded-full`} style={{ backgroundColor: `${accentColor}1A`}}>
      <div className="w-6 h-6" style={{ color: accentColor }}>{icon}</div>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  </div>
);

const adminWidgets: WidgetConfig[] = [
    { id: 'analytics_summary', name: 'Analytics Summary' },
    { id: 'quick_actions', name: 'Quick Actions' },
    { id: 'recent_activity', name: 'Recent Activity' },
    { id: 'campus_alerts', name: 'Campus Alerts' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, theme, setTheme }) => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userName = "Harish";
  const userId = "ADMIN01";

  const sidebarItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, action: () => setActiveView('Dashboard') },
    { label: 'My Profile', icon: <UserCircleIcon />, action: () => setActiveView('Profile') },
    { label: 'Students List', icon: <IdentificationIcon />, action: () => setActiveView('Students List') },
    { label: 'Faculty Directory', icon: <BriefcaseIcon />, action: () => setActiveView('Faculty Directory') },
    { label: 'Staff Attendance', icon: <UsersIcon />, action: () => setActiveView('Staff Attendance') },
    { label: 'Student Attendance', icon: <CalendarDaysIcon />, action: () => setActiveView('Student Attendance') },
    { label: 'Marks Overview', icon: <BookOpenIcon />, action: () => setActiveView('Marks Overview') },
    { label: 'Complaints', icon: <BellIcon />, action: () => setActiveView('Complaints') },
    { label: 'Bus Details', icon: <BusIcon />, action: () => setActiveView('Bus Details') },
    { label: 'Time Table', icon: <ClockIcon />, action: () => setActiveView('Time Table') },
    { label: 'Lost & Found', icon: <SearchIcon />, action: () => setActiveView('Lost & Found') },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView setActiveView={setActiveView} />;
      case 'Profile':
        return <ViewWrapper><AdminProfile /></ViewWrapper>;
      case 'Students List':
        return <ViewWrapper><StudentList /></ViewWrapper>;
      case 'Faculty Directory':
        return <ViewWrapper><FacultyList /></ViewWrapper>;
      case 'Staff Attendance':
        return <ViewWrapper><StaffAttendance /></ViewWrapper>;
      case 'Student Attendance':
        return <ViewWrapper><StudentAttendance /></ViewWrapper>;
      case 'Marks Overview':
        return <ViewWrapper><MarksOverview /></ViewWrapper>;
      case 'Complaints':
        return <ViewWrapper><Complaints /></ViewWrapper>;
      case 'Bus Details':
        return <ViewWrapper><BusDetails /></ViewWrapper>;
      case 'Time Table':
        return <ViewWrapper><TimeTable /></ViewWrapper>;
      case 'Lost & Found':
        return <ViewWrapper><LostAndFound /></ViewWrapper>;
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };
  
  return (
    <div className={`flex min-h-screen bg-light-bg dark:bg-gray-900 ${theme}`}>
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
        <main className="p-6 flex-1 overflow-y-auto">
           {activeView !== 'Dashboard' && (
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{activeView}</h1>
            )}
          {renderView()}
        </main>
      </div>
    </div>
  );
};

// --- Dashboard Widgets ---
const AnalyticsSummaryWidget: React.FC = () => {
    const totalStudents = mockStudents.length;
    const totalFaculty = facultyData.length;
    const pendingComplaints = complaintsData.filter(c => c.status !== 'Resolved').length;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<UsersIcon />} title="Total Students" value={totalStudents.toString()} accentColor="#3B82F6" />
            <StatCard icon={<BriefcaseIcon />} title="Total Faculty" value={totalFaculty.toString()} accentColor="#8B5CF6" />
            <StatCard icon={<ClipboardCheckIcon />} title="Average Attendance" value="92.5%" accentColor="#10B981" />
            <StatCard icon={<ExclamationTriangleIcon />} title="Pending Complaints" value={pendingComplaints.toString()} accentColor="#EF4444" />
        </div>
    );
};

const QuickActionsWidget: React.FC<{setActiveView: (view: string) => void}> = ({setActiveView}) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <NavCard title="Students List" icon={<IdentificationIcon />} color="blue" onClick={() => setActiveView('Students List')} />
            <NavCard title="Faculty Directory" icon={<BriefcaseIcon />}  color="teal" onClick={() => setActiveView('Faculty Directory')} />
            <NavCard title="Staff Attendance" icon={<UsersIcon />} color="indigo" onClick={() => setActiveView('Staff Attendance')} />
            <NavCard title="Student Attendance" icon={<CalendarDaysIcon />} color="green" onClick={() => setActiveView('Student Attendance')} />
            <NavCard title="Marks Overview" icon={<BookOpenIcon />} color="purple" onClick={() => setActiveView('Marks Overview')} />
            <NavCard title="Complaints" icon={<BellIcon />} color="red" onClick={() => setActiveView('Complaints')} />
            <NavCard title="Bus Details" icon={<BusIcon />} color="orange" onClick={() => setActiveView('Bus Details')} />
        </div>
    </div>
);

const RecentActivityWidget: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Recent Activity</h3>
        <ul className="space-y-3">
            <li className="flex items-center space-x-3 text-sm">
                <div className="bg-red-100 dark:bg-red-900/50 p-1.5 rounded-full"><ExclamationTriangleIcon className="w-4 h-4 text-red-500" /></div>
                <p className="text-gray-600 dark:text-gray-300">New 'Urgent' complaint submitted by S. Verma.</p>
            </li>
            <li className="flex items-center space-x-3 text-sm">
                <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full"><CalendarDaysIcon className="w-4 h-4 text-green-500" /></div>
                <p className="text-gray-600 dark:text-gray-300">Staff attendance for today marked as complete.</p>
            </li>
             <li className="flex items-center space-x-3 text-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full"><BookOpenIcon className="w-4 h-4 text-blue-500" /></div>
                <p className="text-gray-600 dark:text-gray-300">Marks for 'AI' subject have been published.</p>
            </li>
        </ul>
    </div>
);

const CampusAlertsWidget: React.FC = () => (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center"><MegaphoneIcon className="w-5 h-5 mr-2" /> Broadcast Alert</h3>
        <textarea className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm border-transparent focus:ring-primary focus:border-primary transition" rows={3} placeholder="Type your alert message here..."></textarea>
        <button onClick={() => alert('Campus alert sent!')} className="w-full mt-2 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">Send Alert</button>
    </div>
);

const DashboardView: React.FC<{setActiveView: (view: string) => void}> = ({setActiveView}) => {
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [enabledWidgets, setEnabledWidgets] = useState<string[]>([]);

    useEffect(() => {
        const savedWidgets = localStorage.getItem('admin_dashboard_widgets');
        if (savedWidgets) {
            setEnabledWidgets(JSON.parse(savedWidgets));
        } else {
            setEnabledWidgets(adminWidgets.map(w => w.id)); // Enable all by default
        }
    }, []);

    const handleSaveCustomization = (newEnabledWidgetIds: string[]) => {
        setEnabledWidgets(newEnabledWidgetIds);
        localStorage.setItem('admin_dashboard_widgets', JSON.stringify(newEnabledWidgetIds));
    };

    const widgetComponents = {
        analytics_summary: <AnalyticsSummaryWidget />,
        quick_actions: <QuickActionsWidget setActiveView={setActiveView} />,
        recent_activity: <RecentActivityWidget />,
        campus_alerts: <CampusAlertsWidget />
    };

    const widgetsToRender = adminWidgets.filter(w => enabledWidgets.includes(w.id));

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, Harish!</h1>
                    <p className="text-gray-500 dark:text-gray-400">Here's a summary of your campus activity today.</p>
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
                availableWidgets={adminWidgets}
                enabledWidgets={enabledWidgets}
            />
        </div>
    );
};


export default AdminDashboard;