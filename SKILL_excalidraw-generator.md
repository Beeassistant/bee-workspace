---
name: excalidraw-generator
description: Generates valid Excalidraw diagram files from natural language descriptions. Use this skill whenever the user asks to draw, diagram, map, chart, or visualise anything — including flowcharts, architecture diagrams, decision trees, sequence diagrams, and mind maps. Trigger on phrases like "draw me a...", "create a diagram of...", "map out...", "flowchart for...", "architecture of...", or any request that would result in a visual structure. Output is a .excalidraw file the user can open, edit, and export directly in Excalidraw.
trigger:
  - pattern: 'draw me'
    type: contains
  - pattern: 'create a diagram'
    type: contains
  - pattern: 'map out'
    type: contains
  - pattern: 'flowchart'
    type: contains
  - pattern: 'architecture diagram'
    type: contains
  - pattern: 'diagram of'
    type: contains
---

# Excalidraw Diagram Generator
### Bee draws diagrams from your words. No tools, no APIs, no dependencies.

---

## How It Works

1. User describes what they want: *"Draw an architecture diagram for a 3-tier web app"*
2. Bee reads the schema reference and generates valid Excalidraw JSON
3. Bee saves the file as `[diagram-name].excalidraw`
4. User opens it in Excalidraw (web or desktop app) — editable immediately
5. Iteration loop: if anything's wrong, user describes the fix and Bee regenerates

---

## Before Generating — Confirm These

Before writing any JSON, Bee confirms:
- **Diagram type** (flowchart / architecture / sequence / mind map — or something else?)
- **Scope** — how many nodes/steps approximately? Simple (under 10) or complex (10+)?
- **Direction** — top-to-bottom or left-to-right? (default: top-to-bottom for flowcharts, left-to-right for architecture)
- **Output file name** — Bee suggests one; user can rename

If the description is clear enough, Bee can proceed directly and confirm in the response.

---

## Schema Reference (READ BEFORE EVERY GENERATION)

### Base File Structure

Every Excalidraw file Bee generates must open with this exact wrapper:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "gridSize": null,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
```

All diagram elements go inside the `"elements"` array.

---

## Element Types

### Rectangle (process box, component, label)
```json
{
  "id": "unique-id-1",
  "type": "rectangle",
  "x": 100,
  "y": 100,
  "width": 160,
  "height": 60,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "#e7f5ff",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "roundness": {"type": 3},
  "label": {
    "text": "Process Step",
    "fontSize": 16,
    "fontFamily": 1,
    "textAlign": "center",
    "verticalAlign": "middle"
  }
}
```

### Diamond (decision node)
```json
{
  "id": "unique-id-2",
  "type": "diamond",
  "x": 200,
  "y": 200,
  "width": 140,
  "height": 100,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "#fff9db",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "label": {
    "text": "Decision?",
    "fontSize": 16,
    "fontFamily": 1,
    "textAlign": "center",
    "verticalAlign": "middle"
  }
}
```

### Ellipse (start / end terminal)
```json
{
  "id": "unique-id-3",
  "type": "ellipse",
  "x": 150,
  "y": 50,
  "width": 120,
  "height": 50,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "#d3f9d8",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "label": {
    "text": "Start",
    "fontSize": 16,
    "fontFamily": 1,
    "textAlign": "center",
    "verticalAlign": "middle"
  }
}
```

### Arrow (connector between elements)
```json
{
  "id": "unique-id-4",
  "type": "arrow",
  "x": 180,
  "y": 160,
  "width": 0,
  "height": 80,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "points": [[0, 0], [0, 80]],
  "startBinding": {
    "elementId": "unique-id-1",
    "focus": 0,
    "gap": 4
  },
  "endBinding": {
    "elementId": "unique-id-2",
    "focus": 0,
    "gap": 4
  },
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "label": {
    "text": "Yes",
    "fontSize": 14,
    "fontFamily": 1
  }
}
```

### Text (standalone label or annotation)
```json
{
  "id": "unique-id-5",
  "type": "text",
  "x": 100,
  "y": 40,
  "width": 200,
  "height": 25,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "fontSize": 20,
  "fontFamily": 1,
  "text": "System Architecture",
  "textAlign": "left",
  "verticalAlign": "top",
  "opacity": 100
}
```

---

## Colour Palette (use consistently by type)

| Element Type | Background | Stroke |
|---|---|---|
| Start/End (ellipse) | `#d3f9d8` (green) | `#1e1e1e` |
| Process (rectangle) | `#e7f5ff` (blue) | `#1e1e1e` |
| Decision (diamond) | `#fff9db` (yellow) | `#1e1e1e` |
| Data/Storage | `#f8f0fc` (purple) | `#1e1e1e` |
| External system | `#fff4e6` (orange) | `#1e1e1e` |
| Arrow/connector | `transparent` | `#1e1e1e` |

