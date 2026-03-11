#!/bin/bash
# Morning Brief — runs at 9 AM GMT+7 via launchd

BOT_TOKEN="8443094993:AAHOfwS0WbbuXBb0dmQxHUKQajabjt6gDoA"
CHAT_ID="775618616"

MSG="🐝 MORNING BRIEF — $(date '+%A, %B %d')

☀️ $(curl -s 'wttr.in/Phnom+Penh?format=%l:+%C,+%t,+%h+humidity' 2>/dev/null || echo 'Weather: Unavailable')

📊 Projects:
• Bee TV — 1 customer, referral growth active
• Awin — Platform ready, awaiting company list
• AI Curriculum — School connections strong, need whiteboard
• Content — SEO + UGC docs ready for deployment
• Apps — Autonomous ideation mode

🎯 Today's Focus:
$(grep -A 5 "## Today's Plan" ~/.openclaw/workspace/memory/$(date +%Y-%m-%d).md 2>/dev/null | grep "^\- \[" | sed 's/- \[ \]/•/' | head -3 || echo "• Review priorities with Linz")"

# Send via Telegram API
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -d "chat_id=${CHAT_ID}" \
  -d "text=${MSG}" \
  -d "parse_mode=Markdown" 2>&1 | grep -q '"ok":true' && echo "✅ Sent" || echo "❌ Failed"
