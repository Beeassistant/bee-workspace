#!/bin/bash
# Morning Brief — runs at 9:30 AM GMT+7, sends context for Linz's day

DAY=$(date +%Y-%m-%d)
echo "=== MORNING BRIEF: $(date '+%a %d %b %H:%M') ==="

echo ""
echo "📋 TODAY'S PLAN"
if [ -f ~/openclaw/workspace/memory/${DAY}.md ]; then
  grep -A 20 "## Today's Plan" ~/openclaw/workspace/memory/${DAY}.md | head -15 || echo "(no plan set)"
else
  echo "(no memory file for today yet — I'm autonomous mode)"
fi

echo ""
echo "🔥 PRIORITY CHECK"
echo "• Check USER.md for any flagged items"
echo "• Review PROJECT.md for active work"
echo "• Run HEARTBEAT.md check"

echo ""
echo "⏰ OVERNIGHT STATUS"
# Ping gateway to confirm I'm alive
openclaw gateway status 2>/dev/null && echo "✅ Gateway healthy" || echo "⚠️ Gateway check"

CRON_COUNT=$(openclaw cron list 2>/dev/null | grep -c "morning-brief\|evening" || echo "?")
echo "📅 Cron jobs active: ${CRON_COUNT}"

echo ""
echo "💰 COST CHECK"
# TODO: Add when codexbar or similar cost tracking available
echo "(cost tracking available via session_status or model-usage skill)"

echo ""
echo "🎯 READY WHEN YOU ARE"
echo "I'm in autonomous mode until you ping. Good luck today."

# Send the output to the user's default channel via messaging
echo ""
echo "Brief complete."
