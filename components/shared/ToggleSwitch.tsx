import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
  return (
    <label htmlFor="toggle-switch" className="flex items-center cursor-pointer">
      <div className="relative">
        <input id="toggle-switch" type="checkbox" className="sr-only" checked={enabled} onChange={() => onChange(!enabled)} />
        <div className={`block w-14 h-8 rounded-full transition ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
      <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
        {label}
      </div>
    </label>
  );
};

export default ToggleSwitch;
