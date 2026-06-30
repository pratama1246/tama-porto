# DESIGN.md — Tama's Gallery Design System

> Visual design reference for the portfolio project.
> Always follow this document before writing any styles.

---

## 🎨 Concept

**"A developer's gallery studio"**

The portfolio feels like walking into a personal art studio — walls covered in polaroid photos,
sticky notes, washi tape, and scrapbook cutouts. Everything is tactile, personal, and slightly
chaotic in a beautiful way. Layered on top are subtle Y2K design accents that remind
you this is still a tech portfolio.

The overall feel must be **human-made, not AI-generated** — imperfect, personal, and intentional.
Think: someone actually glued these polaroids to a wall, not a template generator.

---

## 🖼️ Visual Metaphor Per Section

| Section | Metaphor |
|---------|----------|
| Hero | Studio entrance — name on the wall, stickers everywhere |
| VisualReveal | Sliding photo reveal — GSAP scroll-triggered photo reveal with scrolling text |
| About | Pinboard with polaroid + handwritten sticky note bio |
| Journey | Scrapbook notebook — notebook pages connected with metal binder rings |
| Projects | Gallery wall — polaroid photos of each project |
| Skills | Sticky note wall — pastel notes pinned at angles |
| Certifications | Corkboard clippings — certificate cards pinned with paperclips or tape, with custom verification wax seals/stamps |
| Hobbies | Coding playlist — "Currently on repeat" music list showing coding lofi beats |
| Contact | Torn paper + rubber stamp aesthetics |

---

## 🎨 Color Palette

```css
/* ── BASE ── */
--bg-primary:      #fdf6e3;   /* Grid paper — main background */
--bg-secondary:    #f5e6c8;   /* Kraft paper — section breaks */

/* ── PASTEL Y2K ACCENTS ── */
--accent-pink:     #ffb3c6;
--accent-lavender: #c8b8e8;
--accent-mint:     #b8e8d0;
--accent-yellow:   #ffeaa7;
--accent-blue:     #b8d8e8;
--accent-peach:    #ffd4b8;

/* ── TEXT ── */
--text-dark:       #2d2d2d;
--text-handwrite:  #4a3728;
--text-muted:      #9a8c7e;

/* ── HIGHLIGHT ACCENTS (Active elements) ── */
--glitch-pink:     #ff6b9d;
--glitch-blue:     #6bcfff;
```

---

## 🔤 Typography

### Font Stack
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=Architects+Daughter&display=swap');

:root {
  --font-display:   'Space Grotesk', sans-serif;
  --font-body:      'Plus Jakarta Sans', sans-serif;
  --font-handwrite: 'Architects Daughter', cursive;
}
```

### Type Scale

| Role | Font | Weight | Desktop | Mobile (320px) |
|------|------|--------|---------|----------------|
| Hero name | Space Grotesk | **600** | 4rem | 2.2rem |
| Section title | Space Grotesk | **600** | 2rem | 1.5rem |
| Card title | Space Grotesk | 500 | 1.1rem | 1rem |
| Body text | Plus Jakarta Sans | 400 | 0.95rem | 0.875rem |
| Caption | Plus Jakarta Sans | 400 | 0.8rem | 0.75rem |
| Polaroid label | Architects Daughter | 400 | 0.85rem | 0.8rem |
| Sticky note | Architects Daughter | 400 | 0.9rem | 0.85rem |

### Font Weight Rules
- Max weight used: **600** — never 700, never 800
- Body text stays at 400 always
- 500 only for card titles or nav links
- Heavy bold = AI generic feel, avoid it

### Rules
- Space Grotesk = titles and headings only
- Plus Jakarta Sans = all body content, descriptions, nav links
- Architects Daughter = decorative labels only (polaroid captions, sticky notes)
- Never use Architects Daughter for paragraphs or anything over 10 words

---

## 📐 Border Radius

```css
/* Subtle — not bubbly, not sharp */
--radius-sm:   4px;    /* Tags, badges, small chips */
--radius-md:   6px;    /* Cards, polaroids, sticky notes */
--radius-lg:   8px;    /* Sections, larger containers */
```

- **Never exceed 8px** for structural elements
- Polaroid corners: 4px — looks like real photo paper
- Sticky notes: 4px — real sticky notes aren't super rounded
- Buttons: 6px — clean, not pill-shaped

---

## 🌑 Shadow

```css
/* Subtle depth — not dramatic, not spread wide */
--shadow-xs: 1px 2px 4px rgba(0,0,0,0.08);   /* Stickers, small elements */
--shadow-sm: 2px 3px 8px rgba(0,0,0,0.10);   /* Polaroids, cards */
--shadow-md: 3px 5px 12px rgba(0,0,0,0.12);  /* Polaroid on hover */
```

- **Max blur: 12px** — no wide dramatic shadows
- **No color tinted shadows** — keep it neutral/dark at low opacity
- Hover state: only increase Y offset by 2–3px, slightly deepen opacity
- The goal is subtle physical depth, not CSS showcase

---

## ✨ Visual Elements

### Polaroid Card
```
┌──────────────────┐
│                  │  ← 12px border top/sides
│  [image / color] │
│                  │
│──────────────────│
│  label here      │  ← 32px bottom, Architects Daughter
└──────────────────┘
```
- Border radius: 4px
- Shadow: `--shadow-sm`
- Rotation: random between `-4deg` and `4deg` — vary per card, never uniform
- Hover: `translateY(-6px)`, shadow goes to `--shadow-md`
- Background: white `#ffffff` or very light cream `#fefcf7`

