@echo off
echo ========================================
echo AI_Nikitka93 Portfolio - Clean Build Artifacts
echo ========================================
echo.

echo [WARN] This will delete:
echo   - node_modules/
echo   - .next/
echo.
echo Your source code, content, and package-lock.json will NOT be deleted.
echo.

set /p confirm="Continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo [INFO] Cancelled.
    pause
    exit /b 0
)

echo.
echo [INFO] Cleaning build artifacts...

if exist "node_modules\" (
    echo [INFO] Removing node_modules...
    rmdir /s /q "node_modules"
    if errorlevel 1 (
        echo [ERROR] Failed to remove node_modules (files may be in use)
        pause
        exit /b 1
    )
    echo [OK] node_modules removed
)

if exist ".next\" (
    echo [INFO] Removing .next...
    rmdir /s /q ".next"
    if errorlevel 1 (
        echo [ERROR] Failed to remove .next
        pause
        exit /b 1
    )
    echo [OK] .next removed
)

echo.
echo ========================================
echo [OK] Clean complete!
echo ========================================
echo.
echo To reinstall: run install.bat
echo.
pause
