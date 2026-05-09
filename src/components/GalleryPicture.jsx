/*
 * GalleryPicture — thin React wrapper around `getPictureProps`.
 * Slot 07 SITE PHASE 1 · 2026-05-08
 *
 * Use this for any image whose source lives in `gallery-final/` (i.e.
 * anything backed by the responsive variants pipeline). For one-off
 * media (hero video poster, intake-preview thumbs that haven't been
 * promoted yet), keep using <img> directly.
 *
 * Example:
 *   <GalleryPicture entryKey="mrsk-hero-0001" eager sizes="100vw" />
 */

import { getPictureProps, DEFAULT_SIZES } from "../utils/galleryImage";

export function GalleryPicture({
  entryKey,
  eager = false,
  sizes = DEFAULT_SIZES,
  className,
  caption = false,
  ...rest
}) {
  const props = getPictureProps(entryKey, { eager, sizes });
  if (!props) {
    // Manifest miss — render nothing rather than a broken <img>. The
    // monitoring slot picks these up via the build-time check.
    if (typeof console !== "undefined") {
      console.warn(`[GalleryPicture] no manifest entry for "${entryKey}"`);
    }
    return null;
  }

  const figure = (
    <picture className={className} {...rest}>
      {props.sources.map((src) => (
        <source key={src.type} type={src.type} srcSet={src.srcSet} sizes={sizes} />
      ))}
      <img {...props.img} />
    </picture>
  );

  if (!caption) return figure;

  return (
    <figure className={className}>
      {figure}
      {props.caption ? <figcaption>{props.caption}</figcaption> : null}
    </figure>
  );
}

export default GalleryPicture;
