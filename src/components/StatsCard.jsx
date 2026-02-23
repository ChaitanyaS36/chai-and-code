import React from 'react';
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

const StatsCard = ({ darkMode, stats }) => {
  const statItems = [
    {
      icon: <Trophy className="w-6 h-6" />,
      label: 'Problems Solved',
      value: stats.solvedProblems,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      darkBg: 'bg-yellow-900 bg-opacity-30'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Days Completed',
      value: stats.completedDays,
      color: 'text-cardamom-green',
      bgColor: 'bg-green-100',
      darkBg: 'bg-green-900 bg-opacity-30'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Current Streak',
      value: `${stats.streak} days`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      darkBg: 'bg-blue-900 bg-opacity-30'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Progress',
      value: `${stats.progressPercentage}%`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      darkBg: 'bg-purple-900 bg-opacity-30'
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 mb-6 border-2 border-chai-brown animate-fade-in glow backdrop-blur-sm`}>
      <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
        📊 Your Progress
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, idx) => (
          <div
            key={idx}
            className={`${darkMode ? item.darkBg : item.bgColor} rounded-lg p-4 transform hover:scale-105 transition-all duration-200 border-2 ${darkMode ? 'border-gray-700' : 'border-white'}`}
          >
            <div className={`${item.color} mb-2`}>
              {item.icon}
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
              {item.value}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
