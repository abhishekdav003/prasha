"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    eyebrow: "New Arrival",
    headline: "Power That\nNever Quits.",
    subline: "65W fast charging. 20,000mAh capacity. Built for your most demanding days.",
    cta: "Shop Power Banks",
    ctaLink: "/products?category=Power+Banks",
    accent: "PowerCore X1",
    image: "/images/p41.png",
    tag: "From ₹2,999",
  },
  {
    eyebrow: "Audiophile Grade",
    headline: "Hear Every\nDetail.",
    subline: "Hybrid ANC, 40-hour total playback, studio-tuned sound. Your music, perfected.",
    cta: "Explore Audio",
    ctaLink: "/products?category=Audio",
    accent: "AeroBuds Pro",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&q=85",
    tag: "From ₹1,799",
  },
  {
    eyebrow: "Track Everything",
    headline: "Your Health\nDemands This.",
    subline: "7-day battery, built-in GPS, SpO2 & stress monitoring. Know your body better.",
    cta: "View Wearables",
    ctaLink: "/products?category=Wearables",
    accent: "SmartWatch Edge",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&q=85",
    tag: "From ₹5,999",
  },
];

// Reusable logo pill content — same markup used in both desktop & mobile renders
function LogoPill({ size = 40, onLoad }) {
  return (
    <>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <Image
          src="/smrlogo.png"
          alt="PrashaIndia logo"
          fill
          sizes={`${size}px`}
          style={{ objectFit: "contain" }}
          priority
          onLoad={onLoad}
        />
      </div>
      <div style={{ lineHeight: 1 }}>
        <span
          style={{
            fontSize: size >= 40 ? "1.05rem" : "0.95rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontFamily: "Inter, sans-serif",
            display: "block",
          }}
        >
          Prasha<span style={{ color: "var(--red)" }}>India</span>
        </span>
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            display: "block",
            marginTop: "2px",
          }}
        >
          Premium Accessories
        </span>
      </div>
    </>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTransitioning(false);
      }, 350);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = slides[current];

  // Shared pill style
  const pillStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.95)",
    borderRadius: "14px",
    padding: "8px 16px 8px 10px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    opacity: logoLoaded ? 1 : 0,
    transition: "opacity 0.5s ease 0.2s",
  };

  return (
    <section
      style={{
        background: "var(--cream)",
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background accent shapes ── */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(204,0,0,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(204,0,0,0.04)",
          pointerEvents: "none",
        }}
      />

      {/* ── Red vertical stripe ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          background: "var(--red)",
        }}
      />

      {/* ── DESKTOP logo pill — absolute top-right, hidden on mobile via CSS ── */}
      <div
        className="hero-logo-desktop"
        style={{
          ...pillStyle,
          position: "absolute",
          top: "28px",
          right: "36px",
          zIndex: 10,
        }}
      >
        <LogoPill size={40} onLoad={() => setLogoLoaded(true)} />
      </div>

      {/* ── Main hero grid ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 24px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <div
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(16px)" : "translateY(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* ── MOBILE logo pill — in-flow above eyebrow, hidden on desktop via CSS ── */}
          <div className="hero-logo-mobile" style={{ marginBottom: "24px" }}>
            <div style={pillStyle}>
              <LogoPill size={36} />
            </div>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "2px",
                background: "var(--red)",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--red)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              marginBottom: "24px",
              whiteSpace: "pre-line",
            }}
          >
            {slide.headline}
          </h1>

          {/* Red bar */}
          <div
            style={{
              width: "56px",
              height: "4px",
              background: "var(--red)",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          />

          {/* Subline */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "36px",
            }}
          >
            {slide.subline}
          </p>

          {/* Price tag */}
          <div
            style={{
              display: "inline-block",
              background: "var(--ink)",
              color: "var(--white)",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              marginBottom: "28px",
            }}
          >
            {slide.tag}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href={slide.ctaLink} className="btn btn-primary">
              {slide.cta} →
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get a Quote
            </Link>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: "10px", marginTop: "44px", alignItems: "center" }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "32px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: i === current ? "var(--red)" : "var(--cream-border)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  padding: 0,
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product image */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Glow circle behind product */}
          <div
            style={{
              position: "absolute",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 20px 80px rgba(204,0,0,0.12)",
            }}
          />

          {/* Product image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              aspectRatio: "1",
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "scale(0.94)" : "scale(1)",
              transition: "opacity 0.35s ease, transform 0.4s ease",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <img
              src={slide.image}
              alt={slide.accent}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "20px",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.18))",
              }}
            />
          </div>

          {/* Floating product chip */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "10px",
              background: "var(--white)",
              borderRadius: "12px",
              padding: "10px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(8px)" : "translateY(0)",
              transition: "all 0.35s ease 0.1s",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22C55E",
              }}
            />
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)", fontWeight: 500 }}>
                Featured
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)" }}>
                {slide.accent}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        /* ── MOBILE (≤768px) ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
          /* Desktop pill: hidden */
          .hero-logo-desktop {
            display: none !important;
          }
          /* Mobile pill: shown as centred inline-flex */
          .hero-logo-mobile {
            display: flex !important;
            justify-content: center;
          }
        }

        /* ── DESKTOP (≥769px) ── */
        @media (min-width: 769px) {
          /* Desktop pill: shown */
          .hero-logo-desktop {
            display: flex !important;
          }
          /* Mobile pill: hidden */
          .hero-logo-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}