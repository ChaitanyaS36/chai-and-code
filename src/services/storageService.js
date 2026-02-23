// Storage service for progress tracking and user data
const STORAGE_KEYS = {
  PROGRESS: 'chai_cpp_dsa_progress',
  THEME: 'chai_cpp_dsa_theme',
  CURRENT_DAY: 'chai_cpp_dsa_current_day',
  SOLVED_PROBLEMS: 'chai_cpp_dsa_solved',
  CODE_SNIPPETS: 'chai_cpp_dsa_code'
};

export const storageService = {
  // Progress tracking
  getProgress() {
    try {
      const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return progress ? JSON.parse(progress) : {};
    } catch (error) {
      console.error('Error reading progress:', error);
      return {};
    }
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  },

  updateDayProgress(day, completed) {
    const progress = this.getProgress();
    progress[day] = {
      completed,
      completedAt: completed ? new Date().toISOString() : null
    };
    this.saveProgress(progress);
  },

  // Theme
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Current day
  getCurrentDay() {
    const day = localStorage.getItem(STORAGE_KEYS.CURRENT_DAY);
    return day ? parseInt(day) : 1;
  },

  saveCurrentDay(day) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, day.toString());
  },

  // Solved problems
  getSolvedProblems() {
    try {
      const solved = localStorage.getItem(STORAGE_KEYS.SOLVED_PROBLEMS);
      return solved ? JSON.parse(solved) : [];
    } catch (error) {
      console.error('Error reading solved problems:', error);
      return [];
    }
  },

  markProblemSolved(problemId) {
    const solved = this.getSolvedProblems();
    if (!solved.includes(problemId)) {
      solved.push(problemId);
      localStorage.setItem(STORAGE_KEYS.SOLVED_PROBLEMS, JSON.stringify(solved));
    }
  },

  isProblemSolved(problemId) {
    const solved = this.getSolvedProblems();
    return solved.includes(problemId);
  },

  // Code snippets
  saveCodeSnippet(problemId, code) {
    try {
      const snippets = this.getCodeSnippets();
      snippets[problemId] = code;
      localStorage.setItem(STORAGE_KEYS.CODE_SNIPPETS, JSON.stringify(snippets));
    } catch (error) {
      console.error('Error saving code snippet:', error);
    }
  },

  getCodeSnippet(problemId) {
    try {
      const snippets = this.getCodeSnippets();
      return snippets[problemId] || null;
    } catch (error) {
      console.error('Error reading code snippet:', error);
      return null;
    }
  },

  getCodeSnippets() {
    try {
      const snippets = localStorage.getItem(STORAGE_KEYS.CODE_SNIPPETS);
      return snippets ? JSON.parse(snippets) : {};
    } catch (error) {
      console.error('Error reading code snippets:', error);
      return {};
    }
  },

  // Clear all data
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
