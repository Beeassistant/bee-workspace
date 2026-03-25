# SKILLS.md - OpenClaw Skills Guide

_OpenClaw uses a skill system to extend capabilities. Skills are stored in `~/.openclaw/skills/` (custom) or installed via ClawHub._

## Custom Skills (Installed in Your Agent)

These skills are included with your agent:

### Coding & Development
| Skill | Description |
|-------|-------------|
| **coding-agent-loops** | Run AI coding agents (Codex, Claude Code) in persistent tmux sessions with retry loops and completion hooks. Best for multi-step coding tasks. |
| **coding-sessions** | Manage long-running coding agents in persistent tmux sessions. Similar to coding-agent-loops with different patterns. |
| **de-ai-ify** | Remove AI-generated jargon and restore human voice to text. Analyzes 47 patterns including cliches, hedging, buzzwords, robotic structures. |
| **excalidraw-generator** | Generate valid Excalidraw diagram files from natural language. Flowcharts, architecture diagrams, decision trees, mind maps. |

### Research & Content
| Skill | Description |
|-------|-------------|
| **content-idea-generator** | Generate content ideas rooted in positioning. Use for 'what should I post', blog topics, LinkedIn ideas. |
| **deep-research** | Comprehensive research with structured briefs, source quality scoring, bias detection, and actionable insights. |
| **video-link-analysis** | Analyze YouTube/video links. Triggered when user sends video links with specific phrases. |

### Business & Revenue
| Skill | Description |
|-------|-------------|
| **metrics** | Pull revenue and business metrics across Stripe accounts. Use for daily/weekly/monthly revenue checks. |

### Communication & Outreach
| Skill | Description |
|-------|-------------|
| **opentweet-x-poster** | Post to X/Twitter via OpenTweet API. Create tweets, schedule posts, publish threads. |
| **x-api** | X/Twitter API v2 integration. Post tweets, read mentions, reply, like, retweet, search. |

### AI & Voice
| Skill | Description |
|-------|-------------|
| **elevenlabs-calls** | Make AI phone calls using ElevenLabs Conversational AI and Twilio. |
| **quality-verification-protocol** | Quality Verification Protocol. Before every substantive response, silently pass five gates. |

## System Skills (Available via ClawHub)

These are essential system skills available for installation via `clawhub install <skill-name>`:

| Skill | Description |
|-------|-------------|
| **1password** | Set up and use 1Password CLI (op). |
| **apple-notes** | Manage Apple Notes via the `memo` CLI on macOS. |
| **apple-reminders** | Manage Apple Reminders via remindctl CLI. |
| **bear-notes** | Create, search, and manage Bear notes via grizzly CLI. |
| **blogwatcher** | Monitor blogs and RSS/Atom feeds for updates. |
| **blucli** | BluOS CLI for discovery, playback, grouping, and volume. |
| **camsnap** | Capture frames or clips from RTSP/ONVIF cameras. |
| **clawhub** | Search, install, update, and publish agent skills from clawhub.com. |
| **coding-agent** | Delegate coding tasks to Codex, Claude Code, or Pi agents. |
| **eightctl** | Control Eight Sleep pods (status, temperature, alarms, schedules). |
| **gemini** | Gemini CLI for one-shot Q&A, summaries, and generation. |
| **gh-issues** | Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs. |
| **gifgrep** | Search GIF providers with CLI/TUI, download results, and extract stills/sheets. |
| **github** | GitHub operations via `gh` CLI: issues, PRs, CI runs, code review, API queries. |
| **gog** | Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs. |
| **goplaces** | Query Google Places API (New) via the goplaces CLI. |
| **healthcheck** | Host security hardening and risk-tolerance configuration for OpenClaw deployments. |
| **himalaya** | CLI to manage emails via IMAP/SMTP. |
| **imsg** | iMessage/SMS CLI for listing chats, history, and sending messages. |
| **mcporter** | List, configure, auth, and call MCP servers/tools directly. |
| **model-usage** | Summarize per-model usage for Codex or Claude. |
| **nano-banana-pro** | Generate or edit images via Gemini 3 Pro Image (Nano Banana Pro). |
| **nano-pdf** | Edit PDFs with natural-language instructions using the nano-pdf CLI. |
| **obsidian** | Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli. |
| **openai-whisper** | Local speech-to-text with the Whisper CLI (no API key). |
| **openhue** | Control Philips Hue lights and scenes via the OpenHue CLI. |
| **oracle** | Best practices for using the oracle CLI. |
| **ordercli** | Foodora-only CLI for checking past orders and active order status. |
| **peekaboo** | Capture and automate macOS UI with the Peekaboo CLI. |
| **sag** | ElevenLabs text-to-speech with mac-style say UX. |
| **skill-creator** | Create, edit, improve, or audit AgentSkills. |
| **songsee** | Generate spectrograms and feature-panel visualizations from audio. |
| **sonoscli** | Control Sonos speakers (discover/status/play/volume/group). |
| **summarize** | Summarize or extract text/transcripts from URLs, podcasts, and local files. |
| **things-mac** | Manage Things 3 via the `things` CLI on macOS. |
| **video-frames** | Extract frames or short clips from videos using ffmpeg. |
| **wacli** | Send WhatsApp messages or search/sync WhatsApp history. |
| **weather** | Get current weather and forecasts via wttr.in or Open-Meteo. |
| **xurl** | A CLI tool for making authenticated requests to the X (Twitter) API. |
