"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { QueryButton } from "@/components/QueryForm";

/* ============================================================
   CONFIG — add your images here.
   Place files in /public/offers/
   ============================================================ */
const OFFERS = [
  { src: "/offers/offer1.png", alt: "Monsoon Sale",    tag: "Limited Time",  label: "85W Supervooc type C" },
  { src: "/offers/offer2.png", alt: "Bundle Deal",    tag: "Bundle & Save", label: "Double Dhamaka" },
  { src: "/offers/offer3.png", alt: "Combo Deals",   tag: "Combo Deals",   label: "SMR ka Combo" },
  { src: "/offers/offer4.png", alt: "Bulk Orders",    tag: "Monsoon Dhamaka",  label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer5.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer6.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer7.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer8.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer9.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
  { src: "/offers/offer10.png", alt: "Free Shipping",  tag: "Monsoon Dhamaka",    label: "Monsoon Dhamaka Offer" },
];

const AUTO_MS  = 3600;
const TRANS_MS = 600;
const EASE     = "cubic-bezier(0.76, 0, 0.24, 1)";

/* Clone for infinite loop: [tail | real | head] */
const TRACK = [...OFFERS, ...OFFERS, ...OFFERS];
const REAL_OFFSET = OFFERS.length;

/* ============================================================
   ROOT COMPONENT
   ============================================================ */
export default function OffersCarousel() {
  const [visible,   setVisible]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);     // 0-based real index
  const [lightbox,  setLightbox]  = useState(null);  // index or null
  const [paused, setPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(3);

useEffect(() => {
  const update = () => {
    if (window.innerWidth < 540)
      setVisibleSlides(1.18);
    else if (window.innerWidth < 860)
      setVisibleSlides(2.15);
    else
      setVisibleSlides(3.15);
  };

  update();

  window.addEventListener("resize", update);

  return () => window.removeEventListener("resize", update);
}, []);

  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const timerRef   = useRef(null);
  const lockRef    = useRef(false);
  const trackIdxRef = useRef(REAL_OFFSET);           // position in TRACK

  /* scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Track helpers ─────────────────────────────────────── */
  const snapTo = useCallback((idx) => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = "none";
    t.style.transform  = `translateX(-${idx * (100 / TRACK.length)}%)`;
  }, []);

  const slideTo = useCallback((idx) => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = `transform ${TRANS_MS}ms ${EASE}`;
    t.style.transform  = `translateX(-${idx * (100 / TRACK.length)}%)`;
  }, []);

  const onTransEnd = useCallback(() => {
    lockRef.current = false;
    let idx = trackIdxRef.current;
    if (idx < REAL_OFFSET) {
      idx += OFFERS.length; trackIdxRef.current = idx; snapTo(idx);
    } else if (idx >= REAL_OFFSET + OFFERS.length) {
      idx -= OFFERS.length; trackIdxRef.current = idx; snapTo(idx);
    }
    setActiveIdx((trackIdxRef.current - REAL_OFFSET + OFFERS.length) % OFFERS.length);
  }, [snapTo]);

  const advance = useCallback((dir = 1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    trackIdxRef.current += dir;
    slideTo(trackIdxRef.current);
  }, [slideTo]);

  const goToReal = useCallback((realIdx) => {
    if (lockRef.current) return;
    const cur = (trackIdxRef.current - REAL_OFFSET + OFFERS.length) % OFFERS.length;
    let delta = realIdx - cur;
    if (delta === 0) return;
    lockRef.current = true;
    trackIdxRef.current += delta;
    slideTo(trackIdxRef.current);
  }, [slideTo]);

  /* boot */
  useEffect(() => {
    snapTo(REAL_OFFSET);
    const t = trackRef.current;
    if (t) t.addEventListener("transitionend", onTransEnd);
    return () => { if (t) t.removeEventListener("transitionend", onTransEnd); };
  }, []); // eslint-disable-line

  /* auto-play */
  const schedule = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { if (!paused) advance(1); }, AUTO_MS);
  }, [paused, advance]);

  useEffect(() => {
    if (!paused) schedule();
    else clearTimeout(timerRef.current);
    return () => clearTimeout(timerRef.current);
  }, [activeIdx, paused, schedule]);

  /* swipe */
  const swipeX = useRef(null);
  const onTouchStart = (e) => { swipeX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (swipeX.current === null) return;
    const d = swipeX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) { advance(d > 0 ? 1 : -1); clearTimeout(timerRef.current); }
    swipeX.current = null;
  };

  /* lightbox keyboard */
  useEffect(() => {
    if (lightbox === null) return;
    const fn = (e) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => (i + 1) % OFFERS.length);
      if (e.key === "ArrowLeft")  setLightbox(i => (i - 1 + OFFERS.length) % OFFERS.length);
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Special Offers"
        style={{ background: "var(--cream)", padding: "80px 0 72px", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Header ───────────────────────────────────── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 28px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "all 0.55s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ width: "22px", height: "3px", background: "var(--red)", display: "block" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Exclusive Deals
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              Latest Offers.
            </h2>
            
          </div>
          

          <div style={{ display: "flex", align: "center", gap: "10px" }}>
            {/* Arrows */}
            {[{ dir: -1, icon: "←", label: "Previous" }, { dir: 1, icon: "→", label: "Next" }].map(({ dir, icon, label }) => (
              <button
                key={dir}
                aria-label={label}
                onClick={() => { advance(dir); clearTimeout(timerRef.current); }}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "1.5px solid var(--cream-border)",
                  background: "var(--white)", color: "var(--ink)",
                  fontWeight: 700, fontSize: "1rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--red)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--cream-border)"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel track ───────────────────────────── */}
        <div
          style={{
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "all 0.65s ease 0.12s",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Viewport */}
          <div style={{ overflow: "hidden", padding: "12px 0 20px" }}>
            {/* Track */}
            <div
              ref={trackRef}
              style={{
                display: "flex",
                width: `${TRACK.length * (100 / visibleSlides)}%`,
                willChange: "transform",
              }}
            >
              {TRACK.map((offer, i) => {
                const realIdx = i % OFFERS.length;
                return (
                  <div
                    key={i}
                    style={{
                      width: `${100 / TRACK.length}%`,
                      padding: "0 10px",
                      boxSizing: "border-box",
                      flexShrink: 0,
                    }}
                  >
                    <OfferCard
                      offer={offer}
                      onClick={() => { setLightbox(realIdx); setPaused(true); }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Edge fades */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "100%", background: "linear-gradient(to right, var(--cream), transparent)", pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "100%", background: "linear-gradient(to left, var(--cream), transparent)", pointerEvents: "none", zIndex: 3 }} />
        </div>

        {/* ── Dot strip + progress ─────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            marginTop: "8px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
        >
          <div style={{ display: "flex", gap: "7px" }}>
            {OFFERS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to offer ${i + 1}`}
                onClick={() => { goToReal(i); clearTimeout(timerRef.current); }}
                style={{
                  width: i === activeIdx ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "99px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: i === activeIdx ? "var(--red)" : "rgba(0,0,0,0.18)",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            ))}
          </div>

          {/* Thin progress line */}
          <ProgressBar active={activeIdx} paused={paused} duration={AUTO_MS} />
        </div>

        {/* ── Bottom CTA ───────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          <QueryButton
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 28px" }}
          >
            Enquire About an Offer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </QueryButton>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {lightbox !== null && (
        <Lightbox
          offers={OFFERS}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => { setLightbox(null); setPaused(false); }}
        />
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   How many slides fill the viewport (fractional = peeking)
────────────────────────────────────────────────────────── */


/* ──────────────────────────────────────────────────────────
   Single offer card
────────────────────────────────────────────────────────── */
function OfferCard({ offer, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        background: "#0a0a0a",
        aspectRatio: "4 / 3",
        cursor: "pointer",
        position: "relative",
        boxShadow: hovered
          ? "0 28px 60px rgba(0,0,0,0.22)"
          : "0 4px 20px rgba(0,0,0,0.1)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: `transform 0.38s cubic-bezier(0.4,0,0.2,1), box-shadow 0.38s ease`,
        willChange: "transform",
      }}
    >
      {/* Blurred backdrop */}
      <img
        src={offer.src}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-4%",
          width: "108%",
          height: "108%",
          objectFit: "cover",
          filter: "blur(22px) brightness(0.55) saturate(1.1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
        loading="lazy"
      />

      {/* Main image — contain so nothing is cropped */}
      <img
        src={offer.src}
        alt={offer.alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: `transform ${TRANS_MS * 1.3}ms ${EASE}`,
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
        loading="lazy"
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: "var(--red)",
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0.35)",
          transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Tag */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          background: "rgba(204,0,0,0.88)",
          color: "white",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: "6px",
          backdropFilter: "blur(6px)",
        }}
      >
        {offer.tag}
      </div>

      {/* Hover overlay — "click to view" */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            transform: hovered ? "scale(1)" : "scale(0.85)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Eye icon */}
          <div
            style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: "var(--red)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(204,0,0,0.4)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span style={{ color: "white", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em" }}>
            View Poster
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "20px 16px 14px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "0.88rem",
            margin: 0,
            letterSpacing: "-0.01em",
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            opacity: hovered ? 1 : 0.8,
            transition: "all 0.3s ease",
          }}
        >
          {offer.label}
        </p>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────
   rAF progress bar — resets per active slide
────────────────────────────────────────────────────────── */
function ProgressBar({ active, paused, duration }) {
  const barRef    = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const pausedPct = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    pausedPct.current = 0;
    bar.style.width = "0%";

    function tick(now) {
      if (!startRef.current) startRef.current = now;
      const p = Math.min((now - startRef.current) / duration, 1);
      bar.style.width = p * 100 + "%";
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, duration]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (paused) {
      cancelAnimationFrame(rafRef.current);
      pausedPct.current = parseFloat(bar.style.width) || 0;
    } else {
      const remaining = duration * (1 - pausedPct.current / 100);
      const startW = pausedPct.current;
      let s = null;
      function tick(now) {
        if (!s) s = now;
        const p = Math.min((now - s) / remaining, 1);
        if (bar) bar.style.width = (startW + p * (100 - startW)) + "%";
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, duration]);

  return (
    <div style={{ width: "200px", height: "2px", background: "rgba(0,0,0,0.1)", borderRadius: "99px", overflow: "hidden" }}>
      <div ref={barRef} style={{ height: "100%", width: "0%", background: "var(--red)", borderRadius: "99px" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   LIGHTBOX — full-screen poster viewer
────────────────────────────────────────────────────────── */
function Lightbox({ offers, index, onChange, onClose }) {
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimIn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const close = () => {
    setAnimIn(false);
    setTimeout(onClose, 280);
  };

  const prev = (e) => { e.stopPropagation(); onChange(i => (i - 1 + offers.length) % offers.length); };
  const next = (e) => { e.stopPropagation(); onChange(i => (i + 1) % offers.length); };

  const offer = offers[index];

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: `rgba(10,10,10,${animIn ? 0.93 : 0})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.28s ease",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* Close */}
      <button
        onClick={close}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.1)",
          color: "white",
          cursor: "pointer",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: "white" }}>{String(index + 1).padStart(2, "0")}</span>
        {" / "}{String(offers.length).padStart(2, "0")}
      </div>

      {/* Image area */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "860px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          opacity: animIn ? 1 : 0,
          transform: animIn ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
          transition: "opacity 0.32s ease, transform 0.32s cubic-bezier(0.34,1.1,0.64,1)",
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            flexShrink: 0,
            width: "48px", height: "48px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)",
            color: "white", fontWeight: 700, fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        >
          ←
        </button>

        {/* Poster frame */}
        <div
          style={{
            flex: 1,
            borderRadius: "20px",
            overflow: "hidden",
            background: "#111",
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          }}
        >
          {/* Blurred backdrop */}
          <img
            src={offer.src}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-6%",
              width: "112%",
              height: "112%",
              objectFit: "cover",
              filter: "blur(32px) brightness(0.4) saturate(1.2)",
              pointerEvents: "none",
            }}
            draggable={false}
          />

          {/* Full poster — contain, never cropped */}
          <img
            key={index}
            src={offer.src}
            alt={offer.alt}
            style={{
              display: "block",
              width: "100%",
              maxHeight: "75vh",
              objectFit: "contain",
              objectPosition: "center",
              position: "relative",
              zIndex: 2,
              animation: "lbFadeIn 0.35s ease both",
            }}
            draggable={false}
          />

          {/* Info bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              padding: "24px 24px 20px",
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
              zIndex: 3,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "var(--red)",
                  color: "white",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  marginBottom: "6px",
                }}
              >
                {offer.tag}
              </span>
              <p style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", margin: 0, letterSpacing: "-0.01em" }}>
                {offer.label}
              </p>
            </div>
            <QueryButton
              onClick={(e) => { e.stopPropagation(); close(); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "var(--red)",
                color: "white",
                border: "none",
                borderRadius: "9px",
                padding: "10px 18px",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              Enquire Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </QueryButton>
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            flexShrink: 0,
            width: "48px", height: "48px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)",
            color: "white", fontWeight: 700, fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        >
          →
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "22px",
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "4px 16px",
          opacity: animIn ? 1 : 0,
          transform: animIn ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.4s ease 0.1s",
        }}
      >
        {offers.map((o, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onChange(i); }}
            aria-label={`View offer ${i + 1}`}
            style={{
              flexShrink: 0,
              width: "68px",
              aspectRatio: "4/3",
              borderRadius: "8px",
              overflow: "hidden",
              padding: 0,
              border: i === index ? "2px solid var(--red)" : "2px solid rgba(255,255,255,0.12)",
              cursor: "pointer",
              background: "#111",
              transform: i === index ? "scale(1.1)" : "scale(1)",
              transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
              opacity: i === index ? 1 : 0.5,
            }}
            onMouseEnter={e => { if (i !== index) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}}
            onMouseLeave={e => { if (i !== index) { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}}
          >
            <img
              src={o.src}
              alt={o.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Hint text */}
      <p
        style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.72rem",
          marginTop: "16px",
          letterSpacing: "0.04em",
          opacity: animIn ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        ESC to close · ← → to navigate
      </p>

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .offer-thumbstrip::-webkit-scrollbar { display: none; }
        @media (max-width: 540px) {
          /* Hide arrows on mobile, swipe instead */
          [aria-label="Previous"], [aria-label="Next"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}