
import React, { useState, useEffect } from 'react';
import { Role } from './types';
import LoginPage from './components/LoginPage';
// Fix: Correctly import dashboard components
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<Role>(Role.None);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAuthSuccess = (role: Role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(Role.None);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginPage onLoginSuccess={handleAuthSuccess} />;
    }

    switch (userRole) {
      case Role.Admin:
        return <AdminDashboard onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      case Role.Faculty:
        return <FacultyDashboard onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      case Role.Student:
        return <StudentDashboard onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      default:
        // Fallback to login if something goes wrong
        return <LoginPage onLoginSuccess={handleAuthSuccess} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans text-gray-900 dark:text-gray-100 ${theme}`}>
      {renderContent()}
    </div>
  );
};

export default App;
