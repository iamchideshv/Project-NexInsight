import React from 'react';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  if (total === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
        <h3 className="text-md font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  let cumulativePercentage = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
      <h3 className="text-md font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <svg viewBox="-1 -1 2 2" className="w-40 h-40 transform -rotate-90">
          {data.map(item => {
            const percentage = item.value / total;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercentage);
            cumulativePercentage += percentage;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercentage);
            const largeArcFlag = percentage > 0.5 ? 1 : 0;
            const pathData = [
              `M ${startX} ${startY}`, // Move
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
              'L 0 0', // Line to center
            ].join(' ');

            return <path key={item.label} d={pathData} fill={item.color} />;
          })}
        </svg>
        <div className="flex flex-col space-y-2">
          {data.map(item => (
            <div key={item.label} className="flex items-center space-x-2 text-sm">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
