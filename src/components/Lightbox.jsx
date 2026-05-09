import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Accessible lightbox - Phase 3 (2026-05-08 night run, slot 10).
 *
 * Behaviour:
 *  - Mounts as a fixed overlay (App-level rendering only when open).
 *  - ESC closes, returning focus to the element that opened it.
 *  - Tab / Shift+Tab is trapped inside the dialog.
 *  - Touch swipe arrow-left / arrow-right switches photos (>=40px horizontal, slope-aware).
 *  - Arrow keys navigate, Home/End jump to ends, Space toggles next.
 *  - Background scroll is locked while open.
 *  - Honours prefers-reduced-motion (instant fade, no scale).
 *
 * Props:
 *  - items:       [{ src, alt, label, title, caption }]  (required)
 *  - startIndex:  number (default 0)
 *  - onClose:     () => void  (required)
 */
export function Lightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);
  const touchStartRef = useRef(null);

  const total = items?.length ?? 0;
  const item = total > 0 ? items[index] : null;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Capture previously focused element on mount; restore on unmount.
  useEffect(() => {
    openerRef.current =
      typeof document !== "undefined" ? document.activeElement : null;
    return () => {
      const opener = openerRef.current;
      if (opener && typeof opener.focus === "function") {
        opener.focus();
      }
    };
  }, []);

  // Lock background scroll while open.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Move focus into dialog after first paint.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Keyboard: ESC, arrows, Home/End, Tab focus-trap.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        setIndex(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        setIndex(Math.max(total - 1, 0));
        return;
      }
      if (event.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, onClose, total]);

  const handleTouchStart = (event) => {
    const t = event.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < 40) return;
    if (Math.abs(dy) > Math.abs(dx)) return; // mostly-vertical: ignore
    if (dx < 0) goNext();
    else goPrev();
  };

  if (!item) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={dialogRef}
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={item.title || item.label || "Project photo"}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          {"×"}
        </button>

        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-nav-prev"
            onClick={goPrev}
            aria-label="Previous photo"
          >
            {"‹"}
          </button>
        )}

        <figure className="lightbox-figure">
          <img
            src={item.src}
            alt={item.alt || item.title || ""}
            className="lightbox-img"
          />
          {(item.title || item.caption) && (
            <figcaption className="lightbox-caption">
              {item.label && (
                <span className="lightbox-caption-label">{item.label}</span>
              )}
              {item.title && <strong>{item.title}</strong>}
              {item.caption && <p>{item.caption}</p>}
              {total > 1 && (
                <span className="lightbox-counter">
                  {index + 1} / {total}
                </span>
              )}
            </figcaption>
          )}
        </figure>

        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-nav-next"
            onClick={goNext}
            aria-label="Next photo"
          >
            {"›"}
          </button>
        )}
      </div>
    </div>
  );
}
