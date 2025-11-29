import React from 'react';
import { LogoutIcon, UserCircleIcon } from './icons/Icons';

interface SidebarItem {
    label: string;
    icon: React.ReactNode;
    action?: () => void;
}

interface SidebarProps {
    items: SidebarItem[];
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
    activeView: string;
    userName: string;
    userId: string;
    userPhotoUrl?: string;
}

const NavItem: React.FC<{ item: SidebarItem, isFooter?: boolean, onClose: () => void, isActive: boolean }> = ({ item, isFooter = false, onClose, isActive }) => (
    <button onClick={() => {
        if (item.action) {
            item.action();
        }
        onClose();
    }} className={`w-full flex items-center space-x-4 text-left px-4 py-3 rounded-xl transition-colors duration-200 relative
        ${isFooter 
            ? 'text-gray-500 hover:bg-red-500/10 hover:text-red-500 dark:text-gray-400 dark:hover:bg-red-500/20' 
            : isActive 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80'
        }`}>
        {isActive && !isFooter && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"></div>}
        <span className="w-6 h-6 flex-shrink-0">{item.icon}</span>
        <span className="font-medium">{item.label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ items, onLogout, isOpen, onClose, activeView, userName, userId, userPhotoUrl }) => {
    return (
        <aside className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 bg-white dark:bg-gray-800 w-3/4 max-w-xs md:w-64 border-r dark:border-gray-700 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4 flex flex-col h-full">
                <div className="px-2 py-2 mb-4">
                    <h1 className="text-2xl font-bold text-primary">NexInsight</h1>
                </div>

                <div className="flex flex-col items-center p-4 mb-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                    {userPhotoUrl ? (
                        <img src={userPhotoUrl} alt={`Profile of ${userName}`} className="w-20 h-20 rounded-full object-cover mb-3" />
                    ) : (
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                            <UserCircleIcon className="w-16 h-16 text-primary/70" />
                        </div>
                    )}
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white text-center">{userName}</h3>
                    <p className="text-sm text-white bg-primary/80 px-2 py-0.5 rounded-md font-semibold mt-1">{userId}</p>
                </div>
                <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-1">
                    {items.map((item) => (
                        <NavItem key={item.label} item={item} onClose={onClose} isActive={activeView === item.label} />
                    ))}
                </nav>
                <div className="mt-auto pt-4 border-t dark:border-gray-700">
                     <NavItem item={{ label: 'Logout', icon: <LogoutIcon />, action: onLogout }} isFooter onClose={onClose} isActive={false} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;