#!/bin/bash
# Creates daily memory file if it doesn't exist
MEMORY_DIR="/Users/beeassistant/.openclaw/workspace/memory"
TODAY=$(date +%Y-%m-%d)
FILE="${MEMORY_DIR}/${TODAY}.md"

if [ ! -f "$FILE" ]; then
  DATE_FULL=$(date +"%A, %B %d, %Y")
  cat > "$FILE" << EOF
# Memory — ${TODAY}

## Date
${DATE_FULL}

## Today's Plan



## Execution Log



## Notes

EOF
  echo "Created memory file: $FILE"
else
  echo "Memory file already exists: $FILE"
fi
