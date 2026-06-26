# 🌾 PensaFarms — Animated 3D Farm Website

A production-ready Next.js 14 website with a scroll-driven 3D farm scene, smooth section transitions, and a playful premium design.

**Stack:** Next.js 14 · React Three Fiber · Three.js · GSAP ScrollTrigger · Lenis · Tailwind CSS · TypeScript

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          ← Fonts (Fraunces + Nunito), metadata
│   ├── page.tsx            ← Root assembly + Lenis boot
│   └── globals.css         ← Tailwind + custom vars + grain overlay
│
├── components/
│   ├── canvas/
│   │   ├── FarmScene.tsx       ← R3F Canvas wrapper
│   │   ├── CameraRig.tsx       ← Scroll-driven camera journey
│   │   └── ProceduralFarm.tsx  ← Full 3D scene (terrain, trees, barn, animals)
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── LivestockSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── SustainabilitySection.tsx
│   │   └── ContactSection.tsx
│   │
│   └── ui/
│       ├── Navbar.tsx
│       └── LoadingScreen.tsx
│
└── lib/
    ├── constants.ts        ← Camera waypoints, brand info, all content data
    └── scroll.ts           ← Global scroll state (shared Lenis → CameraRig)
```

---

## Customisation Guide

### 1. Brand & Content
Edit **`src/lib/constants.ts`** — this is your single source of truth:
- `BRAND` — name, phone, email, address
- `LIVESTOCK` — animal types and counts
- `PRODUCTS` — product cards
- `PROCESS_STEPS` — the 3-step promise
- `STATS` — sustainability numbers
- `CAMERA_WAYPOINTS` — exactly where the camera sits at each section

### 2. Colours
Edit **`tailwind.config.ts`** and **`src/app/globals.css`** `:root` block:
```css
--forest-deep: #071a0d;   /* page background */
--grass-light: #5ab54c;   /* primary green accent */
--gold:        #f4a800;   /* CTA / highlights */
--cream:       #fef6e4;   /* body text */
```

### 3. Fonts
Currently using Google Fonts **Fraunces** (headings) + **Nunito** (body).
Swap them in `src/app/layout.tsx`:
```tsx
import { YourFont } from 'next/font/google';
```

### 4. 3D Scene
The scene in `src/components/canvas/ProceduralFarm.tsx` is 100% procedural —
no model files required. To add real `.glb` models:

```bash
# Install the CLI tool
npm install -g @gltf-transform/cli

# Compress a model (do this BEFORE adding to /public/models/)
gltf-transform optimize cow.glb cow.glb --compress draco --texture-compress webp

# Auto-generate a React component from the model
npx gltfjsx public/models/cow.glb -o src/components/canvas/CowModel.tsx
```

Then import and place `<CowModel>` inside `ProceduralFarm.tsx`.

### 5. Contact Form
The form in `ContactSection.tsx` currently simulates a send (1.5s delay).
Replace the `handleSubmit` logic with your real endpoint — e.g.:

**Formspree (free tier):**
```tsx
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

**Next.js API route:** create `src/app/api/contact/route.ts` and `POST` there.

---

## Camera Waypoints
The camera's journey through the 3D scene is defined in `src/lib/constants.ts`:

```ts
export const CAMERA_WAYPOINTS = [
  { position: [0, 5, 16],   target: [0, 0, 0]    }, // Hero — wide shot
  { position: [5, 2.5, 10], target: [2, 0.5, 2]  }, // Livestock — near cows
  { position: [-4, 3, 9],   target: [-2, 0.5, 0] }, // Products — chicken side
  { position: [-5, 2, 4],   target: [-4, 1, -3]  }, // Process — near barn
  { position: [2, 10, 10],  target: [0, 0, 0]    }, // Stats — aerial pull-back
  { position: [0, 14, 6],   target: [0, 0, -2]   }, // Contact — high aerial
];
```

Adjust `position` (where camera is) and `target` (what it looks at) freely.

---

## Performance Tips

| Concern | Solution |
|---|---|
| Slow on mobile | `dpr={[1, 1.5]}` already set — limits GPU load |
| Large scene | Instanced meshes used for all trees + fence |
| Scroll jank | Lenis + GSAP ticker eliminates jank |
| Long first load | Dynamic import ensures canvas never blocks HTML |
| Adding GLB files | Compress with `gltf-transform` first (targets < 2MB each) |

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

No special configuration needed — the `next.config.mjs` already sets
long-term cache headers for any future `/public/models/*` assets.

---

## Adding 3D Models Later

When you're ready to swap the procedural geometry for real GLB models:

1. Export from Blender as `glTF 2.0 (.glb)` with Draco compression enabled
2. Drop into `/public/models/`
3. Run `npx gltfjsx public/models/filename.glb` to generate a component
4. Import the component in `ProceduralFarm.tsx` and position it in the scene

**Free model sources:**
- [Sketchfab](https://sketchfab.com) — filter by Free + glTF
- [Poly.pizza](https://poly.pizza) — low-poly, web-ready
- [BlenderKit](https://blenderkit.com) — farm + nature assets built in
- [Mixamo](https://mixamo.com) — free rigged animations (Adobe login)

---

*Built for PensaFarms © 2024. All rights reserved.*
