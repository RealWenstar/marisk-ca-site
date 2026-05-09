import { useEffect, useRef } from "react";
import { GalleryExplorer } from "./components/GalleryExplorer";
import { GalleryPicture } from "./components/GalleryPicture";
import { siteContent } from "./content/siteContent";

function App() {
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll("[data-reveal], [data-reveal-group]"),
    );
    if (!revealTargets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -3% 0px" },
    );
    revealTargets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroSectionRef.current;
    if (!hero) return undefined;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) {
      hero.style.setProperty("--hero-progress", "0");
      return undefined;
    }
    let frame = 0;
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const span = Math.max(rect.height - viewportHeight * 0.3, viewportHeight);
      const progress = clamp(-rect.top / span, 0, 1);
      hero.style.setProperty("--hero-progress", progress.toFixed(4));
    };
    const request = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("orientationchange", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("orientationchange", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="site-brand" href="#top">
          <img
            className="site-brand-logo"
            src={`${import.meta.env.BASE_URL}images/logo/marisk-logo.svg`}
            alt="Marisk Services Inc."
            width="600"
            height="220"
          />
          <span className="site-brand-label">{siteContent.brand.label}</span>
        </a>
      </header>

      <main>
        <section className="hero-section" id="top" ref={heroSectionRef}>
          <GalleryPicture
            entryKey={siteContent.marketing.hero.heroImageKey}
            eager
            sizes="100vw"
            className="hero-image"
            aria-hidden="true"
          />
          <div className="hero-overlay" />
          <div className="hero-overlay-readability" />

          <div className="hero-frame">
            <div className="hero-copy">
              <p className="hero-eyebrow">{siteContent.marketing.hero.eyebrow}</p>
              <p className="hero-brand-name">{siteContent.brand.name}</p>
              <h1>{siteContent.marketing.hero.title}</h1>
              <p className="hero-subtitle">{siteContent.marketing.hero.subtitle}</p>
              <p className="hero-supporting">{siteContent.marketing.hero.supporting}</p>
              <div className="hero-highlights" aria-label="Project types">
                {siteContent.marketing.hero.highlights.map((highlight) => (
                  <span key={highlight} className="hero-highlight">{highlight}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="proof-band" data-reveal>
            {siteContent.marketing.proof.map((item) => (
              <div key={item.label} className="proof-item">
                <span className="proof-value">{item.value}</span>
                <span className="proof-label">{item.label}</span>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section intro-section" id="intro" data-reveal>
          <div className="section-heading">
            <p className="section-kicker">Home</p>
            <h2>{siteContent.marketing.intro.title}</h2>
          </div>
          <div className="split-copy">
            {siteContent.marketing.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="content-section services-section" id="services" data-reveal>
          <div className="section-heading">
            <p className="section-kicker">{siteContent.services.eyebrow}</p>
            <h2>{siteContent.services.title}</h2>
            <p>{siteContent.services.lead}</p>
          </div>
          <div className="service-list">
            {siteContent.services.items.map((service, index) => (
              <article key={service.title} className="service-row">
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section story-section" id="about">
          <div className="story-copy" data-reveal>
            <p className="section-kicker">{siteContent.history.eyebrow}</p>
            <h2>{siteContent.history.title}</h2>
            <p className="story-lead">{siteContent.history.lead}</p>
            {siteContent.history.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="timeline" data-reveal>
            {siteContent.history.timeline.map((item) => (
              <article key={item.year} className="timeline-entry">
                <span className="timeline-year">{item.year}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section gallery-section" id="gallery">
          <GalleryExplorer content={siteContent.galleryExplorer} />
        </section>

        <section className="content-section team-section" id="team" data-reveal>
          <div className="section-heading">
            <p className="section-kicker">{siteContent.team.eyebrow}</p>
            <h2>{siteContent.team.title}</h2>
            <p>{siteContent.team.lead}</p>
          </div>
          <div className="team-grid">
            {siteContent.team.people.map((person) => (
              <article key={person.name} className="team-person">
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-copy">
            <p className="section-kicker">Contact</p>
            <h2>{siteContent.contact.title}</h2>
            <p>{siteContent.contact.lead}</p>
            <p className="contact-note">{siteContent.contact.note}</p>
          </div>
          <div className="contact-lines">
            <a className="contact-line" href={siteContent.contact.phone.href}>
              <span>{siteContent.contact.phone.label}</span>
              <strong>{siteContent.contact.phone.display}</strong>
            </a>
            <a className="contact-line" href={siteContent.contact.email.href}>
              <span>{siteContent.contact.email.label}</span>
              <strong>{siteContent.contact.email.display}</strong>
            </a>
            <div className="contact-line">
              <span>Location</span>
              <strong>{siteContent.contact.location}</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{"©"} {new Date().getFullYear()} {siteContent.footer}</p>
        <p>Calgary landscape design, construction, maintenance, and specialty site work.</p>
      </footer>
    </div>
