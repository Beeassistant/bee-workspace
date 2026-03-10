#!/bin/bash
# Backup OpenClaw workspace to ~/backups/openclaw/
# Run manually or via cron: 0 2 * * * /Users/beeassistant/.openclaw/workspace/scripts/backup-workspace.sh

set -e

WORKSPACE="/Users/beeassistant/.openclaw/workspace"
BACKUP_DIR="$HOME/backups/openclaw"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%dT%H-%M-%S)
BACKUP_FILE="$BACKUP_DIR/workspace-$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "[$TIMESTAMP] Starting workspace backup..."

# Create compressed archive of workspace (exclude .git internals, keep structure)
tar -czf "$BACKUP_FILE" \
  --exclude="$WORKSPACE/.git/objects" \
  --exclude="$WORKSPACE/.git/refs" \
  -C "$(dirname $WORKSPACE)" \
  "$(basename $WORKSPACE)"

SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
echo "[$TIMESTAMP] Backup created: $BACKUP_FILE ($SIZE)"

# Keep only last 30 daily backups
cd "$BACKUP_DIR"
ls -t workspace-*.tar.gz 2>/dev/null | tail -n +31 | xargs rm -f 2>/dev/null || true

KEPT=$(ls workspace-*.tar.gz 2>/dev/null | wc -l | tr -d ' ')
echo "[$TIMESTAMP] Retained $KEPT backups in $BACKUP_DIR"
echo "[$TIMESTAMP] Backup complete ✅"
