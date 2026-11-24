# Seviche — website

Bespoke redesign of [sevicherestaurant.com](https://www.sevicherestaurant.com) for Seviche, Chef Anthony Lamas’ Latin restaurant on Bardstown Road, Louisville.

**Stack:** Vite + TypeScript + Preact (React-compatible API), static prerendering (every page ships as complete HTML), hand-written CSS design system. No animation or 3D libraries: motion is one IntersectionObserver + one rAF loop; the lime is a ~80-line WebGL ray-tracing shader.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck → client build → SSR build → prerender to dist/
node scripts/serve.mjs dist 4173   # preview dist/ with Cloudflare-Pages-style routing
npm run images     # regenerate responsive AVIF/WebP from assets-src/ (sharp)
python3 scripts/hero-video.py      # rebuild the hero film from official photography (ffmpeg)
```

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `dist`. `public/_redirects` preserves old Squarespace URLs; `public/_headers` sets caching and security headers.

## Content sources

All business facts live in `src/data/site.ts`, and the full menu in `src/data/menu.json`. Both were taken from the official site (Nov 2026). Photography in `assets-src/` is the restaurant’s own. To update the menu, edit `menu.json`; homepage dishes are looked up by name, so the build fails if a featured dish is removed from the menu.
