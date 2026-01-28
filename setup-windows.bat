@echo off
REM Windows setup script for Job Scam Detector

echo ====================================
echo Job Scam Detector - Windows Setup
echo ====================================

REM Create .env files
echo Creating environment files...

cd backend
if not exist .env (
    copy .env.example .env
    echo Created backend\.env
)

cd ..\frontend
if not exist .env (
    copy .env.example .env
    echo Created frontend\.env
)

cd ..

REM Check if MongoDB is running
echo.
echo Checking MongoDB connection...
mongosh --eval "db.adminCommand('ping')" >nul 2>&1

if %errorlevel% equ 0 (
    echo ✅ MongoDB is running
) else (
    echo ⚠️ MongoDB is not running
    echo Please start MongoDB service:
    echo   - Open Services (services.msc)
    echo   - Find "MongoDB Server"
    echo   - Right-click and Start
    echo Or use: net start MongoDB
)

echo.
echo Setup complete! Next steps:
echo.
echo 1. Open terminal 1:
echo    cd backend
echo    npm install
echo    npm run dev
echo.
echo 2. Open terminal 2:
echo    cd frontend
echo    npm install
echo    npm start
echo.
pause
