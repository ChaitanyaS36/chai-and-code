@echo off
REM Start both frontend and backend in development mode (Windows)

echo ☕ Starting Chai ^& Code Full Stack...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Start backend
echo 🚀 Starting backend server...
cd server
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    call npm install
)

REM Start backend in new window
start "Chai Backend" cmd /k "npm run dev"
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend...
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    call npm install
)

REM Start frontend in new window
start "Chai Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting...
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
echo Close the windows to stop the servers
pause
