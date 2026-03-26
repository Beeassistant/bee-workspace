#!/bin/bash
# Add daily memory file cron job to OpenClaw

MEMORY_DIR="/Users/beeassistant/.openclaw/workspace/memory"

openclaw cron add \
  --name "daily-memory-file" \
  --description "Creates daily memory file if it doesn't exist" \
  --cron "0 0 * * *" \
  --tz "Asia/Phnom_Penh" \
  --session isolated \
  --message "Check if today's memory file exists. Run: ls /Users/beeassistant/.openclaw/workspace/memory/\$(date +%Y-%m-%d).md

If the file does NOT exist, create it at /Users/beeassistant/.openclaw/workspace/memory/\$(date +%Y-%m-%d).md with this template (the agent must evaluate the \$(date) commands itself when creating the file):

---
title: Memory — \$(date +%Y-%m-%d)
---

## Date
\$(date +%A, %B %d, %Y)

## Today's Plan



## Execution Log



## Notes

---

Do NOT announce the result. Just create the file silently if it doesn't exist." \
  --timeout-seconds 30 \
  --no-deliver
