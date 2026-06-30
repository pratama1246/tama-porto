# AGENTS.md — Tama's Gallery Portfolio

> This document provides full context for Tama's personal portfolio project.
> Paste this at the start of every new coding session so the AI has full context.

---

## 👤 Owner

- **Name:** Tama (Pratama Putra Purwanto)
- **Status:** D3 Informatics Engineering student, Politeknik Negeri Cilacap (PNC)
- **Role:** Frontend-leaning developer, UI/UX enthusiast
- **Active skills:** Figma, Laravel, PHP, HTML/CSS, basic JavaScript
- **Currently learning:** React (Vite), JSX, component-based development
- **GitHub:** github.com/pratama1246
- **Portfolio domain:** mytamakikii.web.id

---

## 🎯 Project Goal

Build a **personal portfolio website** that:
- Feels like a physical polaroid gallery studio — personal, artistic, memorable
- Has Y2K scrapbook aesthetic with pastel tones
- Is fully interactive with smooth animations & smooth scrolling
- Is mobile-responsive and SEO-friendly
- Deploys for free on Vercel

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React + Vite |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS |
| Animation | Framer Motion & GSAP |
| Smooth Scroll | Lenis |
| UI Components | ReactBits |
| Deploy | Vercel |
| Version Control | GitHub |

### Setup Commands
```bash
npm create vite@latest tama-porto -- --template react
cd tama-porto
npm install
npm install framer-motion gsap @gsap/react lenis
npm install tailwindcss @tailwindcss/vite
npm run dev
```

### ReactBits Usage
ReactBits is NOT installed via npm. Components are copied manually from reactbits.dev.
- Visit reactbits.dev, find the component needed, copy the code
- Paste into `src/components/reactbits/` as its own file
- Used for: text animations (SplitText, TextType), any special animation primitives
- If a ReactBits component requires extra dependencies, confirm with Tama before installing

---

## 🗂️ Folder Structure

```
tama-porto/
├── public/
│   └── assets/
│       ├── stickers/        ← Y2K sticker PNGs (transparent)
│       ├── textures/        ← Paper textures (grid, kraft)
│       ├── washi/           ← Washi tape PNGs
│       └── photos/          ← Tama's personal photos (polaroid content)
├── src/
│   ├── components/
│   │   ├── layout/          ← Layout components (Navbar, CardNav, Loader, etc.)
│   │   ├── reactbits/       ← External ReactBits UI/animation components
│   │   └── sections/        ← Page sections (Hero, About, Projects, etc.)
│   ├── data/
│   │   └── projects.js      ← All project data as array
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── AGENTS.md                ← This file
├── DESIGN.md                ← Design system reference
└── package.json
```

---

## 📄 Sections

| Section | Visual Concept |
|---------|---------------|
| **Hero** | Large Space Grotesk name + scattered Y2K stickers (polaroids & sticky notes stack) |
| **VisualReveal** | GSAP scroll-triggered photo reveal with scrolling text overlay |
| **About** | Polaroid photo card + sticky note bio + paper clip decoration |
| **Journey** | Notebook pages connected with metal binder rings (Education, Experience, Organization) |
| **Projects** | Polaroid grid — each project = 1 polaroid card, hover lifts up |
| **Skills** | Pastel sticky notes pinned at slight angles, grouped by category |
| **Certifications** | Corkboard clippings — certificate cards pinned with paperclips or tape, with custom verification wax seals/stamps |
| **Hobbies** | Coding playlist — "Currently on repeat" music list showing coding lofi beats |
| **Contact** | Torn paper top edge + stamp/seal style social links |

---

## 🧠 Coding Rules (For AI Agent)

1. **Always use JSX** — not plain HTML
2. **One section = one component file** inside `src/components/`
3. **Static data goes in** `src/data/` — never hardcode inside components
4. **Always use `key` prop** when using `.map()`
5. **Use Framer Motion** for all animations — avoid manual CSS keyframes
6. **Mobile-first** — style from smallest screen up
7. **Do not install new packages** without confirming with Tama first
8. **Add comments** on complex logic — Tama is still learning React
9. **Keep components small** — if a component exceeds ~80 lines, split it
10. **No inline styles** — use Tailwind classes only

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy via Vercel (recommended)
# 1. Push to GitHub
# 2. Connect repo at vercel.com
# 3. Auto-deploys on every push to main
```

---

## 📝 Notes for AI

- Tama knows Figma well — use "React component = Figma component" analogy
- Tama knows Laravel — use "props = PHP function parameters" analogy
- Tama prefers step-by-step explanations with real examples from his own projects
- Device: Dell Latitude 5520 (i7-1185G7, 32GB RAM) — dual boot Windows/Ubuntu
- Editor: VSCode

---

*Last updated: June 2026*
*Owner: Tama — D3 Informatics Engineering, Politeknik Negeri Cilacap*
