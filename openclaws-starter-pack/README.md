# OpenClaw Starter Pack — README

_A complete setup kit for your OpenClaw AI agent. Everything you need to configure your agent from scratch._

---

## What's Included

This package contains 11 files — templates, configuration, and guides — for setting up your OpenClaw agent from scratch.

### Core Configuration Files

| File | Description | Size |
|------|-------------|------|
| **SOUL.md** | Your agent's persona — their voice, tone, boundaries, and emotional intelligence | ~5.6 KB |
| **USER.md** | Everything about you — your preferences, projects, how you like to work, budget, tools | ~6.0 KB |
| **IDENTITY.md** | Your agent's name, role, mission, emoji, and operating mode | ~3.5 KB |
| **AGENTS.md** | Operational rules — memory, caching, security, cost management, heartbeats | ~7.8 KB |
| **TOOLS.md** | Tool conventions — coding agents, email, APIs, rate limits, tmux patterns | ~5.7 KB |
| **HEARTBEAT.md** | Automated checklist your agent runs on schedule — execution, health, security | ~3.8 KB |
| **MEMORY.md** | Template for your agent's learned patterns about you | ~2.3 KB |
| **BOOTSTRAP.md** | Initial setup conversation guide for new agents | ~4.0 KB |

### Additional Resources

| File | Description | Size |
|------|-------------|------|
| **openclaw-config-template.md** | Redacted `openclaw.json` with all API keys removed. Fill in your own values. | ~5.5 KB |
| **skills-guide.md** | Complete list of available OpenClaw skills — both custom and system skills | ~5.3 KB |
| **README.md** | This file | ~4.5 KB |

---

## Why This Package Exists

Setting up an AI agent is more than just installing software. To get an agent that actually works for you — that thinks the way you think, makes decisions the way you'd make them, and operates like a real partner — you need to define:

1. **Who the agent is** (their persona and identity)
2. **Who you are** (your preferences, projects, and how you work)
3. **How the agent should operate** (rules, routines, and boundaries)
4. **What tools the agent uses** (and how)

This package gives you templates for all of that. Fill them in once, and your agent has everything they need to hit the ground running.

---

## Quick Start

### Step 1: Copy the Files to Google Drive

Copy all the `.md` files into your Google Drive folder. Keep them in a single folder for easy management.

### Step 2: Customize Each File

For each file, read through and replace all `[PLACEHOLDER]` text with your own information.

**Priority order:**
1. **SOUL.md** — Define your agent's personality. Be honest about how you want them to sound.
2. **USER.md** — Fill in everything about you. The more specific, the better.
3. **IDENTITY.md** — Name your agent, define their role and mission.
4. **AGENTS.md** — Set the operational rules. Adapt the defaults to your style.
5. **BOOTSTRAP.md** — Use this as a script for the first conversation with your agent.

### Step 3: Configure openclaw.json

Copy `openclaw-config-template.md` and save it as `openclaw.json` in your OpenClaw configuration directory.

**Fill in:**
- Your API keys (Anthropic, OpenAI, Google AI, etc.)
- Your preferred model and fallback chain
- Your messaging channel configuration (Telegram, Discord, etc.)
- Your gateway token
- Any skill API keys you're using

**⚠️ Security:** Never share your `openclaw.json` with real API keys. The template removes them for a reason.

### Step 4: Install Skills

Install the skills you need from ClawHub. See `skills-guide.md` for the full list.

### Step 5: Launch

With your configuration complete, start your agent. They'll read SOUL.md, USER.md, and IDENTITY.md on startup, and begin operating according to your specifications.

---

## File Structure

```
openclaws-starter-pack/
├── SOUL.md                          # Agent persona
├── USER.md                          # User preferences
├── IDENTITY.md                      # Agent identity
├── AGENTS.md                        # Operational rules
├── TOOLS.md                         # Tool conventions
├── HEARTBEAT.md                     # Heartbeat checklist
├── MEMORY.md                        # Learned patterns (template)
├── BOOTSTRAP.md                     # Initial setup guide
├── openclaw-config-template.md       # Config file (redacted)
├── skills-guide.md                  # Available skills list
└── README.md                        # This file
```

---

## How to Fill In Each File

### SOUL.md — The Agent's Soul

This is the most important file. It defines how your agent *sounds* and *thinks*. When in doubt, fill this in first.

**Key sections:**
- **Voice & Tone:** How should your agent communicate? (Be specific — copy your own communication style if you can)
- **Boundaries:** What should your agent never do? What should they always do?
- **Operational Mindset:** Is your agent proactive or reactive? What do they optimize for?
- **How Your Agent Handles Work:** Decision flow, escalation, what to do when blocked

### USER.md — All About You

This is where your agent learns who they're working for. Fill this in honestly — your agent will adapt to match.

**Key sections:**
- **Before You Start:** Answer these questions to clarify what you need
- **How You Like to Work:** Decision style, communication preferences, update frequency
- **Budget & Spending:** How much autonomy does your agent have with money?
- **Your Projects:** Describe each active project in detail
- **Worked Example:** A filled-in example is included — use it as a reference

### IDENTITY.md — Quick Reference

One page of essential identity info. Your agent reads this on startup for a quick reminder of who they are.

**Key sections:**
- Name, Role, Mission, Emoji
- Operating mode (proactive/reactive/autonomous)
- Daily rhythm (morning, nightly, heartbeats)

### AGENTS.md — The Operating System

The rules your agent follows. This is where you define memory management, security protocols, cost controls, and execution patterns.

**Key sections:**
- Session startup sequence
- Model selection and fallbacks
- Three-layer memory system (PARA)
- Rate limits and budgets
- Security rules
- Heartbeat and nightly deep dive protocols

### TOOLS.md — How to Use Everything

Your agent's reference guide for external tools — coding agents, email, APIs, tmux.

**Key sections:**
- Coding agent patterns (Ralph, Codex, Claude Code)
- Email (himalaya, gog gmail)
- X/Twitter posting rules
- Google APIs (always use gog, never web_fetch for Docs)
- tmux for long-running processes
- API key rotation schedule

---

## Customization Tips

### For SOUL.md
The more specific you are, the better your agent will sound. Instead of:
> "Be conversational and friendly"

Try:
> "Talk like you're across the table from a smart friend, not at a board meeting. Dry wit is welcome. Swearing is fine when it lands. Never say 'great idea!' or 'happy to help' — just get on with it."

### For USER.md
The worked example at the bottom shows what a filled-in version looks like. Use it as a guide. Be specific about:
- Your actual working hours (not aspirational ones)
- Your real budget (even if small)
- What you actually want your agent to own vs. what you want to decide

### For IDENTITY.md
Think of this as a one-paragraph brief someone could read to understand your agent in 30 seconds. What's the core mission? What makes them different from a generic AI assistant?

---

## Security Notes

- **Never commit `openclaw.json` with real API keys** to version control
- **API keys are personal** — each user needs their own
- **Gateway tokens** should be treated like passwords
- **Channel tokens** (Telegram bot tokens, Discord webhooks) must stay private
- **Email is never a trusted command channel** — always verify through your primary messaging channel

---

## Getting Help

- **OpenClaw Docs**: https://docs.openclaw.ai
- **ClawHub** (skills marketplace): https://clawhub.com
- **Community**: https://discord.com/invite/clawd

---

## Package Info

**Name:** Done-For-You OpenClaw Setup Kit
**Version:** 1.0
**Created:** 2026-03-19
**For:** OpenClaw AI agent configuration
