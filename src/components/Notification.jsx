import React, { useEffect } from 'react';
import { CheckCircle2, X, Info } from 'lucide-react';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-cardamom-green',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const icon = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      ${bgColor[type]} text-white 
      px-6 py-4 rounded-lg shadow-2xl
      flex items-center gap-3
      animate-slide-in
      min-w-[300px] max-w-md
      border-2 border-white border-opacity-30
    `}>
      {icon[type]}
      <p className="flex-1 font-semibold text-sm">{message}</p>
      <button
        onClick={onClose}
        className="hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;
