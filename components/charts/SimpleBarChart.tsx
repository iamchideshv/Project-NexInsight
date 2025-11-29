import React from 'react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: ChartData[];
  title: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
      <h3 className="text-md font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="flex justify-between items-end h-48 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                backgroundColor: item.color || '#6C63FF',
              }}
              title={`${item.label}: ${item.value.toFixed(1)}%`}
            ></div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2 truncate">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
