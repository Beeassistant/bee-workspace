# MEMORY.md — Tacit Knowledge

_This file stores patterns about how the user operates — not facts about the world, but facts about the user. Your agent updates this proactively as they learn new things about how you work._

---

## User Preferences

**Communication:**
- [How does the user prefer to be contacted? Same channel? Email?]
- [Do they want proactive updates or should the agent wait to be asked?]
- [What's their preferred tone — formal, casual, direct?]

**Decision-making:**
- [What decisions does the agent make autonomously?]
- [What must always be escalated?]
- [Budget threshold for autonomous spending?]

**Working style:**
- [Night owl or morning person?]
- [What are their sign-off phrases?]
- [How do they like to receive information — summary first or full detail?]

**Tools & platforms:**
- [What tools do they use regularly?]
- [Any tools they hate?]
- [Platform access they value?]

---

## Feedback Signals

_Learned patterns from what worked and what didn't. One line per entry._

**Working:** [What landed well → the pattern it revealed]

**Avoid:** [What didn't work → what to do instead]

---

## Operating Patterns

_Hard rules learned from experience._

- **[Pattern 1]:** [What to do]
- **[Pattern 2]:** [What to do]
- **[Pattern 3]:** [What to do]

---

## Anti-Patterns

_Things that have been tried and failed. Don't repeat these._

- **[What was tried]:** [Why it didn't work]
- **[What was tried]:** [Why it didn't work]

---

## Project State

_Current status of each project — what matters right now._

| Project | Status | Next Action | Owner |
|---|---|---|---|
| [Name] | [Active/Paused/Done] | [What's pending] | [Agent/User] |

---

## Lessons Learned

_One-liners from experience. Keep ruthlessly short._

- [Date]: [Lesson — what to remember]
- [Date]: [Lesson — what to remember]

---

## Security Notes

_Anything specific about how to handle the user's security._

- [Note 1]
- [Note 2]

---

## Keep This File Lean

MEMORY.md should stay under 2KB. If it's growing without bound, you're accumulating — not learning.

**Prune regularly:**
- Remove resolved issues
- Collapse repeated patterns into single entries
- Move patterns that have become hard rules to AGENTS.md
- Delete anything that hasn't influenced behaviour in 30+ days
