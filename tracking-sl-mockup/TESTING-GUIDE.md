# Testing Guide - TrackinG SI Mockup

This guide will help you navigate through all 9 screens of the TrackinG SI mockup.

## Access

1. Start the development server: `npm run dev`
2. Open browser at: `http://localhost:5174/`
3. Best viewed in browser DevTools mobile mode (480px width)

## Complete Test Flow

### 1. Splash Screen (Auto)
**Duration**: 3 seconds
**Expected**: NG Solutions logo with TrackinG SI branding
**Action**: Wait for auto-transition

---

### 2. Lista de Vistorias
**What to see**:
- 3 inspection cards
- Different statuses (green checkmark, yellow alert, red lock)
- VST-2024-089: Torre Greenfield (available)
- VST-2024-090: Rooftop Comercial (available)
- VST-2024-091: Torre Rural (blocked)

**Test Actions**:
1. Click on **VST-2024-089** (Torre Greenfield) - should proceed
2. Try clicking on VST-2024-091 - should show alert "indisponível"

---

### 3. Questionário EPI
**What to see**:
- 6 safety equipment items
- Each with OK / NOK / N/A buttons
- "CONFIRMAR E AVANÇAR" button (initially disabled)

**Test Actions**:
1. Click OK on all 6 items
2. Notice button becomes enabled (orange)
3. Click "CONFIRMAR E AVANÇAR"
4. Test back button (top-left arrow) to return to list

---

### 4. Selfie de Chegada
**What to see**:
- Camera frame with placeholder
- Corner guides
- "TIRAR FOTO" button
- Tips section

**Test Actions**:
1. Click "TIRAR FOTO"
2. Watch flash effect
3. See photo preview appear
4. See 3 validations check progressively:
   - ✓ Rosto detectado
   - ✓ Capacete detectado
   - ✓ Iluminação adequada
5. Click "CONFIRMAR E AVANÇAR"
6. Test "REFAZER" to retake photo

---

### 5. Check-in com Geolocalização
**What to see**:
- Simulated map with 2 pins (site and user)
- Dashed line connecting them
- Distance: "45m do local"
- Green validation "Dentro do raio aceitável"
- Site information card
- GPS coordinates

**Test Actions**:
1. Review map visualization
2. Check site details (Torre Greenfield, coordinates, time)
3. Click "CONFIRMAR CHECK-IN"
4. Watch success toast appear
5. Automatically transitions to next screen

**To test distant location**:
- Edit `CheckIn.jsx` line ~24
- Change `useState(45)` to `useState(340)`
- Refresh page and navigate back to this screen
- Should show yellow warning and confirmation modal

---

### 6. Visão Geral da Sequência
**What to see**:
- Progress bar at 0%
- "0 de 67 passos completos"
- Torre Greenfield site card
- 8 sections listed:
  1. Chegada e Segurança (⛑ 7 passos) - highlighted
  2. Visão Geral do Site (📷 8 passos)
  3. Energia AC (⚡ 18 passos)
  4. Gabinetes (🗄 30 passos)
  5. Esteiras (🔌 10 passos)
  6. RF e Antenas (📡 40 passos)
  7. Estrutura Geral (🏗 12 passos)
  8. Finalização (✓ 3 passos)

**Test Actions**:
1. Click on any section to expand (shows description)
2. Click "INICIAR PRIMEIRO PASSO"
3. Test "Pausar Vistoria" - shows confirmation modal

---

### 7. Passo da Vistoria
**What to see**:
- Header: "Passo 3 de 67"
- Thin progress bar
- Large icon (🚪)
- Title: "Fotografe o Portão de Entrada"
- Instructions
- Checklist (4 items)
- Tip with light bulb icon
- Camera preview with 3x3 grid
- Flash and brightness controls
- Circular orange capture button
- "Não se aplica" and "Adicionar observação" links

**Test Actions**:
1. Click "Ver foto de exemplo" - opens modal with example
2. Click "Adicionar observação":
   - Type some text
   - Click "SALVAR"
   - See toast "Observação adicionada"
3. Click capture button (large orange circle)
4. Watch flash effect
5. Automatically goes to preview

**Test menu**:
- Click ⋮ (top-right) to access pause menu

---

