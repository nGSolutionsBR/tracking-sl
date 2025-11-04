# TrackinG SI - Interactive Mockup

Interactive mockup for TrackinG SI inspection application by NG Solutions.

## Overview

This is a fully navigable mockup of the TrackinG SI mobile application, showcasing the complete inspection execution flow with **9 screens**. All functionality is simulated with mock data - no real GPS, camera, or backend integration.

## Technologies

- React 18
- Vite
- CSS3 with custom animations
- Mock data simulation

## Design System - NG Solutions

### Colors
- **Primary Blue:** `#42738d` - Main UI elements
- **Orange Accent:** `#f19f53` - CTAs and action buttons
- **Secondary Gray:** `#bdbbbb` - Secondary text
- **Success:** `#4caf50`
- **Warning:** `#ffc107`
- **Error:** `#f44336`

### Typography
- Font: Roboto
- Logo: "ng" symbol with orange dot

## Complete Screen Flow (9 Screens)

1. **Splash Screen** (3s auto-transition) - NG Solutions branding
2. **Lista de Vistorias** - 3 mock inspections with status
3. **Questionário EPI** - Safety checklist (6 items)
4. **Selfie de Chegada** - Arrival selfie with validations
5. **Check-in Geolocalização** - GPS verification with simulated map
6. **Visão Geral** - Sequence overview (67 steps, 8 sections)
7. **Passo Vistoria** - Step-by-step execution with camera
8. **Preview Foto** - Photo validation (3 states)
9. **Progresso** - Progress tracking and photo gallery

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

O mockup estará disponível em `http://localhost:5173`

## Navigation Flow

```
Splash → List
  ↓
Select Inspection → EPI Questionnaire
  ↓
Selfie
  ↓
Check-in (GPS)
  ↓
Sequence Overview
  ↓
Step Execution (loop) ←→ Photo Preview
  ↓
(Every 8 steps) → Progress View
  ↓
Continue → Back to Step Execution
  ↓
Pause → Back to List (status: in progress)
```

## Key Features

### Screen 5: Check-in with Geolocation
- Simulated map with site and user pins
- Distance validation (45m from site)
- GPS coordinates display
- Modal for distant locations
- Site information

### Screen 6: Sequence Overview
- Global progress bar (0-100%)
- 8 inspection sections with icons
- 67 total steps
- Collapsible sections
- Estimated time: 90-150 minutes

### Screen 7: Step Execution
- Step indicator (X of 67)
- Detailed instructions with checklist
- Camera preview with 3x3 grid
- Flash and brightness controls
- Example photo modal
- Add observation feature
- "Not applicable" option

### Screen 8: Photo Validation
- Progressive animated validations (focus, lighting, resolution)
- 3 states: Success / Warning / Blocked
- Contextual messages
- Conditional actions
- Improvement tips

### Screen 9: Progress View
- Statistics: 24/67 steps (36%), 45 min, 24 photos
- Progress by section with mini-bars
- Photo gallery (3x3 grid)
- Click to enlarge photos
- Registered observations
- Continue or pause options

## Mock Data

- **Inspections**: 3 sites with different statuses
- **Steps**: 67 total (4 detailed mockups)
- **Sections**: 8 inspection sections
- **GPS**: Fixed coordinates near Av. Paulista
- **Photos**: Emoji thumbnails
- **Validations**: 3 states with animations

## Animations

- Flash effect on photo capture
- Progressive validation checks
- Toast notifications
- Modal slide-in/out
- Progress bar transitions
- Map pin bounce effects

## Documentation Files

- `mockup-progress.json` - Implementation details
- `mockup-structure.json` - Architecture guide
- `README.md` - This file

## Notes

- **This is a mockup** - no real integrations
- Data is not persisted (refresh resets state)
- GPS and camera are simulated
- Perfect for presentations and user testing
- Fully responsive mobile design (480px max-width)

---

**TrackinG SI** by NG Solutions
Version 1.0.0 - November 2025