### Sticky Note
- Size: roughly 120x120px to 160x160px
- Radius: 4px
- Rotation: random `-3deg` to `5deg`
- Color: one of the pastel accents (vary per note)
- Text: Architects Daughter, dark ink color
- No fancy fold effect — keep it simple

### Washi Tape
- PNG asset from `public/assets/washi/`
- Opacity: 0.75–0.85
- Used to pin polaroids or decorate section edges
- Keep it subtle — 1 or 2 per section max

### Smooth Scroll Overlay (Lenis)
- Integrated globally to enable smooth, premium scrolling physics on both desktop and mobile.

### Paper Texture (Background)
```css
/* Grid paper feel via CSS only — no heavy image asset needed */
background-color: #fdf6e3;
background-image:
  linear-gradient(rgba(160, 160, 190, 0.12) 1px, transparent 1px),
  linear-gradient(90deg, rgba(160, 160, 190, 0.12) 1px, transparent 1px);
background-size: 24px 24px;
```

---

## 🎬 Animation Guidelines

| Trigger | Animation | Library | Duration |
|---------|-----------|---------|----------|
| Section scroll enter | Elements fall into place | Framer Motion | 0.5s |
| Polaroid hover | Lift + shadow deepen | Framer Motion | 0.2s |
| Sticker hover | Slight wobble | Framer Motion | 0.25s |
| Page load | Stagger fade-in | Framer Motion | 0.5s stagger 0.08s |
| Smooth Scrolling | Physics scroll | Lenis | Continuous |

### Framer Motion Variants
```js
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}
```

---

## 📱 Responsive — Mobile First

### Target Devices
| Device | Width | Must work perfectly |
|--------|-------|---------------------|
| iPhone 5 / SE 1st gen | 320px | ✅ Priority |
| Samsung J2 Prime | 360px | ✅ Priority |
| Modern Android budget | 390px | ✅ |
| iPhone 14 | 390px | ✅ |
| Tablet | 768px | ✅ |
| Desktop | 1280px+ | ✅ |

### Breakpoints (Tailwind)
```
Default (no prefix) → 320px and up — ALWAYS start here
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
```

### Mobile Rules (320px baseline)
- Minimum font size: **14px (0.875rem)** — never smaller
- Minimum tap target: **44x44px** — buttons, links, nav items
- Polaroid grid: **1 column** on mobile, 2 on tablet, 3 on desktop
- Hero name: max `2.2rem` on 320px — must not overflow
- No horizontal scroll allowed at any breakpoint
- Sticky notes stack vertically on mobile, not overlapping
- All padding minimum `16px` horizontal on mobile
- Test every component at 320px width before moving on

