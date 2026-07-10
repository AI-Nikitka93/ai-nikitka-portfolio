@echo off
echo ========================================
echo AI_Nikitka93 Portfolio - Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [WARN] Dependencies not installed!
    echo [INFO] Running install.bat first...
    call install.bat
    if errorlevel 1 (
        echo [ERROR] Installation failed!
        pause
        exit /b 1
    )
)

echo [INFO] Starting development server...
echo [INFO] Server will be available at http://localhost:3000
echo [INFO] Press Ctrl+C to stop
echo.

npm run dev
