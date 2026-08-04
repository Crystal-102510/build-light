# DESIGN.md

> A flat, modern Chinese-character learning experience where the writing system feels clear, visual, and approachable rather than traditional or childlike.

## 1. Visual Theme & Atmosphere

**Style**: Flat Glyph Puzzle
**Keywords**: minimal, geometric, spacious, friendly, visual, contemporary, precise
**Tone**: international and lightly playful — NOT guoxue, antique, mystical, technical-lab, or toy-like
**Feel**: A smart visual puzzle built from clear shapes and a few confident colors.

**Interaction Tier**: L1 focused learning interaction
**Dependencies**: CSS only

Chinese visual identity comes from the characters, their evolution, and balanced negative space. It does not come from parchment, calligraphy UI fonts, seals, bamboo, clouds, or decorative historical motifs.

## 2. Color Palette & Roles

```css
:root {
  --bg: #faf9f6;
  --surface: #ffffff;
  --surface-alt: #f4f6f8;
  --surface-hover: #edf3ff;

  --border: #c9ced6;
  --border-soft: #e3e6ea;
  --border-hover: #2f6fea;

  --text: #172231;
  --text-secondary: #586171;
  --text-tertiary: #8c95a3;
  --text-on-accent: #ffffff;

  --accent: #2f6fea;
  --accent-hover: #245bc2;
  --accent-active: #1e4ea8;
  --accent-coral: #ff635a;
  --accent-yellow: #f7b500;

  --bg-rgb: 250, 249, 246;
  --surface-rgb: 255, 255, 255;
  --text-rgb: 23, 34, 49;
  --accent-rgb: 47, 111, 234;
  --coral-rgb: 255, 99, 90;

  --success: #2f9e6f;
  --error: #d94b45;
  --warning: #d99000;
}
```

**Color Rules:**
- All interface colors use CSS variables. No component-level hard-coded hex values.
- Blue identifies the water family and the primary action. Coral marks the transitional seal-script stage. Yellow is limited to lesson progress.
- Use solid fills only. Gradients, simulated lighting, and translucent glass surfaces are prohibited.
- One screen may use no more than three accents at once: blue, coral, and a small yellow progress marker.

## 3. Typography Rules

**Font Stack:**

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700;800&family=Source+Sans+3:wght@400;600;700;800&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| App H1 | Source Sans 3 / Noto Sans SC | 2rem | 700 | 1.08 | -0.035em |
| Screen H2 | Source Sans 3 / Noto Sans SC | 1.5rem | 700 | 1.15 | -0.02em |
| Character hero | Noto Sans SC | clamp(3.5rem, 16vw, 5rem) | 700 | 1 | 0 |
| Body | Source Sans 3 / Noto Sans SC | 1rem | 400 | 1.55 | 0 |
| Label | Source Sans 3 | 0.75rem | 700 | 1.2 | 0.06em |
| Progress | Source Sans 3 | 0.95rem | 700 | 1 | 0.02em |

**Typography Rules:**
- Interface copy uses a modern humanist sans serif. Historical forms remain visual teaching assets, not UI fonts.
- Chinese text always includes `Noto Sans SC`, `PingFang SC`, and sans-serif fallbacks.
- Keep labels short and uppercase only for stage names.
- **NEVER use**: calligraphy UI fonts, decorative Song type for headings, Comic Sans, Papyrus, Impact, or monospace labels.

**Text Decoration:**
- Headings have no gradient, shadow, outline, or brush effect.
- Character forms may use solid blue, coral, or ink color to explain stages.

## 4. Component Stylings

### Buttons

```css
.primary-action {
  min-height: 56px;
  border: 2px solid var(--accent);
  border-radius: 12px;
  background: var(--accent);
  color: var(--text-on-accent);
  font: 700 1.125rem/1 'Source Sans 3', sans-serif;
  cursor: pointer;
  transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease;
}
.primary-action:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.primary-action:active { background: var(--accent-active); border-color: var(--accent-active); transform: translateY(1px); }
.primary-action:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .28); outline-offset: 3px; }
.primary-action:disabled { border-color: var(--border); background: var(--border); color: var(--text-secondary); cursor: not-allowed; }
```

### Cards

```css
.evolution-card {
  border: 2px solid var(--stage-color, var(--border));
  border-radius: 14px;
  background: var(--surface);
  color: var(--text);
}
.evolution-card:hover { border-color: var(--stage-color, var(--border-hover)); }
.evolution-card:focus-within { outline: 3px solid rgba(var(--accent-rgb), .2); outline-offset: 3px; }
```

