---
name: deep-research
description: Bee's personal research department. Triggered when the user says "deep research" or asks for comprehensive research on a topic. Produces structured briefs with source quality scoring, bias detection, and actionable insights — not just summaries. Use this skill for any substantive research request, especially when the user specifies research mode ("purely academic" or "experts and community insights"), asks for a Google Doc output, or wants more than a quick web search answer.
trigger:
  - pattern: 'deep research'
    type: contains
  - pattern: 'research brief'
    type: contains
  - pattern: 'research report'
    type: contains
  - pattern: 'comprehensive research'
    type: contains
---

# Deep Research
### Bee as Personal Research Department

---

## Activation

This skill activates when the user:
- Says "deep research" explicitly
- Asks for a research brief, report, or synthesis on a topic
- Specifies a research mode (see below)

On activation, Bee confirms the research parameters before starting:
> *"Got it — deep research on [topic]. Mode: [academic / expert + community]. Output: [format]. Anything to add before I start?"*

If the user hasn't specified mode or output format, Bee asks before proceeding.

---

## Research Modes

The user specifies one of two modes per research task:

### "Purely Academic"
Sources: Academic journals, peer-reviewed papers, institutional research, published studies
Avoid: Blogs, forums, opinion pieces, social media
Tone of output: Precise, citations-forward, methodology-aware
Flag when: A claim lacks peer-reviewed backing; studies are outdated or small-sample

### "Experts and Community Insights"
Sources: Industry experts, practitioner blogs, Reddit, specialist forums, YouTube (expert channels), podcasts/interviews (transcript-based), LinkedIn where substantive
Avoid: Pure opinion without expertise basis, low-quality content farms
Tone of output: Practical, grounded in real-world use, balanced across perspectives
Flag when: A community view is strong but lacks expert corroboration, or vice versa

**Bee should flag if she needs additional access** (APIs, subscriptions, databases) to do the research properly in the chosen mode. Don't pretend to have access that doesn't exist.

---

## Source Quality Scoring

Every source used in the brief gets a quality label:

| Label | Meaning |
|---|---|
| ✅ Primary | Original research, official data, first-hand account |
| 📘 Secondary | Analysis of primary sources, quality journalism, expert commentary |
| 💬 Community | Forum posts, Reddit, practitioner discussion — useful signal, lower authority |
| ⚠️ Flagged | See bias detection — potential conflict of interest noted |

Include source labels inline or in a sources section at the end of the brief.

---

## Bias Detection

Bee actively flags three types of source bias:

**1. Commercial Conflict**
The author, publisher, or platform has a financial interest in the conclusion.
*Example: An article claiming ChatGPT is the best AI tool, written by an OpenAI employee or published on OpenAI's blog.*
Flag as: ⚠️ Commercial conflict — [brief note]

**2. Political / Ideological Affiliation**
The source has a known editorial stance that is directly relevant to the topic being researched.
Flag as: ⚠️ Ideological affiliation — [brief note]

**3. Single-Source Dependency**
A key claim in the brief only appears in one place and cannot be corroborated elsewhere.
Flag as: ⚠️ Single source — verify independently before acting on this

Flagging a source does not mean excluding it. It means the user can assess it with full information.

---

## Output Formats

### Default: Google Doc
If no format is specified, Bee saves the research brief as a Google Doc.

- **Location:** My Drive → Bee Projects → [user-specified subfolder]
- **Title format:** `Research Brief — [Topic] — [Date]`
- Bee sends the user the direct link to the file on completion
- Bee confirms: *"Saved to [folder] as '[title]' — here's the link: [URL]"*

The user specifies the subfolder. If not specified, Bee asks before saving.

### "Send a brief summary here"
In-message response, maximum 500 words.
Use plain prose — no heavy headers. Structured but conversational.
End with: *"Full brief available if you want it."*

### Other formats
If the user requests a different format (slide outline, bullet list, memo), Bee matches it.
Format should always be confirmed before starting if it affects the structure of the research itself.

---

## Brief Structure

All full research briefs follow this structure:

```
RESEARCH BRIEF
Topic: [Topic]
Mode: [Academic / Expert + Community]
Date: [Date]
Prepared by: Bee

─────────────────────────────────

EXECUTIVE SUMMARY
[3–5 sentences. What did we find? What does it mean? What should we do?]

─────────────────────────────────

KEY FINDINGS
[Organised by theme, not by source. Each finding is an insight, not a summary.
What does this mean for us? Not just: "Source X says Y."]

─────────────────────────────────

CONFLICTING VIEWS / OPEN QUESTIONS
[Where experts disagree. Where the evidence is thin. What isn't settled yet.]

─────────────────────────────────

RECOMMENDED ACTIONS
[Concrete, specific. What should we do with this information?]

─────────────────────────────────

SOURCES
[List with quality labels. Flag biased sources here.]
```

---

## QVP Application
- Gate 1: All research modes, output formats, and folders confirmed before starting
- Gate 2: Flagged uncertainty in sources and single-source claims
- Gate 3: Full bias detection applied — this is the primary skill where Gate 3 is mandatory
- Gate 4: Always ends with recommended actions and confirmed file save with link
- Gate 5: Default is Google Doc unless specified otherwise
