# Google Workspace CLI Reference

## Quick Reference: gog (Current Tool) vs gws (Future Tool)

**Current: `gog` (OpenClaw native)**
- Already installed: `/opt/homebrew/bin/gog v0.12.0`
- Already authenticated (tested: Gmail send worked)
- Covers: Gmail, Calendar, Drive, Contacts, Sheets, Docs

**Future: `gws` (Google's new CLI)**
- Not installed yet (pre-v1.0, wait for stability)
- 40+ pre-built agent skills vs gog's limited set
- Will replace gog when v1.0 released

---

## Common Commands (gog syntax - similar to gws)

### Gmail
```bash
gog gmail send --to user@example.com --subject "Subject" --body "Body"
gog gmail list --query "is:unread from:boss@company.com"
gog gmail read <message_id>
```

### Calendar
```bash
gog calendar list --date 2026-03-11
gog calendar events --calendar primary --max 10
```

### Drive
```bash
gog drive list --query "name contains 'Budget'"
gog drive upload <file_path> --folder <folder_id>
gog drive download <file_id>
```

### Sheets
```bash
gog sheets read <spreadsheet_id> --range "Sheet1!A1:D10"
gog sheets append <spreadsheet_id> --range "Sheet1!A1" --values "val1,val2,val3"
```

---

## gws Commands (When Deployed)

### Installation (Hold until v1.0)
```bash
npm install -g @googleworkspace/cli
git clone https://github.com/googleworkspace/cli.git
cd cli
ln -s $(pwd)/skills/gws-* ~/.openclaw/skills/
```

### Authentication
```bash
gws auth login -s drive,gmail,calendar  # Never use 'recommended' preset
```

### Core Commands
```bash
# Gmail
gws gmail users messages list --params '{"userId": "me", "maxResults": 10}'
gws gmail users messages list --params '{"userId": "me", "q": "is:unread"}'

# Calendar
gws calendar events list --params '{"calendarId": "primary", "singleEvents": true, "maxResults": 10}'

# Drive
gws drive files list --params '{"pageSize": 10}'
gws drive files list --params '{"q": "name contains \"Q1\" and trashed = false"}'

# Sheets
gws sheets spreadsheets values get --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:D10"}'
```

---

## Workflows to Deploy (When Ready)

### 1. Morning Brief Enhancement
**Status:** Foundation ready, activation pending
**When:** After Awin pipeline and content workflow stabilized
**What it adds to current brief:**
- Today's calendar events (meetings, deadlines)
- Unread priority emails (filtered by sender)
- Daily agenda synthesis

### 2. Awin Lead Capture → Sheets
**Status:** Note for later (requires Awin setup first)
**Trigger:** Email matching lead criteria arrives
**Action:** Extract contact info, append to pipeline tracker
**Command pattern:**
```bash
gws gmail users messages get --params '{"userId": "me", "id": "MESSAGE_ID"}'
gws sheets spreadsheets values append --params '{"spreadsheetId": "PIPELINE_ID", "range": "Leads!A1"}'
```

### 3. AI Curriculum Meeting Notes → Drive
**Status:** Note for later (requires curriculum work to begin)
**Action:** Auto-create Docs from meeting notes, file in Drive folder
**Command pattern:**
```bash
gws docs documents create --json '{"title": "Notes - {{client}} - {{date}}"}'
gws drive files update --params '{"fileId": "{{doc_id}}", "addParents": "FOLDER_ID"}'
```

### 4. Model Armor (Security)
**Status:** Note for later (paid Google Cloud feature)
**Purpose:** Scan API responses for prompt injection attacks
**When to enable:** When reading untrusted emails at scale (Awin lead capture)
**Command:**
```bash
gws gmail users messages get --params '{"userId": "me", "id": "MSG_ID"}' --sanitize "projects/P/locations/L/templates/T"
```

---

## Troubleshooting

### 'Access blocked' during login
- Add yourself as Test User in OAuth consent screen

### Too many scopes error
- Use `-s` flag to select specific services, never 'recommended'

### gcloud not found
- Install from cloud.google.com/sdk OR use manual OAuth setup

---

## Decision Log

| Decision | Date | Rationale |
|----------|------|-----------|
| Use `gog` now, defer `gws` | 2026-03-10 | `gws` pre-v1.0 (breaking changes expected), `gog` already working |
| Gmail/Calendar in brief: LATER | 2026-03-10 | Foundation ready but activation pending workflow stabilization |
| Model Armor: LATER | 2026-03-10 | Paid feature, existing AGENTS.md defenses sufficient for now |

---

Last updated: 2026-03-10
