#!/bin/bash
# Cron Watchdog — runs hourly to verify main crons executed
# Uses Haiku (cheap) and alerts only if something failed

TODAY=$(date +%Y-%m-%d)
NOW=$(date '+%H:%M')
ALERTS=""

echo "=== CRON WATCHDOG CHECK: ${TODAY} ${NOW} ==="

# Check when morning-brief last ran (should be today after 9am)
if [ "$(date +%H)" -ge 10 ]; then
  # Only check after 10am (1 hour buffer after 9am run)
  MORNING_LAST=$(openclaw cron runs morning-brief 2>/dev/null | grep "${TODAY}" | head -1 || echo "")
  if [ -z "$MORNING_LAST" ]; then
    ALERTS="${ALERTS}⚠️ MORNING-BRIEF: Did not run today (expected by 9am)\n"
  fi
fi

# Check when evening-tasks last ran (should be today after 19:00)
if [ "$(date +%H)" -ge 20 ]; then
  # Only check after 8pm (1 hour buffer after 7pm run)
  EVENING_LAST=$(openclaw cron runs evening-tasks 2>/dev/null | grep "${TODAY}" | head -1 || echo "")
if [ -z "$EVENING_LAST" ]; then
    ALERTS="${ALERTS}⚠️ EVENING-TASKS: Did not run today (expected by 7pm)\n"
  fi
fi

# Check if backp ran (should run daily at 2am)
BACKUP_LOG="$HOME/backups/openclaw/backup.log"
if [ "$(date +%H)" -ge 4 ]; then
  # Check after 4am (2 hour buffer after 2am run)
  if [ -f "$BACKUP_LOG" ]; then
    BACKUP_TODAY=$(grep "$TODAY" "$BACKUP_LOG" | head -1 || echo "")
    if [ -z "$BACKUP_TODAY" ]; then
      ALERTS="${ALERTS}⚠️ BACKUP: Did not complete today (expected by 2am)\n"
    fi
  fi
fi

# Output result
if [ -z "$ALERTS" ]; then
  echo "✅ All crons healthy"
  echo "Morning-brief: scheduled 9am | Evening-tasks: scheduled 7pm | Backup: scheduled 2am"
  exit 0
else
  echo -e "$ALERTS"
  echo "ALERT: Send to Linz immediately"
  exit 1
fi