---

## Layout Grid

- Start x positions at 100, step right in increments of 200–250
- Start y positions at 100, step down in increments of 120–150
- Leave space: elements should not touch — minimum 40px gap between boxes
- Title text: place at x:100, y:20, fontSize: 24

---

## ID Rules

Every element must have a unique `id`. Use descriptive IDs:
- `"start-node"`, `"decision-auth"`, `"process-login"`, `"arrow-1-to-2"`
- Never repeat IDs within a file
- Arrow bindings must reference real element IDs that exist in the same file

---

## Diagram Type Templates

### Flowchart
- Ellipse (Start) → Rectangles (steps) → Diamonds (decisions) → Ellipse (End)
- Arrows with Yes/No labels on decision branches
- Top-to-bottom flow by default

### Architecture Diagram
- Rectangles for components/services
- Group related items in the same x-column
- Arrows show data flow direction
- Text labels for layer names (Frontend, API, Database)
- No diamonds needed

### Sequence Diagram
- Use vertical text labels for actors (left to right)
- Use horizontal arrows between actors
- Time flows top to bottom
- Label each arrow with the action/call

### Mind Map
- Central topic: large ellipse in the centre
- Main branches: rectangles radiating outward
- Sub-branches: smaller rectangles
- Use arrows without arrowheads for branches (set `"endArrowhead": null`)

---

## Generation Process

### Step 1 — Parse the description
Break the user's description into:
- **Nodes** (things that exist: processes, components, decisions, actors)
- **Connections** (relationships: flows, calls, dependencies, transitions)
- **Labels** (text on nodes and arrows)
- **Groups** (if architecture: layers, systems, boundaries)

### Step 2 — Plan the layout
Before writing JSON:
- Sketch the layout mentally: how many columns, how many rows?
- Assign x/y coordinates using the grid from the schema (start 100,100 — step 200 right, 140 down)
- Ensure no elements overlap

### Step 3 — Generate the JSON
- Follow the schema for each element type
- Use descriptive IDs (not "id-1", "id-2")
- Match colours to element types from the colour palette
- Add a title text element at top of diagram

### Step 4 — Validate before saving
Before saving the file, check:
- [ ] All arrow `startBinding` and `endBinding` IDs match real element IDs
- [ ] No duplicate IDs
- [ ] All elements have required fields (type, x, y, width, height, id)
- [ ] JSON is valid (no trailing commas, properly closed brackets)
- [ ] Title element is present

### Step 5 — Save and send
- Save as `[descriptive-name].excalidraw` to the user's output location
- Confirm: *"Diagram saved as [filename]. Open it in Excalidraw to view and edit."*
- Include the iteration prompt (see below)

---

## Iteration Loop

After every diagram, Bee appends:

> *"To refine this: describe what needs changing — e.g. 'the arrow between Login and Dashboard should go both ways' or 'add a Caching layer between the API and Database' — and I'll regenerate the file."*

When the user provides a correction:
1. Re-read the existing JSON (or regenerate from scratch if changes are extensive)
2. Apply the described changes
3. Re-validate (Step 4)
4. Save with the same filename (overwrite) unless user asks for a new version
5. Confirm changes made

---

## QVP Application
- Gate 1: Confirm diagram type and scope before generating
- Gate 2: Validate JSON before saving — flag if uncertain about coordinates or bindings
- Gate 4: Always include the iteration prompt after saving
- Gate 5: Output is always a `.excalidraw` file, confirmed with filename and location
