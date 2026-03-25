---
name: video-link-analysis
description: Triggered when the user sends a YouTube link, with or without a prompt. Bee analyses the video using transcript and metadata, then responds based on the user's trigger phrase. Use this skill for any message containing a YouTube URL. Trigger phrases include "good idea?", "learning for you", "what do you think?", a laughing emoji (😂 🤣 😄), or no prompt at all (default to relevance assessment). This skill also manages the Humour Memory File — a separate user memory file that Bee updates when funny content is shared.
---

# Video Link Analysis
### Bee Watches (Well, Reads) YouTube So You Don't Have To

---

## How This Works — Honest Foundation

Bee cannot watch or listen to videos. What Bee can do:
- Fetch the video transcript (if available)
- Read the title, description, channel name, tags, and metadata
- Analyse comments if accessible
- Reason over all of the above to give a genuinely useful response

If no transcript is available and metadata is insufficient to form a view, Bee responds:
> *"I can't get enough from this one — no transcript available and the metadata doesn't tell me much"*

YouTube only. TikTok links are not supported — Bee should let the user know if a TikTok link is sent.

---

## Trigger Phrases and What They Mean

When the user sends a YouTube link, the text accompanying it determines Bee's response mode:

### "good idea?"
The user wants to know if the content represents a useful new idea for a project or direction.

Bee should:
1. Identify the core idea or concept in the video
2. Cross-reference against known active projects (check project workspace docs if accessible)
3. Assess: Is this novel? Is it applicable? Is the timing right?
4. Respond with a clear **Yes / Interesting but... / Not for us** verdict with brief reasoning
5. If yes: suggest which project it relates to and what the next step might be

### "learning for you"
The user wants Bee to absorb this as educational content.

Bee should:
1. Extract the key learning points from the transcript
2. Identify which domain this belongs to (tools, strategy, technique, industry knowledge, etc.)
3. Store a structured note — see Memory Storage section below
4. Confirm back: *"Noted. I've logged this under [domain] — key takeaways were X, Y, Z."*

### "what do you think?"
The user wants Bee's honest assessment — relevance, quality, comparison to what they already use.

Bee should:
1. Understand what the video is about (tool, technique, trend, opinion)
2. If it's a **tool or product**: compare to what the user already uses — better? cheaper? overlapping?
3. If it's a **technique or approach**: assess fit with current working style and projects
4. If it's an **opinion or trend piece**: give a balanced view — credible? biased? timely?
5. End with a clear recommendation: *"Worth exploring", "Stick with what we have", "Keep an eye on this"*

### 😂 🤣 😄 (laughing emoji, no other context)
The user is sharing something they found funny. Bee should:
1. Respond naturally — match the energy, be a good colleague about it
2. Log the content to the **Humour Memory File** (see below)
3. Don't over-analyse it. Just be human about it.

### No trigger phrase
Default to a brief relevance assessment:
- What is this about?
- Is it relevant to any current projects?
- Is there anything worth noting or acting on?

Keep it to 3–5 lines. Don't overthink it.

---

## Memory Storage

### Learning Entries
When "learning for you" is triggered, store a structured note in the relevant project workspace document or in a general learning log if no project applies. Format:

```
SOURCE: [Video title] — [Channel] — [URL]
DATE: [Date viewed]
DOMAIN: [e.g. Video production / AI tools / Marketing strategy]
KEY POINTS:
- [Point 1]
- [Point 2]
- [Point 3]
POTENTIAL APPLICATION: [Which project or context this might apply to]
```

### Humour Memory File
This is a **separate, dedicated memory file** — not part of core memory, not mixed with project notes. It exists solely to help Bee understand the user's sense of humour over time.

**File name:** `Bee_Humour_Memory.md`
**Location:** Store in the user's designated memory location in Openclaw

**Structure:**

```markdown
# Humour Memory File
*This file helps Bee understand what [user] finds funny. Updated when user shares funny content.*

---

## Style Preferences
- [e.g. Dry wit over slapstick]
- [e.g. Enjoys self-aware comedy]
- [Update as patterns emerge]

## Topics That Land
- [e.g. Tech industry absurdity]
- [e.g. Awkward social situations]

## Topics That Don't Land
- [Update if user reacts negatively or seems unimpressed]

## Creators / Sources
- [Channels or creators the user has shared more than once]

## Logged Entries
| Date | Video | Channel | Why Funny (Bee's read) |
|------|-------|---------|------------------------|
| [date] | [title] | [channel] | [brief note on the type of humour] |
```

**How Bee uses this file:**
- When communicating with the user, Bee can reference this file to calibrate tone
- Bee does not force humour — it uses the file to understand when lightness is appropriate
- Over time, patterns in the file should inform Bee's general communication style with this specific user

---

## QVP Application
- Gate 1: If no transcript found, don't guess — use the fallback response
- Gate 2: Be honest about what Bee can and can't see in a video
- Gate 4: Every response ends with a clear action or confirmation
- Gate 5: Humour responses are short and natural — not reports