### Navigation

```css
.lesson-close {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--text);
}
.lesson-close:hover { background: var(--surface-hover); }
.lesson-close:active { background: var(--surface-alt); }
.lesson-close:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .24); outline-offset: 2px; }
```

### Links

```css
a { color: var(--accent); text-underline-offset: .2em; }
a:hover { color: var(--accent-hover); }
a:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .24); outline-offset: 3px; }
```

### Tags / Badges

```css
.stage-label {
  color: var(--text);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
}
```

### Progress

```css
.progress-track { height: 6px; border-radius: 999px; background: var(--border-soft); }
.progress-value { height: 100%; border-radius: inherit; background: var(--accent-yellow); }
```

## 5. Layout Principles

**Container:**
- Max width: 430px for the learning canvas
- Padding: 24px mobile, 28px wide mobile and desktop preview
- Narrow variant: 360px for text-heavy explanations

**Spacing Scale:**
- Screen top/bottom padding: 24px
- Major section gap: 40px
- Component gap: 16px
- Card internal padding: 14px
- Base unit: 4px

**Grid:**

```css
.evolution-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  align-items: stretch;
}
```

Only one learning task appears per screen. Cards explain content; they are not nested inside additional panels.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | All cards, buttons, progress, and page surfaces |
| Separation | 1–2px solid border | Evolution stages and controls |
| Active | Solid color change or 1px movement | Pressed buttons only |

No drop shadows, inner shadows, bevels, gloss, blur, or simulated paper depth.

## 7. Animation & Interaction

**Motion Philosophy**: Fast, functional feedback. Motion clarifies entry and button state; it does not perform the lesson for the learner.
**Tier**: L1

### Dependencies

```html
<!-- CSS only; no animation dependency -->
```

### Entrance Animation

```css
@keyframes lesson-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.lesson-screen { animation: lesson-enter 240ms ease-out both; }
```

### Scroll Behavior

No scroll-driven animation or parallax. The lesson uses native scrolling only when a short viewport requires it.

### Hover & Focus States

```css
@media (hover: hover) {
  .primary-action:hover { transform: translateY(-1px); }
}
```

### Special Effects

None on the static evolution page. Answer screens use immediate border and background-color feedback for correct, incorrect, and hint states.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## 8. Do's and Don'ts

### Do
- Use the Chinese character and its component shapes as the primary visual content.
- Keep one clear task and one primary action per screen.
- Use large negative space and crisp alignment.
- Use solid blue for water-family content, coral for the seal-script bridge, and yellow only for progress.
- Use verified historical character forms and cite their source in the data layer.
- Keep English instructions short enough to scan in one glance.

### Don't
- ❌ Do not use gradients, 3D tiles, bevels, or glossy buttons.
- ❌ Do not use shadows to create hierarchy.
- ❌ Do not add fake sliders, locks, arrows, or handles to static content.
- ❌ Do not decorate with parchment, seals, bamboo, mountains, clouds, lanterns, or pagodas.
- ❌ Do not use calligraphy fonts for navigation or English interface copy.
- ❌ Do not introduce technology-lab grids, scanning lines, coordinates, or neon.
- ❌ Do not add mascots, confetti, or childish reward graphics to teaching pages.
- ❌ Do not place explanations inside multiple nested cards.
- ❌ Do not invent ancient glyphs or present one teaching sketch as the only historical form.
- ❌ Do not hard-code lesson content inside rendering functions.

## 9. Responsive Behavior

**Breakpoints:**

| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 720px | Center a 430px learning canvas on the neutral page background |
| Tablet | 481–720px | Keep the same three-stage composition with larger outer margins |
| Mobile | ≤ 480px | Use the full viewport, 20–24px padding, and fluid type |
| Small mobile | ≤ 350px | Reduce card gap and label size; never introduce horizontal scrolling |

**Touch Targets:** minimum 44×44px
**Collapsing Strategy:** Keep all three evolution stages visible in one row. Compress gaps and typography before stacking because the side-by-side comparison is the teaching point.

```css
@media (max-width: 350px) {
  .evolution-grid { gap: 8px; }
  .stage-label { font-size: .65rem; letter-spacing: .03em; }
}

@media (min-width: 721px) {
  body { display: grid; min-height: 100vh; place-items: center; }
}
```
