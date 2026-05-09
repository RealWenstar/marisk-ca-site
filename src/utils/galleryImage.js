/*
 * galleryImage.js — Gallery image helpers (Slot 07 SITE PHASE 1)
 *
 * Reads MANIFEST_2026-05-08.json and produces ready-to-render <picture>
 * data: a `<source>` element per format with a srcset and width descriptors,
 * a fallback `<img>` (jpg, largest), plus alt text and a tiny
 * solid-colour placeholder used while the real bytes load (no blurhash
 * pre-bake step available offline yet — phase 3 can swap in real LQIP).
 *
 * IMPORTANT: this is local-only. Paths returned are root-relative
 * (`/images/gallery-final/...`) so Vite serves them directly from `public/`.
 */

import manifestJson from "../../public/images/gallery-final/MANIFEST_2026-05-08.json";

/** @typedef {Object} ManifestVariant
 *  @property {string} filename
 *  @property {number} width
 *  @property {number} height
 *  @property {string} format       "avif" | "webp" | "jpg"
 *  @property {number} size_bytes
 */

/** @typedef {Object} ManifestEntry
 *  @property {number} rank
 *  @property {string} category
 *  @property {string} target       e.g. "mrsk-hero-0001.jpg"
 *  @property {string} alt
 *  @property {string} caption
 *  @property {ManifestVariant[]} variants_generated
 */

const PUBLIC_GALLERY_PREFIX = "/images/gallery-final/";

// Format preference cascades from most efficient → most compatible.
const FORMAT_ORDER = ["avif", "webp", "jpg"];

const MIME_BY_FORMAT = {
  avif: "image/avif",
  webp: "image/webp",
  jpg: "image/jpeg",
};

/**
 * The default sizes attribute. Tuned to layout breakpoints:
 *  mobile (<640): full viewport
 *  tablet (640–1024): half viewport
 *  desktop: ~1/3 viewport.
 */
export const DEFAULT_SIZES =
  "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

/** Index manifest entries by their canonical target name (with and without ext). */
const indexByKey = (() => {
  /** @type {Record<string, ManifestEntry>} */
  const map = {};
  for (const entry of manifestJson) {
    if (!entry || !entry.target) continue;
    map[entry.target] = entry;
    const noExt = entry.target.replace(/\.[^.]+$/, "");
    map[noExt] = entry;
  }
  return map;
})();

/**
 * Look up a manifest entry by its target name (with or without extension)
 * or its rank.
 *
 * @param {string|number} key
 * @returns {ManifestEntry|null}
 */
export function findEntry(key) {
  if (typeof key === "number") {
    return manifestJson.find((e) => e.rank === key) ?? null;
  }
  if (typeof key !== "string") return null;
  return indexByKey[key] ?? indexByKey[key.replace(/\.[^.]+$/, "")] ?? null;
}

/** All entries for a given category. */
export function entriesForCategory(category) {
  return manifestJson.filter((e) => e.category === category);
}

/** All categories present in the manifest, ordered by appearance. */
export function listCategories() {
  /** @type {string[]} */
  const seen = [];
  for (const e of manifestJson) {
    if (!seen.includes(e.category)) seen.push(e.category);
  }
  return seen;
}

/**
 * Build a srcset string for one format, in ascending width order.
 * @param {ManifestVariant[]} variants
 * @param {string} format
 */
function buildSrcSet(variants, format) {
  return variants
    .filter((v) => v.format === format)
    .sort((a, b) => a.width - b.width)
    .map((v) => `${PUBLIC_GALLERY_PREFIX}${v.filename} ${v.width}w`)
    .join(", ");
}

function pickFallback(variants) {
  const jpgs = variants
    .filter((v) => v.format === "jpg")
    .sort((a, b) => b.width - a.width);
  return jpgs[0] ?? variants[0] ?? null;
}

/**
 * Stable colour placeholder derived from the entry's target name —
 * deterministic so SSR and client agree, no extra request, no blurhash
 * decode required. Phase 3 can swap this for real LQIP base64.
 *
 * @param {string} target
 */
function placeholderColor(target) {
  let h = 0;
  for (let i = 0; i < target.length; i += 1) {
    h = (h * 31 + target.charCodeAt(i)) & 0xfffffff;
  }
  // Map into a muted earth-tone band so it harmonises with the palette.
  const hue = 70 + (h % 90);     // greens → ochres
  const sat = 14 + (h % 12);     // muted
  const lit = 70 + ((h >> 3) % 10);
  return `hsl(${hue} ${sat}% ${lit}%)`;
}

/**
 * Build all the props needed to render a `<picture>` element for an entry.
 * The caller is responsible for the actual JSX; this stays JS-only so it
 * can be unit-tested without React.
 *
 * @param {string|number} key  target filename, target without ext, or rank.
 * @param {Object} [opts]
 * @param {string} [opts.sizes]   sizes attribute, defaults to DEFAULT_SIZES
 * @param {boolean} [opts.eager]  set true for above-the-fold images (hero)
 * @returns {{
 *   sources: {type: string, srcSet: string}[],
 *   img: {src: string, width: number, height: number, alt: string, loading: string, decoding: string, sizes: string, style: object},
 *   caption: string,
 *   placeholder: string,
 *   entry: ManifestEntry
 * }|null}
 */
export function getPictureProps(key, opts = {}) {
  const entry = findEntry(key);
  if (!entry) return null;

  const variants = entry.variants_generated || [];
  if (!variants.length) return null;

  const sources = FORMAT_ORDER
    .filter((fmt) => variants.some((v) => v.format === fmt))
    .map((fmt) => ({
      type: MIME_BY_FORMAT[fmt],
      srcSet: buildSrcSet(variants, fmt),
    }));

  const fallback = pickFallback(variants);
  const placeholder = placeholderColor(entry.target);

  return {
    sources,
    img: {
      src: `${PUBLIC_GALLERY_PREFIX}${fallback.filename}`,
      width: fallback.width,
      height: fallback.height,
      alt: entry.alt || "",
      loading: opts.eager ? "eager" : "lazy",
      decoding: "async",
      sizes: opts.sizes ?? DEFAULT_SIZES,
      style: {
        backgroundColor: placeholder,
        aspectRatio: `${fallback.width} / ${fallback.height}`,
      },
    },
    caption: entry.caption || "",
    placeholder,
    entry,
  };
}

/**
 * Convenience: just the URL of the largest jpg variant (for og:image,
 * preload links, etc.).
 */
export function getOriginalUrl(key) {
  const entry = findEntry(key);
  if (!entry) return null;
  const fallback = pickFallback(entry.variants_generated || []);
  if (!fallback) return null;
  return `${PUBLIC_GALLERY_PREFIX}${fallback.filename}`;
}

export const __manifest = manifestJson; // exported for tests / debugging
