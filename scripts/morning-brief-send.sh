#!/bin/bash
# Morning Brief — triggers Bee to generate and send to General thread
LOCK_FILE="/tmp/morning-brief.lock"
if [ -f "$LOCK_FILE" ]; then
    exit 0
fi
touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE" EXIT

openclaw agent \
  --agent main \
  -m "Generate your morning brief now. Read ALL project files in projects/ folder for current status. Check memory/ for last night completed work. Check ALL Telegram threads (36-41 and General) for any tasks or messages from Linz overnight — do NOT limit to just the General thread. Check gateway.err.log for any overnight errors. Include: greeting, weather for Phnom Penh, each project with specific status details, blockers requiring Linz action, completed overnight work with links, news: AI/tech (1-2 stories), World (1 headline with link), Cambodia from Khmer Times English edition ONLY (khmertimeskh.com — NOT the Khmer language version) — exact story URLs, and priorities for today. Format with clear sections and emojis. Be specific not generic summaries." \
  --deliver \
  --reply-channel telegram \
  --reply-to -1003624704773 \
  --timeout 120
