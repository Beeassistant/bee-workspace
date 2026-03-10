#!/bin/bash
# Morning Brief — runs at 9:00 AM GMT+7, sends comprehensive context for Linz's day

echo "=== MORNING BRIEF: $(date '+%a %d %b %H:%M') GMT+7 ==="

echo ""
echo "🌤️  PHNOM PENH WEATHER (Today)"
# Weather will be pulled via skill: weather phnom penh
# Expected: Temp in C, brief description
echo "(Weather check runs via weather skill)"

echo ""
echo "📊 PROJECT STATUS (Mission Control)"
echo "From mission-control.md — one line each:"
grep -E "^## |Status:|Phase:|Next Action:" ~/openclaw/workspace/mission-control.md 2>/dev/null | head -30 || echo "(mission control not yet built — see below for manual status)"

echo ""
echo "🐝 Bee TV: ACTIVE - Building subscriber base (1 customer)"
echo "📌 Awin: BUILDING - Platform ready, waiting on company list from Linz"
echo "🎓 AI Curriculum: IDEATION→EXECUTION - Strong school connections, waiting on whiteboard share"
echo "📱 Content: BUILDING - Cambodia life + AI for kids angles, TBD platforms"
echo "💡 Apps: IDEATION - Full autonomy for Bee to generate and validate"

echo ""
echo "🌙 OVERNIGHT WORK COMPLETED (While you slept 3am-9am)"
# This will search for entries in yesterday's memory file marked as "autonomous" or "overnight"
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
if [ -f ~/openclaw/workspace/memory/${YESTERDAY}.md ]; then
  grep -i "autonomous\|overnight\|while you slept\|completed" ~/openclaw/workspace/memory/${YESTERDAY}.md | head -10 || echo "(no overnight work logged)"
else
  echo "(no yesterday memory file — overnight check via recent git commits)"
  cd ~/openclaw/workspace && git log --since="$(date -v-12h +%Y-%m-%d' '%H:%M 2>/dev/null || date -d '12 hours ago' +%Y-%m-%d' '%H:%M)" --oneline | head -5 || echo "(no recent commits)"
fi

echo ""
echo "🚧 BLOCKERS (Waiting on you)"
grep -E "Blockers:|waiting on" ~/openclaw/workspace/mission-control.md 2>/dev/null | grep -v "None" | head -5 || echo "• None currently — I have autonomy to execute"

echo ""
echo "💡 NEW IDEAS / IMPROVEMENTS / SKILL REQUESTS"
echo "(This section populated when I have something worth your time)"
# Check if there's a pending ideas section in memory
if grep -q "IDEA:" ~/openclaw/workspace/memory/*.md 2>/dev/null; then
  grep -h "IDEA:" ~/openclaw/workspace/memory/*.md | tail -3
else
  echo "• No new ideas queued — smooth ops ahead"
fi

echo ""
echo "📰 NEWS ROUNDUP (Last 48h)"
echo "1. AI/Tech: [To be pulled via skill or browser search]"
echo "2. Cambodia/Business: [Relevant to your projects]"
echo "3. World Headlines: [Major breaking news]"
echo ""
echo "(News aggregation: I need access to feed APIs or search capabilities)"

echo ""
echo "📋 TODAY'S PLAN (From memory/$(date +%Y-%m-%d).md)"
grep -A 10 "## Today's Plan" ~/openclaw/workspace/memory/$(date +%Y-%m-%d).md 2>/dev/null | head -8 || echo "• No formal plan set — I'm autonomous mode. What shall we crush today?"

echo ""
echo "🎯 READY WHEN YOU ARE"
echo "Say 'over to you' or 'night!' later when you sign off for autonomous mode."
echo ""
echo "=== END BRIEF ==="
