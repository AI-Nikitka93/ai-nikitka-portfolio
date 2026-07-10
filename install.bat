@echo off
echo ========================================
echo AI_Nikitka93 Portfolio - Installation
echo ========================================
echo.

REM Check Node.js
echo [INFO] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

REM Check npm
echo [INFO] Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
npm --version
echo.

REM Install dependencies
if exist "package-lock.json" (
    echo [INFO] Installing locked dependencies with npm ci...
    npm ci
) else (
    echo [INFO] package-lock.json not found. Installing dependencies with npm install...
    npm install
)
if errorlevel 1 (
    echo [ERROR] Dependency installation failed!
    pause
    exit /b 1
)
echo.

echo ========================================
echo [OK] Installation complete!
echo ========================================
echo.
echo Next steps:
echo   1. Run 'run.bat' to start development server
echo   2. Or run 'build.bat' to lint, typecheck, and create a production build
echo.
pause
