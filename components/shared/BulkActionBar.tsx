import React from 'react';
import { ArrowDownTrayIcon, PaperAirplaneIcon, BookOpenIcon, XMarkIcon } from '../icons/Icons';

interface BulkActionBarProps {
  selectedCount: number;
  onDeselectAll: () => void;
  onDownload: () => void;
  onNotify: () => void;
  onReleaseMarks: () => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onDeselectAll,
  onDownload,
  onNotify,
  onReleaseMarks
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t dark:border-gray-700 p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20 animate-slide-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold text-gray-800 dark:text-white">
            {selectedCount} selected
          </span>
          <button onClick={onDeselectAll} className="text-sm font-semibold text-primary hover:underline">
            Deselect all
          </button>
        </div>
        <div className="flex items-center space-x-2">
            <ActionButton icon={<ArrowDownTrayIcon className="w-5 h-5"/>} onClick={onDownload} label="Download"/>
            <ActionButton icon={<PaperAirplaneIcon className="w-5 h-5"/>} onClick={onNotify} label="Notify"/>
            <ActionButton icon={<BookOpenIcon className="w-5 h-5"/>} onClick={onReleaseMarks} label="Release Marks"/>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({icon, label, onClick}) => (
    <button onClick={onClick} className="flex items-center space-x-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);


export default BulkActionBar;