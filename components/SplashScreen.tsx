
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-indigo-600 dark:text-indigo-400 animate-zoom-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          NexInsight
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Empowering Institutions with Data-Driven Insights.
        </p>
      </div>
       <div className="absolute bottom-10 w-full flex justify-center">
        <div className="w-1/3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 animate-pulse" style={{ width: '100%', animationDuration: '2.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
