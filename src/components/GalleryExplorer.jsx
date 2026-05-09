import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { GalleryPicture } from "./GalleryPicture";
import { Lightbox } from "./Lightbox";
import { findEntry, getOriginalUrl } from "../utils/galleryImage";

// Resolve a "choice" (type or subcategory) to a CSS background-image URL.
// Prefers the manifest finalist when a manifestKey is present.
function resolveChoiceImageUrl(choice) {
  if (choice?.manifestKey) {
    return getOriginalUrl(choice.manifestKey) || null;
  }
  return choice?.image || null;
}

// Enrich gallery items with src/alt/title/caption pulled from the manifest
// when the item points at a manifestKey. Items with a legacy src pass through
// unchanged. Any item that fails to resolve is filtered out so we never
// render a broken <img>.
function enrichPhotoItem(item) {
  if (!item) return null;
  if (!item.manifestKey) {
    if (!item.src) return null;
    return item;
  }
  const entry = findEntry(item.manifestKey);
  if (!entry) return null;
  const url = getOriginalUrl(item.manifestKey);
  if (!url) return null;
  // Caption form: "Foothills Hospital green roof — one of Marisk's …".
  // First half before " — " becomes the card title; full caption stays as caption.
  const fullCaption = entry.caption || "";
  const titlePart = fullCaption.split(" — ")[0] || item.label || entry.alt || "Project";
  return {
    ...item,
    src: url,
    alt: entry.alt || item.label || "Marisk project photograph",
    title: item.title || titlePart,
    caption: item.caption || fullCaption,
  };
}

export function GalleryExplorer({ content }) {
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const selectedType = content.types.find((type) => type.id === selectedTypeId);
  const selectedSubcategory = selectedType?.subcategories.find(
    (subcategory) => subcategory.id === selectedSubcategoryId,
  );
  const visibleItems = selectedSubcategory
    ? selectedSubcategory.items.slice(0, selectedSubcategory.previewLimit ?? 6)
    : [];

  const chooseType = (typeId) => {
    setSelectedTypeId(typeId);
    setSelectedSubcategoryId(null);
  };

  const reset = () => {
    setSelectedTypeId(null);
    setSelectedSubcategoryId(null);
  };

  const goBack = () => {
    if (selectedSubcategoryId) {
      setSelectedSubcategoryId(null);
      return;
    }
    setSelectedTypeId(null);
  };

  return (
    <div className="gallery-explorer">
      <div className="section-heading" data-reveal>
        <p className="section-kicker">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.lead}</p>
      </div>

      <div className="gallery-explorer-shell" data-reveal>
        {!selectedType && (
          <div className="gallery-panel" aria-live="polite">
            <div className="gallery-stage-header">
              <span className="gallery-step-label">Choose a path</span>
              <h3>{content.prompt}</h3>
              <p>{content.promptDetail}</p>
            </div>

            <div className="gallery-choice-grid gallery-type-grid">
              {content.types.map((type) => (
                <GalleryChoiceButton
                  key={type.id}
                  choice={type}
                  tone="type"
                  onClick={() => chooseType(type.id)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedType && !selectedSubcategory && (
          <div className="gallery-panel" aria-live="polite">
            <GalleryPath type={selectedType} />

            <div className="gallery-stage-header">
              <span className="gallery-step-label">{selectedType.label}</span>
              <h3>{selectedType.heading}</h3>
              <p>{selectedType.description}</p>
            </div>

            <div className="gallery-choice-grid">
              {selectedType.subcategories.map((subcategory) => (
                <GalleryChoiceButton
                  key={subcategory.id}
                  choice={subcategory}
                  tone="subcategory"
                  sampleCount={subcategory.items.length}
                  onClick={() => setSelectedSubcategoryId(subcategory.id)}
                />
              ))}
            </div>

            <div className="gallery-toolbar">
              <button className="gallery-secondary-button" type="button" onClick={goBack}>
                Back
              </button>
              <button className="gallery-secondary-button" type="button" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        )}

        {selectedType && selectedSubcategory && (
          <div className="gallery-panel" aria-live="polite">
            <GalleryPath type={selectedType} subcategory={selectedSubcategory} />

            <div className="gallery-stage-header">
              <span className="gallery-step-label">
                {visibleItems.length} project {visibleItems.length === 1 ? "photograph" : "photographs"}
              </span>
              <h3>{selectedSubcategory.label}</h3>
              <p>{selectedSubcategory.description}</p>
            </div>

            <GalleryResults items={visibleItems} />

            <div className="gallery-toolbar">
              <button className="gallery-secondary-button" type="button" onClick={goBack}>
                Back
              </button>
              <button className="gallery-secondary-button" type="button" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryChoiceButton({ choice, onClick, tone, sampleCount }) {
  const url = resolveChoiceImageUrl(choice);
  const style = url
    ? {
        "--choice-image": `linear-gradient(180deg, rgba(9, 15, 12, 0.18), rgba(9, 15, 12, 0.78)), url("${url}")`,
      }
    : undefined;

  return (
    <button
      className={`gallery-choice-button gallery-choice-button-${tone}${url ? " is-visual" : ""}`}
      type="button"
      onClick={onClick}
      style={style}
    >
      <div className="gallery-choice-content">
        <span>{choice.label}</span>
        <strong>{choice.summary}</strong>
        {choice.detail ? <p>{choice.detail}</p> : null}
        {typeof sampleCount === "number" ? (
          <small>{sampleCount} {sampleCount === 1 ? "photo" : "photos"}</small>
        ) : null}
      </div>
    </button>
  );
}

function GalleryPath({ type, subcategory }) {
  return (
    <div className="gallery-path" aria-label="Gallery selection path">
      <span>{type.label}</span>
      {subcategory && (
        <>
          <span aria-hidden="true">/</span>
          <span>{subcategory.label}</span>
        </>
      )}
    </div>
  );
}

function GalleryResults({ items }) {
  const photoItems = items
    .filter((item) => item.type === "photo")
    .map(enrichPhotoItem)
    .filter(Boolean);
  const beforeAfterItems = items.filter((item) => item.type === "beforeAfter");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="gallery-results">
      {photoItems.length > 0 && (
        <div className="gallery-results-grid" data-reveal-group>
          {photoItems.map((item, idx) => (
            <article
              key={item.manifestKey || item.src}
              className="gallery-photo-card is-clickable"
              tabIndex={0}
              role="button"
              aria-label={`Open ${item.title || item.label || "photograph"} in viewer`}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
            >
              {item.manifestKey ? (
                <GalleryPicture entryKey={item.manifestKey} sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 33vw" />
              ) : (
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              )}
              <div>
                <span>{item.label}</span>
                <h4>{item.title}</h4>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {beforeAfterItems.length > 0 && (
        <div className="gallery-inline-sliders">
          {beforeAfterItems.map((item) => (
            <BeforeAfterSlider key={item.title} item={item} variant="compact" />
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="gallery-empty-state">
          More project photographs will appear here as the archive is finished.
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={photoItems}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
