import React, { useEffect, useState } from 'react';
import { Trophy, Star, Award, Zap } from 'lucide-react';

const AchievementBadge = ({ achievement, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose(), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const achievementConfig = {
    firstProblem: {
      icon: <Star className="w-12 h-12 text-yellow-400" />,
      title: 'First Step! ⭐',
      message: 'You solved your first problem!',
      color: 'from-yellow-400 to-orange-500'
    },
    dayComplete: {
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      title: 'Day Complete! 🏆',
      message: 'You completed a full day!',
      color: 'from-green-400 to-emerald-500'
    },
    weekComplete: {
      icon: <Award className="w-12 h-12 text-purple-400" />,
      title: 'Week Warrior! 🎖️',
      message: 'You completed 7 days!',
      color: 'from-purple-400 to-pink-500'
    },
    allComplete: {
      icon: <Zap className="w-12 h-12 text-blue-400" />,
      title: 'Master Coder! ⚡',
      message: 'You completed all 14 days!',
      color: 'from-blue-400 to-cyan-500'
    }
  };

  const config = achievementConfig[achievement.type] || achievementConfig.firstProblem;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={`
        bg-gradient-to-br ${config.color}
        rounded-2xl shadow-2xl p-8
        transform transition-all duration-500
        ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        pointer-events-auto
        border-4 border-white border-opacity-50
        animate-bounce
      `}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {config.icon}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {config.title}
          </h2>
          <p className="text-xl text-white opacity-90">
            {config.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
