# ☕ Chai & Code - C++ DSA Learning Platform

A friendly, chai-themed web application to help students learn C++ and Data Structures & Algorithms through a structured 14-day crash course.

## 🎯 Project Overview

This platform is designed to help students refresh their C++ knowledge and build confidence in DSA problem-solving. It follows a carefully structured 14-day plan that focuses on:

- **Syntax Repair** (Days 1-2)
- **Arrays & Vectors** (Days 3-4)
- **Strings** (Days 5-6)
- **Recursion** (Day 7)
- **Sorting & Searching** (Days 8-9)
- **DSA Pattern Problems** (Days 10-11)
- **Class-Level Practice** (Days 12-13)
- **Confidence Day** (Day 14)

## ✨ Features

- 📅 **14-Day Structured Learning Plan** - Follow a day-by-day curriculum
- 💻 **Interactive Code Editor** - Practice coding with syntax highlighting
- 🤖 **AI Assistant** - Get help from a friendly chai vendor AI
- 📊 **Progress Tracking** - Track your progress through localStorage
- 🎨 **Chai-Themed UI** - Beautiful, warm, and encouraging interface
- 💾 **Code Saving** - Save your code snippets for each problem
- ✅ **Problem Completion** - Mark problems as solved

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd chai-and-code
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Storage**: localStorage (browser-only, no backend)

## 📁 Project Structure

```
chai-and-code/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with day counter
│   │   ├── DayProgress.jsx      # 14-day progress tracker
│   │   ├── ProblemCard.jsx      # Individual problem card
│   │   ├── CodeEditor.jsx       # Code editor modal
│   │   └── AIChat.jsx           # AI assistant chat
│   ├── data/
│   │   └── learningPlan.js      # 14-day plan data
│   ├── services/
│   │   ├── storageService.js    # localStorage management
│   │   └── aiService.js         # AI integration (placeholder)
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Theme Colors

- **Chai Brown**: `#6F4E37`
- **Milk Cream**: `#FFF3E0`
- **Cardamom Green**: `#4CAF50`
- **Tea Leaf Dark**: `#3E2723`

## 🧠 Learning Methodology

The platform follows a specific training method for every problem:

1. **Write logic in English** - "take input, loop, check condition, print result"
2. **Write skeleton** - Basic code structure
3. **Fill inside slowly** - Complete the implementation step by step

This approach helps eliminate "blank screen fear" and builds confidence.

## 🤖 AI Integration

The AI service (`src/services/aiService.js`) is currently set up with a mock response. To integrate with a real AI API:

1. Choose your AI provider (OpenAI, Gemini, or Ollama)
2. Update the `sendMessage` function in `aiService.js`
3. Add your API key (use environment variables for security)

Example integration code is commented in the file.

## 📝 Features in Development

- [ ] Real code compilation and execution
- [ ] Test case validation
- [ ] More problems per day
- [ ] Dark mode toggle
- [ ] Export progress report
- [ ] Voice input for AI chat

## 🎯 Daily Target

Students should aim to:
- Write **5-8 programs** per day
- Compile and fix errors independently
- Spend **1.5-2 hours** daily

## 💡 Key Principles

- **Logic first, code second**
- **Fix errors one at a time**
- **Never rewrite whole code**
- **Learn from mistakes**
- **Build confidence through practice**

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

Built with ☕ and ❤️ to help students overcome coding fears and build confidence in C++ DSA.

---

**Remember**: You are not bad at logic. You just need practice with syntax, error handling, and confidence. This platform helps with exactly that! ☕
