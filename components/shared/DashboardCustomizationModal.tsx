
import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { XMarkIcon } from '../icons/Icons';

export interface WidgetConfig {
    id: string;
    name: string;
}

interface DashboardCustomizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (enabledWidgetIds: string[]) => void;
    availableWidgets: WidgetConfig[];
    enabledWidgets: string[];
}

const DashboardCustomizationModal: React.FC<DashboardCustomizationModalProps> = ({
    isOpen,
    onClose,
    onSave,
    availableWidgets,
    enabledWidgets,
}) => {
    const [tempEnabledWidgets, setTempEnabledWidgets] = useState(enabledWidgets);

    useEffect(() => {
        setTempEnabledWidgets(enabledWidgets);
    }, [enabledWidgets, isOpen]);

    const handleToggle = (widgetId: string, isEnabled: boolean) => {
        if (isEnabled) {
            setTempEnabledWidgets(prev => [...prev, widgetId]);
        } else {
            setTempEnabledWidgets(prev => prev.filter(id => id !== widgetId));
        }
    };
    
    const handleSave = () => {
        onSave(tempEnabledWidgets);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-zoom-in overflow-hidden flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customize Dashboard</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                
                <div className="p-6 space-y-4 overflow-y-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Select the widgets you want to see on your dashboard.</p>
                    {availableWidgets.map(widget => (
                        <div key={widget.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex justify-between items-center">
                            <span className="font-semibold text-gray-800 dark:text-white">{widget.name}</span>
                            <ToggleSwitch
                                label=""
                                enabled={tempEnabledWidgets.includes(widget.id)}
                                onChange={(isEnabled) => handleToggle(widget.id, isEnabled)}
                            />
                        </div>
                    ))}
                </div>

                <div className="p-6 mt-auto border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <button
                        onClick={handleSave}
                        className="w-full px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardCustomizationModal;
