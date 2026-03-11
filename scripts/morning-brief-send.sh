#!/bin/bash
# Morning Brief — runs at 9 AM GMT+7 via launchd

BOT_TOKEN="8443094993:AAHOfwS0WbbuXBb0dmQxHUKQajabjt6gDoA"
CHAT_ID="775618616"

cd ~/.openclaw/workspace

WEATHER=$(curl -s 'wttr.in/Phnom+Penh?format=%C+%t' 2>/dev/null | sed 's/ //g' || echo "Weather unavailable")

# Check for blockers in today's memory
BLOCKERS=$(grep -A 10 "## Blockers\|### Blockers\|waiting on\|pending from" memory/$(date +%Y-%m-%d).md 2>/dev/null | grep "^- \|• " | head -3 | sed 's/^- /• /' || echo "")

# ========== AI/TECH NEWS ==========
# Try multiple sources for tech advancements
TECH1=""; TECH1_URL=""; TECH2=""; TECH2_URL=""

# Source 1: TechCrunch latest
TC_RSS=$(curl -s 'https://techcrunch.com/category/artificial-intelligence/feed/' 2>/dev/null)
if [ -n "$TC_RSS" ]; then
    TECH1=$(echo "$TC_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//' | sed "s/&#8217;/'/g; s/&#8220;/\"/g; s/&#8221;/\"/g")
    TECH1_URL=$(echo "$TC_RSS" | grep -o '<link>[^<]*</link>' | sed -n '2p' | sed 's/<link>//;s/<\/title>//;s/<link>//;s/<\/link>//' | sed 's/ //g')
fi

# Source 2: Ars Technica
if [ -z "$TECH2" ]; then
    ARS_RSS=$(curl -s 'http://feeds.arstechnica.com/arstechnica/technology-lab' 2>/dev/null)
    if [ -n "$ARS_RSS" ]; then
        TECH2=$(echo "$ARS_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//')
        TECH2_URL=$(echo "$ARS_RSS" | grep -o '<link rel="alternate" type="text/html" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"$//')
    fi
fi

# Fallback to HN if tech blogs fail
if [ -z "$TECH1" ]; then
    HN_JSON=$(curl -s 'https://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)&numericFilters=points>100&hitsPerPage=2' 2>/dev/null)
    TECH1=$(echo "$HN_JSON" | grep -o '"title":"[^"]*"' | head -1 | cut -d'"' -f4)
    TECH1_URL=$(echo "$HN_JSON" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
fi

# ========== WORLD NEWS ==========
# Try multiple sources, use first that works
WORLD1=""; WORLD1_URL=""; WORLD2=""; WORLD2_URL=""

# Source 1: Reuters
REUTERS_RSS=$(curl -s 'https://www.reutersagency.com/feed/?taxonomy=markets&post_type=reuters-best' 2>/dev/null)
if [ -n "$REUTERS_RSS" ]; then
    WORLD1=$(echo "$REUTERS_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//')
    WORLD1_URL=$(echo "$REUTERS_RSS" | grep -o '<link>[^<]*</link>' | sed -n '2p' | sed 's/<link>//;s/<\/link>//')
fi

# Source 2: BBC World
if [ -z "$WORLD2" ]; then
    BBC_RSS=$(curl -s 'http://feeds.bbci.co.uk/news/world/rss.xml' 2>/dev/null)
    if [ -n "$BBC_RSS" ]; then
        WORLD2=$(echo "$BBC_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//')
        WORLD2_URL=$(echo "$BBC_RSS" | grep -o '<link>[^<]*</link>' | sed -n '2p' | sed 's/<link>//;s/<\/link>//')
    fi
fi

# ========== CAMBODIA NEWS ==========
# Try Khmer Times first, fallback to Phnom Penh Post
KH1=""; KH1_URL=""

KH_TIMES_RSS=$(curl -s 'https://www.khmertimeskh.com/feed/' 2>/dev/null)
if [ -n "$KH_TIMES_RSS" ]; then
    KH1=$(echo "$KH_TIMES_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//')
    KH1_URL=$(echo "$KH_TIMES_RSS" | grep -o '<link>[^<]*</link>' | sed -n '2p' | sed 's/<link>//;s/<\/link>//')
fi

# Fallback to Phnom Penh Post
if [ -z "$KH1" ]; then
    KH_RSS=$(curl -s 'https://www.phnompenhpost.com/rss' 2>/dev/null)
    if [ -n "$KH_RSS" ]; then
        KH1=$(echo "$KH_RSS" | grep -o '<title>[^<]*</title>' | sed -n '2p' | sed 's/<title>//;s/<\/title>//')
        KH1_URL=$(echo "$KH_RSS" | grep -o '<link>[^<]*</link>' | sed -n '2p' | sed 's/<link>//;s/<\/link>//')
    fi
fi

# Build message
MSG="🐝 MORNING BRIEF — $(date '+%B %d')

☀️ $WEATHER

📊 Projects:
• Bee TV — 1 customer, referral growth active
• Awin — Platform ready, awaiting company list
• AI Curriculum — School connections strong, need whiteboard
• Content — SEO UGC docs ready for deployment
• Apps — Autonomous ideation mode"

# Add blockers section if any exist
if [ -n "$BLOCKERS" ]; then
    MSG="${MSG}

🚨 Blockers:
${BLOCKERS}"
else
    MSG="${MSG}

🚨 Blockers:
• None — ready to execute"
fi

# Add news section
MSG="${MSG}

📰 News:"

# AI/Tech (1-2 stories)
if [ -n "$TECH1" ] && [ -n "$TECH1_URL" ]; then
    MSG="${MSG}
• ${TECH1} — ${TECH1_URL}"
fi
if [ -n "$TECH2" ] && [ -n "$TECH2_URL" ]; then
    MSG="${MSG}
• ${TECH2} — ${TECH2_URL}"
fi

# World (1-2 stories)
if [ -n "$WORLD1" ] && [ -n "$WORLD1_URL" ]; then
    MSG="${MSG}
• ${WORLD1} — ${WORLD1_URL}"
fi
if [ -n "$WORLD2" ] && [ -n "$WORLD2_URL" ]; then
    MSG="${MSG}
• ${WORLD2} — ${WORLD2_URL}"
fi

# Cambodia (1 story)
if [ -n "$KH1" ] && [ -n "$KH1_URL" ]; then
    MSG="${MSG}
• ${KH1} — ${KH1_URL}"
else
    MSG="${MSG}
• [Cambodia news: Check Khmer Times manually]"
fi

# Send via Telegram API
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -d "chat_id=${CHAT_ID}" \
  -d "text=${MSG}" \
  -d "parse_mode=Markdown" \
  -d "disable_web_page_preview=true" 2>&1 | grep -q '"ok":true' && echo "✅ Sent" || echo "❌ Failed"
