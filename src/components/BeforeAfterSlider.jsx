import { useId, useState } from "react";

export function BeforeAfterSlider({ item, variant = "standard" }) {
  const sliderId = useId();
  const [position, setPosition] = useState(52);
  const isCompact = variant === "compact";
  const className = `gallery-entry${isCompact ? " gallery-entry-compact" : ""}`;

  return (
    <article className={className} data-reveal={isCompact ? undefined : ""}>
      <div className="gallery-copy">
        <p className="section-kicker">Before / After</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="before-after-shell" style={{ "--position": `${position}%` }}>
        <img className="gallery-image" src={item.before} alt={`${item.title} before`} />
        <img
          className="gallery-image gallery-image-after"
          src={item.after}
          alt={`${item.title} after`}
        />
        <div className="gallery-label gallery-label-before">Before</div>
        <div className="gallery-label gallery-label-after">After</div>
        <div className="gallery-divider" aria-hidden="true" />
      </div>

      <div className="gallery-slider-row">
        <label htmlFor={sliderId}>Before / After</label>
        <input
          id={sliderId}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
    </article>
  );
}
