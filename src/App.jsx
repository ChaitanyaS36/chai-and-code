import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DayProgress from './components/DayProgress';
import ProblemCard from './components/ProblemCard';
import CodeEditor from './components/CodeEditor';
import ExplanationModal from './components/ExplanationModal';
import CodeSolutionModal from './components/CodeSolutionModal';
import Footer from './components/Footer';
import Notification from './components/Notification';
import StatsCard from './components/StatsCard';
import AchievementBadge from './components/AchievementBadge';
import { learningPlan, getDayData } from './data/learningPlan';
import { getExplanation } from './data/problemExplanations';
import { storageService } from './services/storageService';
import { createConfetti } from './utils/confetti';

function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCodeSolution, setShowCodeSolution] = useState(false);
  const [dayData, setDayData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [achievement, setAchievement] = useState(null);
  const [stats, setStats] = useState({
    solvedProblems: 0,
    completedDays: 0,
    streak: 0,
    progressPercentage: 0
  });

  useEffect(() => {
    // Load current day from storage
    const savedDay = storageService.getCurrentDay();
    setCurrentDay(savedDay);
    loadDayData(savedDay);
    
    // Load dark mode preference
    const savedTheme = storageService.getTheme();
    setDarkMode(savedTheme === 'dark');
    updateBodyTheme(savedTheme === 'dark');
    
    // Calculate initial stats
    setStats(calculateStats());
  }, []);

  const updateBodyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    storageService.saveTheme(newDarkMode ? 'dark' : 'light');
    updateBodyTheme(newDarkMode);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const loadDayData = (day) => {
    const data = getDayData(day);
    setDayData(data);
  };

  const handleDaySelect = (day) => {
    setCurrentDay(day);
    storageService.saveCurrentDay(day);
    loadDayData(day);
    setSelectedProblem(null);
  };

  const handleOpenEditor = (problem) => {
    setSelectedProblem(problem);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedProblem(null);
  };

  const handleShowExplanation = (problem) => {
    setSelectedProblem(problem);
    setShowExplanation(true);
  };

  const handleCloseExplanation = () => {
    setShowExplanation(false);
    setSelectedProblem(null);
  };

  const handleShowCode = (problem) => {
    setSelectedProblem(problem);
    setShowCodeSolution(true);
  };

  const handleCloseCodeSolution = () => {
    setShowCodeSolution(false);
    setSelectedProblem(null);
  };

  const calculateStats = () => {
    const solvedProblems = storageService.getSolvedProblems();
    const progress = storageService.getProgress();
    const completedDays = Object.values(progress).filter(p => p.completed).length;
    const totalProblems = learningPlan.reduce((sum, day) => {
      const dayData = getDayData(day.day);
      return sum + (dayData ? dayData.problems.length : 0);
    }, 0);
    const progressPercentage = totalProblems > 0 
      ? Math.round((solvedProblems.length / totalProblems) * 100) 
      : 0;
    
    // Calculate streak (simplified - based on consecutive completed days)
    let streak = 0;
    for (let i = 1; i <= 14; i++) {
      const dayProgress = progress[i];
      if (dayProgress && dayProgress.completed) {
        streak++;
      } else {
        break;
      }
    }
    
    return {
      solvedProblems: solvedProblems.length,
      completedDays,
      streak,
      progressPercentage
    };
  };

  const checkAchievements = (newStats, prevStats) => {
    // First problem solved
    if (prevStats.solvedProblems === 0 && newStats.solvedProblems > 0) {
      setAchievement({ type: 'firstProblem' });
      createConfetti();
      return;
    }
    
    // Day completed
    if (newStats.completedDays > prevStats.completedDays) {
      setAchievement({ type: 'dayComplete' });
      createConfetti();
      return;
    }
    
    // Week completed
    if (newStats.completedDays === 7 && prevStats.completedDays < 7) {
      setAchievement({ type: 'weekComplete' });
      createConfetti();
      return;
    }
    
    // All complete
    if (newStats.completedDays === 14 && prevStats.completedDays < 14) {
      setAchievement({ type: 'allComplete' });
      createConfetti();
      return;
    }
  };

  const handleMarkSolved = () => {
    const prevStats = calculateStats();
    
    // Refresh to update UI
    loadDayData(currentDay);
    // Recalculate progress
    const daysWithProgress = calculateDaysProgress();
    // Check if day is completed
    checkAndUpdateDayCompletion(currentDay, daysWithProgress);
    
    // Update stats and check achievements
    setTimeout(() => {
      const newStats = calculateStats();
      setStats(newStats);
      checkAchievements(newStats, prevStats);
    }, 100);
  };

  const checkAndUpdateDayCompletion = (day, daysWithProgress) => {
    const dayData = getDayData(day);
    if (!dayData) return;
    
    const solvedProblems = storageService.getSolvedProblems();
    const dayProblems = dayData.problems.map(p => p.id);
    const allSolved = dayProblems.every(id => solvedProblems.includes(id));
    
    if (allSolved && dayProblems.length > 0) {
      storageService.updateDayProgress(day, true);
    }
  };

  const calculateDaysProgress = () => {
    return learningPlan.map(day => {
      const dayData = getDayData(day.day);
      if (!dayData) {
        return { ...day, completed: false };
      }
      
      const solvedProblems = storageService.getSolvedProblems();
      const dayProblems = dayData.problems.map(p => p.id);
      const allSolved = dayProblems.length > 0 && dayProblems.every(id => solvedProblems.includes(id));
      
      return {
        ...day,
        completed: allSolved
      };
    });
  };

  // Prepare days data for progress component
  const daysWithProgress = calculateDaysProgress();

  if (!dayData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : ''}`}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse-slow">☕</div>
          <p className={`text-xl ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>Loading chai... ☕</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : ''}`}>
      <Header 
        currentDay={currentDay} 
        totalDays={14}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Card */}
        <StatsCard darkMode={darkMode} stats={stats} />
        
        {/* Day Progress */}
        <DayProgress 
          days={daysWithProgress} 
          currentDay={currentDay}
          onDaySelect={handleDaySelect}
          darkMode={darkMode}
        />

        {/* Current Day Content */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 mb-6 border-2 border-chai-brown animate-fade-in glow backdrop-blur-sm`}>
          <div className="mb-6">
            <h2 className={`text-3xl font-bold mb-2 gradient-text ${darkMode ? 'text-milk-cream' : 'text-chai-brown'}`}>
              Day {dayData.day}: {dayData.title}
            </h2>
            <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong className="text-chai-brown">Focus:</strong> {dayData.focus}
            </p>
            <div className="flex flex-wrap gap-2">
              {dayData.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-1.5 ${darkMode ? 'bg-chai-brown text-milk-cream' : 'bg-milk-cream text-chai-brown'} rounded-full text-sm font-semibold shadow-md`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Training Method Reminder */}
          <div className={`${darkMode ? 'bg-yellow-900 bg-opacity-30 border-yellow-600' : 'bg-yellow-50 border-yellow-400'} border-l-4 p-4 mb-6 rounded shadow-md`}>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-yellow-300' : 'text-tea-leaf-dark'}`}>🧠 Remember the Training Method:</h3>
            <ol className={`list-decimal list-inside space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Write logic in English first</li>
              <li>Write the skeleton code</li>
              <li>Fill it step by step</li>
            </ol>
          </div>

          {/* Problems List */}
          <div className="mt-6">
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
              Problems ({dayData.problems.length})
            </h3>
            {dayData.problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                day={currentDay}
                onOpenEditor={handleOpenEditor}
                onShowExplanation={handleShowExplanation}
                onShowCode={handleShowCode}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Error-Killer Habits Reminder */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 border-2 border-chai-brown glow`}>
          <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
            🛠️ Error-Killer Habits
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Read compiler errors carefully</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Fix ONE error at a time</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Never rewrite whole code</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Check for missing semicolons</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Watch for wrong brackets</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cardamom-green font-bold text-lg">✔</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Use == not = for comparison</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      {/* Achievement Badge */}
      {achievement && (
        <AchievementBadge
          achievement={achievement}
          onClose={() => setAchievement(null)}
        />
      )}

      {/* Code Editor Modal */}
      {showEditor && selectedProblem && (
        <CodeEditor
          problem={selectedProblem}
          onClose={handleCloseEditor}
          onMarkSolved={handleMarkSolved}
          onNotify={showNotification}
          darkMode={darkMode}
        />
      )}

      {/* Explanation Modal */}
      {showExplanation && selectedProblem && (
        <ExplanationModal
          problem={selectedProblem}
          explanation={getExplanation(selectedProblem.id)}
          onClose={handleCloseExplanation}
          darkMode={darkMode}
        />
      )}

      {/* Code Solution Modal */}
      {showCodeSolution && selectedProblem && (
        <CodeSolutionModal
          problem={selectedProblem}
          solution={getExplanation(selectedProblem.id)}
          onClose={handleCloseCodeSolution}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;
