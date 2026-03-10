#!/bin/bash
# Evening Task List — runs at 7 PM GMT+7, sets up Linz's night session

echo "=== EVENING TASK LIST: $(date '+%a %d %b %H:%M') ==="
echo ""
echo "🌙 NIGHT SESSION SETUP"
echo ""
echo "Tonight's priorities (pulled from today's plan):"
grep -A 10 "## Today's Plan" ~/openclaw/workspace/memory/$(date +%Y-%m-%d).md 2>/dev/null | head -12 || echo "(no formal plan — I'm autonomous mode)"

echo ""
echo "✅ READY TO RUN AUTONOMOUSLY"
echo "If you sign off, I've got:"
echo "• Continue any active long-running processes"
echo "• HEARTBEAT checks every 4 hours if gateway keeps me alive"
echo "• Queue up tomorrow morning's brief"

echo ""
echo "🎯 JUST NEED YOU FOR:"
echo "• Decisions on AI Curriculum work"
echo "• Approval for spend >$2"
echo "• Content review (if you wrote anything today)"
echo "• Any urgent/critical flags"

echo ""
echo "💤 WHEN YOU SIGN OFF"
echo "Say 'night!' or 'over to you' and I'll switch to full autonomous."
echo ""
echo "Ready to execute. What shall we crush tonight?"