### Navbar Mobile
- Hamburger menu below `md:`
- Full-width dropdown, large touch targets
- Close on link click

---

## 📐 Layout & Spacing

- **Max content width:** 1100px, centered with `mx-auto`
- **Section padding:** `py-16 px-4` mobile → `py-24 px-8` desktop
- **Component gap:** consistent `gap-4` mobile → `gap-6` desktop
- **Single page scroll** — no React Router needed

---

## 🧩 CSS-Only Visual Elements
✅ Polaroid frame (shape, border, shadow)
✅ Sticky note (warna, shape, slight fold)
✅ Grid paper texture (background)
✅ Torn paper effect (clip-path)
✅ Washi tape (strip warna semi-transparan)
All scrapbook elements below are built purely with CSS + Tailwind — no image assets required.

### Polaroid Card
```css
/* White card with wider bottom border, slight rotation, subtle shadow */
background: #ffffff;
border-radius: 4px;
padding: 10px 10px 32px 10px;
box-shadow: 2px 3px 8px rgba(0,0,0,0.10);
transform: rotate(-2deg); /* vary per card: -4deg to 4deg */
```

### Sticky Note
```css
/* Pastel square, slight rotation, no fancy fold needed */
background: var(--accent-yellow); /* swap color per note */
border-radius: 4px;
padding: 12px;
transform: rotate(2deg); /* vary: -3deg to 5deg */
box-shadow: 1px 2px 4px rgba(0,0,0,0.08);
```

### Washi Tape Strip
```css
/* Semi-transparent colored strip, slightly rotated */
background: var(--accent-pink); /* swap color per tape */
opacity: 0.75;
height: 18px;
width: 80px;
transform: rotate(-1deg);
border-radius: 2px;
```

### Torn Paper Edge (top of Contact section)
```css
/* SVG wave or CSS clip-path to simulate torn paper */
clip-path: polygon(
  0% 8%, 2% 0%, 5% 6%, 8% 1%, 12% 7%,
  16% 2%, 20% 8%, 25% 0%, 30% 6%, 35% 1%,
  40% 7%, 45% 0%, 50% 8%, 55% 1%, 60% 6%,
  65% 0%, 70% 7%, 75% 2%, 80% 8%, 85% 1%,
  90% 6%, 95% 0%, 100% 7%, 100% 100%, 0% 100%
);
```

### Paper Clip (decorative, About section)
```css
/* Two overlapping rounded rectangles in gray */
/* Outer clip */
border: 2px solid #9a8c7e;
border-radius: 999px;
width: 10px;
height: 28px;

/* Inner clip overlaps slightly — position absolute */
```

### Grid Paper Background
```css
background-color: #fdf6e3;
background-image:
  linear-gradient(rgba(160,160,190,0.12) 1px, transparent 1px),
  linear-gradient(90deg, rgba(160,160,190,0.12) 1px, transparent 1px);
background-size: 24px 24px;
```

### Optional PNG Assets (if available)
Only use these as decorative extras — never as structural elements:
- Y2K sticker PNGs (stars, butterflies, flowers) → source: Freepik / Pngtree
- Washi tape with prints → source: Freepik
- If PNG unavailable, CSS strip above is the fallback

---

## 🚫 Design Don'ts

- No dark backgrounds
- No neon colors — pastel only
- No Poppins
- No font weight above 600
- No border-radius above 8px
- No box-shadow blur above 12px
- No wide spread shadows (avoid large spread values)
- No perfectly symmetric layouts — slight asymmetry is intentional
- No glitch effects (completely removed for cleaner scrapbook style)
- No more than 2 font families per section
- No generic "card with icon + title + description" pattern — always add scrapbook character
- No AI-looking uniform grids — vary rotation, sizing, and positioning of scrapbook elements
- No text below 14px (0.875rem) at any screen size
- No horizontal overflow at 320px

---

*Last updated: June 2026*
*Project: Tama's Gallery — Personal Portfolio*
