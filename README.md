# Marisk.ca — site

Static memorial / archive page for **Marisk Services Inc.** (Calgary, 2003 – 2025).
Single-page React + Vite site, hosted on GitHub Pages.

## Live preview

Once GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions),
the site is deployed automatically on every push to `main`.

URL pattern: `https://<owner>.github.io/<repo-name>/`

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces dist/
npm run preview  # serve dist/ locally
```

## Project layout

```
src/
  App.jsx                 page composition
  components/             Gallery, Lightbox, etc.
  content/siteContent.js  all copy + gallery data
  styles/                 tokens.css + phase3.css
  utils/galleryImage.js   manifest → <picture> helper
public/
  images/gallery-final/   15 finalists × 4 widths × 3 formats (AVIF/WebP/JPG)
  images/logo/            wordmark SVGs
  media/hero/             (legacy, will be cleaned)
.github/workflows/
  deploy.yml              CI build + Pages deploy
```

## Adding photos

1. Drop the new high-res JPG into `public/images/gallery-final/` following
   the `mrsk-{category}-{rank}.jpg` naming pattern.
2. Run the responsive-variants pipeline (separate tool, outside this repo)
   to produce 480w / 768w / 1280w / 1920w in AVIF + WebP + JPG.
3. Add a new entry to `MANIFEST_2026-05-08.json` with `target`, `alt`, `caption`.
4. Reference its `manifestKey` in `src/content/siteContent.js`.
5. Push — CI rebuilds and deploys.

## Tone

This is a personal-memory site, **not for client acquisition**.
Keep copy archival, no sales CTAs, no booking links.