### 8. Preview e Validação da Foto
**What to see**:
- Photo preview (mock with 🚪 icon)
- "Validações Automáticas:" section
- 3 checks appearing sequentially with animation:
  - ✓ Foco: OK (green)
  - ✓ Iluminação: OK (green)
  - ✓ Resolução: OK (green)
- Success message: "Foto aprovada!"
- "CONFIRMAR E AVANÇAR" button (primary)
- "Tirar Novamente" button (secondary)

**Test Actions**:
1. Watch validations appear one by one
2. Click "CONFIRMAR E AVANÇAR" - goes to next step
3. Or click "Tirar Novamente" - returns to capture

**To test different validation states**:
Edit `App.jsx` line ~218:
- `estadoValidacao="sucesso"` - all OK (default)
- `estadoValidacao="alerta"` - lighting warning
- `estadoValidacao="bloqueio"` - must retake

**Alerta state**:
- ⚠ Iluminação: Foto pode estar escura (yellow)
- Warning message
- "TIRAR NOVAMENTE" (primary) / "Manter Assim" (secondary)

**Bloqueio state**:
- ✕ Foco: Muito desfocada (red)
- Error message with tips
- Only "TIRAR NOVAMENTE" button

---

### 9. Progresso da Vistoria
**Note**: Appears automatically every 8 steps or when clicking progresso view

**What to see**:
- Gradient blue card with stats:
  - 24/67 Passos
  - 36% Completo
  - 45 minutos Decorrido
  - 24 Fotos
- Progress by section:
  - ✓ Chegada e Segurança (7/7) - green, complete
  - ✓ Visão Geral do Site (8/8) - green, complete
  - ⏳ Energia AC (9/18) - blue, in progress
  - ○ Remaining sections (0/X) - gray, pending
- Photo gallery (3x3 grid of last 9 photos)
- Observations section (2 registered)

**Test Actions**:
1. Review all statistics
2. Click any photo thumbnail - opens enlarged modal
3. Review observations with timestamps
4. Click "Ver Todas" for full gallery (shows alert - mockup)
5. Click "CONTINUAR VISTORIA" - returns to next step
6. Click "Pausar":
   - Shows confirmation modal
   - Returns to Lista with status "EM ANDAMENTO"

---

## Advanced Testing

### Navigation Flow Test
Complete path from start to progress:
1. Start → Wait splash
2. Select VST-2024-089
3. Complete EPI (6 OKs)
4. Take selfie
5. Confirm check-in
6. Start sequence
7. Capture step 1-3 (confirm photos)
8. See step 4, 5, 6, 7
9. On step 8 → Automatically shows progress
10. Continue → Back to step 9

### Back Button Test
From any screen, test back navigation:
- Preview → Passo
- Passo → Visão Geral
- Visão Geral → Check-in
- Check-in → Selfie
- Selfie → Questionário
- Questionário → Lista

### Pause and Resume Test
1. Navigate to Visão Geral or Progresso
2. Click "Pausar"
3. Confirm in modal
4. Should return to Lista
5. Card VST-2024-089 should show "EM ANDAMENTO" badge
6. Click again to resume (currently goes to Questionário - would need state persistence for full resume)

---

## Visual Consistency Checklist

Check on every screen:
- [ ] NG Solutions colors (blue #42738d, orange #f19f53)
- [ ] Roboto font family
- [ ] Smooth transitions
- [ ] Touch targets minimum 44px
- [ ] Proper spacing (16px standard)
- [ ] Responsive within 480px width

---

## Known Mockup Limitations

1. **No real persistence**: Refreshing page resets all state
2. **No backend**: All data is hardcoded
3. **No real GPS**: Coordinates are fixed mock values
4. **No real camera**: All captures are simulated
5. **No real validation**: Photo checks are pre-programmed
6. **Progress not saved**: Pausing/resuming doesn't maintain exact step
7. **Gallery not complete**: "Ver Todas" shows alert instead of full gallery

---

## Browser DevTools Setup

For best testing experience:

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or custom 480px
4. Refresh to see mobile layout

---

## Reporting Issues

When reporting issues, please include:
- Which screen/step
- What action was taken
- Expected vs actual behavior
- Browser and version
- Screenshot if visual issue

---

**Happy Testing!**

TrackinG SI by NG Solutions
