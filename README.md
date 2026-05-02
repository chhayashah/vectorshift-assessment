# VectorShift Pipeline Builder

A drag-and-drop pipeline builder built with React + FastAPI as part of the VectorShift Frontend Technical Assessment.

## 🛠️ Tech Stack
- **Frontend:** React, ReactFlow, Zustand
- **Backend:** Python, FastAPI

## ✅ Features Implemented

### Part 1 — Node Abstraction
- Created `BaseNode.js` — single reusable component for all node types
- 5 new nodes: Filter, Transform, Merge, API Call, Condition

### Part 2 — Styling
- Dark theme with per-node accent colors
- Selected node glow, handle hover effects, solid edge lines

### Part 3 — Text Node Logic
- Auto-resizing textarea
- `{{variable}}` detection with dynamic left-side handles

### Part 4 — Backend Integration
- POST nodes + edges to `/pipelines/parse`
- Returns: `num_nodes`, `num_edges`, `is_dag`
- DAG check using Kahn's algorithm
- Animated toast notification with results

## 🏃 How to Run

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Frontend → `http://localhost:3000`
Backend → `http://localhost:8000`

## 📁 Project Structure

```
vectorshift-assessment/
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js        # Reusable node abstraction
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js
│       │   ├── filterNode.js
│       │   ├── transformNode.js
│       │   ├── mergeNode.js
│       │   ├── apiNode.js
│       │   └── conditionNode.js
│       ├── App.js
│       ├── ui.js
│       ├── toolbar.js
│       ├── submit.js
│       ├── store.js
│       └── draggableNode.js
└── backend/
    └── main.py
```