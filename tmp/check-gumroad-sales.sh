#!/bin/bash
# Check Gumroad sales in Gmail and notify via Telegram
# Run via cron: */15 * * * * /path/to/check-gumroad-sales.sh

ACCOUNT="bee.assistant1@gmail.com"
TELEGRAM_CHAT_ID="-1003624704773"
LAST_SALE_FILE="/Users/beeassistant/.openclaw/workspace/tmp/.last_gumroad_sale_id"
TELEGRAM_GROUP_THREAD="General"

# All Gumroad seller notification emails come from these addresses
# Sales: noreply@gumroad.com (usually "You made a sale!" type subjects)
SEARCH_QUERY="from:(noreply@gumroad.com OR support@gumroad.com) subject:(sale OR order OR purchase OR payment OR bought OR acquired)"

echo "=== Checking Gumroad sales at $(date) ==="

# Get the latest Gumroad emails matching sale-related subjects
LATEST_EMAILS=$(gog gmail search "$SEARCH_QUERY" --max 5 --account "$ACCOUNT" --plain 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "Error searching Gmail"
    exit 1
fi

if [ -z "$LATEST_EMAILS" ]; then
    echo "No Gumroad sale emails found (this is normal if no sales yet)"
    # Store current latest ID anyway to avoid false positive on first sale
    # Line 1 is header, line 2 is the first email
    ALL_GUMROAD=$(gog gmail search "from:gumroad.com" --max 1 --account "$ACCOUNT" --plain 2>/dev/null | sed -n '2p' | awk '{print $1}')
    if [ -n "$ALL_GUMROAD" ] && [ ! -f "$LAST_SALE_FILE" ]; then
        echo "$ALL_GUMROAD" > "$LAST_SALE_FILE"
        echo "Stored baseline ID: $ALL_GUMROAD"
    fi
    exit 0
fi

echo "Found emails:"
echo "$LATEST_EMAILS"

# Get the most recent email ID (first one in the list)
LATEST_ID=$(echo "$LATEST_EMAILS" | sed -n '2p' | awk '{print $1}')

if [ -z "$LATEST_ID" ]; then
    echo "Could not parse latest email ID"
    exit 1
fi

echo "Latest sale email ID: $LATEST_ID"

# Check if this is a new email (different from last check)
if [ -f "$LAST_SALE_FILE" ]; then
    LAST_ID=$(cat "$LAST_SALE_FILE")
    if [ "$LATEST_ID" = "$LAST_ID" ]; then
        echo "No new sales since last check (last ID: $LAST_ID)"
        exit 0
    fi
    echo "New sale detected! (previous: $LAST_ID, current: $LATEST_ID)"
else
    echo "First run - no previous ID stored"
fi

# Save the latest ID
echo "$LATEST_ID" > "$LAST_SALE_FILE"

# Get the email details
EMAIL_DETAILS=$(gog gmail get "$LATEST_ID" --account "$ACCOUNT" 2>/dev/null)

if [ $? -eq 0 ]; then
    # Extract relevant info
    SUBJECT=$(echo "$EMAIL_DETAILS" | grep "^subject:" | sed 's/^subject:	//')
    FROM=$(echo "$EMAIL_DETAILS" | grep "^from:" | sed 's/^from:	//')
    DATE=$(echo "$EMAIL_DETAILS" | grep "^date:" | sed 's/^date:	//')
    
    echo "Sale details: $SUBJECT from $FROM on $DATE"
    
    # Send Telegram notification
    MESSAGE="🛒 *GUMROAD SALE!* 🎉

$SUBJECT
From: $FROM
Date: $DATE

💰 View sales: https://gumroad.com/buzzassist/sales"
    
    openclaw message send --channel telegram --target "$TELEGRAM_CHAT_ID" --text "$MESSAGE" --thread-id "$TELEGRAM_GROUP_THREAD" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "Telegram notification sent!"
    else
        echo "Failed to send Telegram notification"
    fi
else
    echo "Could not fetch email details"
fi

echo "=== Done ==="
