import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const DayProgress = ({ days, currentDay, onDaySelect, darkMode }) => {
  // Calculate overall progress percentage
  const completedDays = days.filter(d => d.completed).length;
  const progressPercentage = (completedDays / days.length) * 100;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 mb-6 border-2 border-chai-brown animate-fade-in glow`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
          📅 14-Day Progress
        </h2>
        <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {completedDays} / {days.length} Days Completed
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`w-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div 
            className="h-full bg-gradient-to-r from-cardamom-green to-green-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        {days.map((day) => {
          const isCompleted = day.completed;
          const isCurrent = day.day === currentDay;
          
          return (
            <button
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={`
                p-3 rounded-lg border-2 transition-all transform hover:scale-105
                ${isCurrent 
                  ? 'border-chai-brown bg-milk-cream shadow-lg ring-2 ring-chai-brown ring-opacity-50' 
                  : darkMode 
                    ? 'border-gray-600 hover:border-chai-brown bg-gray-700' 
                    : 'border-gray-300 hover:border-chai-brown'
                }
                ${isCompleted ? darkMode ? 'bg-green-900 bg-opacity-30' : 'bg-cardamom-green bg-opacity-20' : ''}
              `}
            >
              <div className="flex flex-col items-center gap-2">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-cardamom-green animate-pulse-slow" />
                ) : (
                  <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                )}
                <span className={`text-sm font-semibold ${isCurrent ? 'text-chai-brown' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Day {day.day}
                </span>
                <span className={`text-xs text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {day.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayProgress;
