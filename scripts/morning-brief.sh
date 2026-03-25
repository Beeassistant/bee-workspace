#!/bin/bash
openclaw agent \
  --agent main \
  --message "MORNING BRIEF — send exactly ONE message with this structure:

1. Funny good morning — ONE sentence only
2. Morning Brief + today's date (eg Fri 13 March)
3. Weather: run 'curl -s wttr.in/Phnom+Penh?format=%t+%C' and show the result
4. Project Updates — list EACH project separately with a SHORT status. Current projects are:
   - Bee TV (streaming/content platform)
   - Affiliate Marketing / Awin (separate from Bee TV)
   - Bee's Personal Project (the $1K revenue challenge — this is BEE'S OWN project, completely separate from everything else)
   - Any other active projects from memory
   Do NOT merge projects together. Each gets its own line.
5. Night Shift: any work completed overnight with links
6. Blockers: what you need from me
7. News: 3 headlines (1 AI/tech, 1 world, 1 Cambodia) — HEADLINE + link. Use credible sources only. Never link to homepages.

Send this as ONE message only. Do NOT repeat or duplicate any section." \
  --deliver \
  --channel telegram \
  --reply-to "775618616" \
  --timeout 300
