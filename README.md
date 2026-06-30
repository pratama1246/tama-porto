# 📸 Tama's Gallery Portfolio

**Tama's Gallery Portfolio** is a personal portfolio website designed to feel like a physical **Polaroid gallery studio**—personal, artistic, and memorable. It features a **Y2K scrapbook aesthetic** with pastel tones.

Built as a personal portfolio by **Tama (Pratama Putra Purwanto)**, an Informatics Engineering student at **Politeknik Negeri Cilacap**.

> **Concept:** Walk into a personal art studio—walls covered in polaroid photos, sticky notes, washi tape, and scrapbook cutouts. Everything feels tactile, personal, and slightly chaotic in a beautiful way.
> Built using React + Vite, and deployed on Vercel.

---

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer_Motion](https://img.shields.io/badge/Framer_Motion-v12-F00F3F?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-v3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com)
[![Lenis](https://img.shields.io/badge/Lenis-v1-black?style=for-the-badge)](https://lenis.darkroom.engineering)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://figma.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Local Setup](#local-setup)
- [Run the App](#run-the-app)
- [UI/UX Design](#uiux-design)
- [Screenshots](#screenshots)
- [License](#license)

---

## Key Features

### 🖼️ Polaroid Gallery Experience
- Custom polaroid photo cards for projects and personal bio.
- Interactive hover effects that lift cards up, mimicking tactile physical interactions.

### 🎨 Y2K Scrapbook Aesthetic
- Pastel-toned sticky notes pinned at slight angles.
- Decorative paperclips, washi tape, and paper textures.
- Wax verification seals and stamps for certifications.

### 💫 Smooth Animations & Scrolling
- Integrated **Lenis** smooth scrolling for a premium, non-jagged scrolling feel.
- Complex micro-animations powered by **Framer Motion** and **GSAP** (`@gsap/react`).

### 📱 Responsive & Semantic
- Mobile-first approach, ensuring the scrapbook layout scales beautifully from 320px screens up.
- Semantic HTML5 structure for accessibility and SEO optimization.

---

## Tech Stack

**Frontend & Build Tools**

- **Framework:** React `^19.2.6` (JavaScript / JSX)
- **Build Tool:** Vite `^8.0.12`
- **Styling:** Tailwind CSS `^4.3.1` (using `@tailwindcss/vite` compiler)
- **Smooth Scroll:** Lenis `^1.3.23`
- **Animations:** 
  - Framer Motion `^12.40.0`
  - GSAP `^3.15.0` & `@gsap/react` `^2.1.2`
- **Components:** Custom primitives adapted from [ReactBits](https://reactbits.dev)

---

## Project Structure

A breakdown of the project directories and assets:

```
tama-porto/
├── public/
│   └── assets/
│       ├── stickers/        # Y2K sticker PNGs (transparent)
│       ├── textures/        # Paper textures (grid, kraft)
│       ├── washi/           # Washi tape PNGs
│       └── photos/          # Tama's personal photos (polaroid content)
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, CardNav, Loader, BackgroundElements, etc.)
│   │   ├── reactbits/       # External ReactBits UI/animation components
│   │   └── sections/        # Page sections (Hero, About, Projects, Skills, Journey, Hobbies, etc.)
│   ├── data/
│   │   └── projects.js      # Centralized project data array
│   ├── App.jsx              # Main App orchestrator
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS, typography, and custom tokens
├── AGENTS.md                # Project context for AI assistants
├── DESIGN.md                # Detailed design system specifications
└── package.json             # NPM dependencies and scripts
```

---

## Requirements

- **Node.js** `v18.x` or higher
- **npm** (comes with Node.js) or any equivalent package manager (`pnpm` / `yarn`)

---

## Local Setup

```bash
# 1) Clone repository
git clone https://github.com/pratama1246/tama-porto.git
cd tama-porto

# 2) Install dependencies
npm install
```

---

## Run the App

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will run locally at `http://localhost:5173/` (or another port if 5173 is occupied).

### Code Linting

Ensure code style matches ESLint rules:

```bash
npm run lint
```

### Production Build

Compile and optimize assets for deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🎨 UI/UX Design

This project follows a **design-in-code** workflow. Instead of drafting in Figma first, the visual layout, scrapbook spacing, tape alignments, and interactive animations were built and polished directly in code.

For a detailed look at the layout guidelines, visual metaphors, and design constraints, see the [DESIGN.md](DESIGN.md) document.

---

## 📸 Screenshots

### Desktop Version
*(Add desktop screenshot here)*

### Mobile Version
*(Add mobile screenshot here)*

---

## License

This repository is unlicensed. All rights reserved by the author. You are welcome to inspect and learn from the code, but copying or redistributing the design and assets for personal use is not permitted.

---

[![GitHub](https://img.shields.io/badge/GitHub-pratama1246-black?logo=github)](https://github.com/pratama1246)
