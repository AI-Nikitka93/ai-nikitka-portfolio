@echo off
echo ========================================
echo AI_Nikitka93 Portfolio - Quick Start
echo ========================================
echo.

REM Preflight checks
echo [INFO] Running preflight checks...
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js: 
node --version
echo.

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Installing...
    call install.bat
    if errorlevel 1 (
        echo [ERROR] Installation failed!
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies installed
    echo.
)

REM Start development server
echo [INFO] Starting development server...
echo [INFO] Server will be available at http://localhost:3000
echo [INFO] Press Ctrl+C to stop
echo.
echo ========================================
echo.

npm run dev
