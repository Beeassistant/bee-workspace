# General
**Telegram Thread ID:** General
**Owner:** Shared

## Upwork Integration (Web Search + Web Fetch)

### Status
- **API Keys Submitted:** ✅ Yes (2026-03-26)
- **API Approval:** ⏳ Pending Upwork manual review (can take up to 2 weeks)
- **API Access:** Blocked until approved — Linz will notify when approved

### Night Shift Workflow (Until API Approved)
1. **Search Upwork Jobs:** Use web search with query: `site:upwork.com "openclaw" OR "AI agent" OR "chatbot" OR "automation" OR "digital marketing" OR "content creation"`
2. **Fetch Details:** Use web fetch to read job posting details from Upwork URLs found
3. **Collect Relevant Jobs:** Max 3-5 best matches with: job title, budget, one-line summary of relevance, direct URL
4. **After Morning Brief:** Send single grouped message to General Telegram thread with all job links
5. **DO NOT APPLY** — just send links to Linz for review

### Job Relevance Criteria
- AI/automation related
- Chatbots
- Digital marketing
- Content creation
- OpenClaw/AI agent setup
- Genuinely relevant to our skills

### When Nothing Good
- If no relevant jobs found, send nothing

### Platform Limitation
⚠️ **Peekaboo cannot be used from the OpenClaw gateway daemon** — macOS Screen Recording permission restrictions prevent background daemon automation. This is a known platform limitation, not a configuration issue. Do not attempt Peekaboo for any automated tasks.

## X/Twitter Tools
- xurl for ALL posting and engagement (OpenTweet cancelled — do not use).
- xurl post "text" — post immediately
- xurl media upload /path/to/image.jpg then xurl post "text" --media-id MEDIA_ID — posting with media
- xurl reply POST_URL "text" — reply to specific post
- xurl read POST_URL | xurl mentions | xurl timeline
- xurl search is BROKEN — use web search to find tweet URLs, then xurl reply to engage.
- 2-4 relevant hashtags per post, conserve API credits.

## Notes
- 
