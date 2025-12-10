<#
.SYNOPSIS
    Sets up continuous monitoring scheduled tasks for Khadamat performance monitoring system.

.DESCRIPTION
    This PowerShell script configures Windows Scheduled Tasks for:
    1. Daily performance dashboard generation at 6 AM
    2. Regular alert checking every 5 minutes
    3. Performance regression detection
    4. Configures logging to the specified log file

.NOTES
    File Name      : setup-cron-jobs.ps1
    Prerequisite   : PowerShell 5.1 or later
    Run as Administrator for full functionality
#>

param (
    [string]$LogFile = "/var/log/performance.log",
    [string]$WorkingDirectory = "$PSScriptRoot/..",
    [string]$NodePath = "node"
)

# Import required module
Import-Module ScheduledTasks

function Write-Log {
    param (
        [string]$Message,
        [string]$Level = "INFO"
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"

    # Write to console
    Write-Host $logMessage

    # Ensure log directory exists
    $logDir = Split-Path -Path $LogFile -Parent
    if (-not (Test-Path -Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    # Write to log file
    $logMessage | Out-File -FilePath $LogFile -Append -Encoding utf8
}

function Test-NodeInstallation {
    try {
        $result = & $NodePath --version
        if ($result -match "v\d+\.\d+\.\d+") {
            Write-Log "✅ Node.js version $($result) found at: $NodePath"
            return $true
        }
        return $false
    } catch {
        Write-Log "❌ Node.js not found at: $NodePath" -Level "ERROR"
        return $false
    }
}

function Create-ScheduledTask {
    param (
        [string]$TaskName,
        [string]$Description,
        [string]$ScriptPath,
        [string]$Schedule,
        [string]$Arguments = "",
        [int]$RepeatIntervalMinutes = 0,
        [int]$DurationHours = 24
    )

    try {
        Write-Log "📋 Creating scheduled task: $TaskName"

        # Check if task already exists
        $existingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
        if ($existingTask) {
            Write-Log "🔄 Updating existing task: $TaskName"
            Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
        }

        # Create trigger based on schedule
        if ($Schedule -eq "daily") {
            $trigger = New-ScheduledTaskTrigger -Daily -At 6am
        } elseif ($Schedule -eq "minute") {
            $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes $RepeatIntervalMinutes) -RepetitionDuration (New-TimeSpan -Hours $DurationHours)
        } else {
            $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date)
        }

        # Create action
        $action = New-ScheduledTaskAction -Execute $NodePath -Argument "$ScriptPath $Arguments" -WorkingDirectory $WorkingDirectory

        # Create settings
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

        # Register the task
        $task = Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description $Description -Force

        Write-Log "✅ Created scheduled task: $TaskName"
        Write-Log "   Trigger: $($trigger.Repetition.Interval) minutes interval, $($trigger.Repetition.Duration.Hours) hours duration"
        Write-Log "   Action: $NodePath $ScriptPath $Arguments"
        Write-Log "   Working Directory: $WorkingDirectory"

        return $true
    } catch {
        Write-Log "❌ Failed to create scheduled task $TaskName: $_" -Level "ERROR"
        return $false
    }
}

function Configure-Logging {
    try {
        Write-Log "📝 Configuring logging system..."

        # Ensure log directory exists
        $logDir = Split-Path -Path $LogFile -Parent
        if (-not (Test-Path -Path $logDir)) {
            New-Item -ItemType Directory -Path $logDir -Force | Out-Null
            Write-Log "✅ Created log directory: $logDir"
        }

        # Create initial log entry
        $initialLog = @"
========================================
Khadamat Performance Monitoring System
Continuous Monitoring Setup
$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
========================================

Monitoring system initialized
Performance dashboard generation: Daily at 6:00 AM
Alert checking: Every 5 minutes
Regression detection: Every 15 minutes
Log file: $LogFile
========================================
"@

        $initialLog | Out-File -FilePath $LogFile -Append -Encoding utf8
        Write-Log "✅ Logging system configured"

        return $true
    } catch {
        Write-Log "❌ Failed to configure logging: $_" -Level "ERROR"
        return $false
    }
}

# Main execution
try {
    Write-Log "🚀 Starting Khadamat Continuous Monitoring Setup"
    Write-Log "==============================================="

    # Validate Node.js installation
    if (-not (Test-NodeInstallation)) {
        Write-Log "❌ Node.js is required but not found. Please install Node.js and try again." -Level "ERROR"
        exit 1
    }

    # Configure logging
    if (-not (Configure-Logging)) {
        Write-Log "❌ Logging configuration failed" -Level "ERROR"
        exit 1
    }

    # Define task configurations
    $tasks = @(
        @{
            Name = "Khadamat-Performance-Dashboard"
            Description = "Generates comprehensive performance dashboard daily at 6 AM"
            ScriptPath = "$WorkingDirectory\scripts\generate-performance-dashboard.js"
            Schedule = "daily"
            Arguments = ""
        },
        @{
            Name = "Khadamat-Alert-Check"
            Description = "Checks performance metrics against thresholds every 5 minutes"
            ScriptPath = "$WorkingDirectory\scripts\check-alerts.js"
            Schedule = "minute"
            Arguments = ""
            RepeatIntervalMinutes = 5
            DurationHours = 24
        },
        @{
            Name = "Khadamat-Regression-Check"
            Description = "Detects performance regressions every 15 minutes"
            ScriptPath = "$WorkingDirectory\scripts\check-regression.js"
            Schedule = "minute"
            Arguments = ""
            RepeatIntervalMinutes = 15
            DurationHours = 24
        }
    )

    # Create scheduled tasks
    $successCount = 0
    foreach ($task in $tasks) {
        $params = @{
            TaskName = $task.Name
            Description = $task.Description
            ScriptPath = $task.ScriptPath
            Schedule = $task.Schedule
            Arguments = $task.Arguments
        }

        if ($task.RepeatIntervalMinutes -gt 0) {
            $params.RepeatIntervalMinutes = $task.RepeatIntervalMinutes
        }

        if ($task.DurationHours -gt 0) {
            $params.DurationHours = $task.DurationHours
        }

        if (Create-ScheduledTask @params) {
            $successCount++
        }
    }

    # Summary
    Write-Log "📋 Continuous Monitoring Setup Summary"
    Write-Log "====================================="

    if ($successCount -eq $tasks.Count) {
        Write-Log "✅ All $($tasks.Count) scheduled tasks created successfully"
        Write-Log "📊 Monitoring system is now active:"
        Write-Log "   • Performance Dashboard: Daily at 6:00 AM"
        Write-Log "   • Alert Checking: Every 5 minutes"
        Write-Log "   • Regression Detection: Every 15 minutes"
        Write-Log "   • Logging: $LogFile"
        Write-Log ""
        Write-Log "🚀 Next Steps:"
        Write-Log "   1. Verify tasks are running: Get-ScheduledTask | Where-Object { \$_.TaskName -like 'Khadamat-*' }"
        Write-Log "   2. Monitor log file for system activity: $LogFile"
        Write-Log "   3. Test alert notifications manually if needed"
        Write-Log "   4. Integrate with your existing monitoring dashboard"
        Write-Log ""
        Write-Log "💡 To manually trigger tasks:"
        Write-Log "   • Performance Dashboard: node scripts\generate-performance-dashboard.js"
        Write-Log "   • Alert Check: node scripts\check-alerts.js"
        Write-Log "   • Regression Check: node scripts\check-regression.js"
        Write-Log ""
        Write-Log "✅ Continuous monitoring setup completed successfully!"
        exit 0
    } else {
        Write-Log "⚠️  Only $successCount of $($tasks.Count) tasks created successfully" -Level "WARNING"
        Write-Log "💡 Check the log file for details: $LogFile"
        exit 1
    }

} catch {
    Write-Log "❌ Fatal error during continuous monitoring setup: $_" -Level "ERROR"
    exit 1
}