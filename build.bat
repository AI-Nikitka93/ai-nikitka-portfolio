@echo off
echo ========================================
echo AI_Nikitka93 Portfolio - Production Build
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

echo [INFO] Running lint...
npm run lint
if errorlevel 1 (
    echo.
    echo [ERROR] Lint failed!
    pause
    exit /b 1
)

echo.
echo [INFO] Running TypeScript typecheck...
npm run typecheck
if errorlevel 1 (
    echo.
    echo [ERROR] Typecheck failed!
    pause
    exit /b 1
)

echo.
echo [INFO] Building production bundle...
npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed!
    echo Check the error messages above.
    pause
    exit /b 1
)

echo.
echo [INFO] Running static release audit...
npm run audit:release
if errorlevel 1 (
    echo.
    echo [ERROR] Release audit failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo [OK] Build complete!
echo ========================================
echo.
echo Build output is in .next/ directory
echo To start production server: npm run start
echo.
pause
