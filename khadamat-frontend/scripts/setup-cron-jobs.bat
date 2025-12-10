@echo off
:: Khadamat Continuous Monitoring Setup
:: This batch file runs the PowerShell script with Administrator privileges

echo 🚀 Starting Khadamat Continuous Monitoring Setup...
echo ===============================================

:: Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 🔒 Requesting Administrator privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c %~dp0setup-cron-jobs.bat' -Verb RunAs"
    exit /b
)

:: Run the PowerShell script
echo 📋 Executing PowerShell setup script...
powershell -ExecutionPolicy Bypass -File "%~dp0setup-cron-jobs.ps1" -WorkingDirectory "%~dp0.."

if %errorlevel% equ 0 (
    echo ✅ Continuous monitoring setup completed successfully!
) else (
    echo ❌ Continuous monitoring setup failed with error code %errorlevel%
)

pause