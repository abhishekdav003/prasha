"use client";
import { useEffect, useRef, useState } from "react";
import { QueryButton } from "@/components/QueryForm";

/* ============================================================
   DATA — edit freely. Keep it short & specific; real-sounding
   reviews convert better than generic five-star praise.
   ============================================================ */
const STATS = [
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 27000, suffix: "+", label: "Pincodes Delivered" },
  { value: 4.8, suffix: "★", label: "Average Rating", decimals: 1 },
  { value: 12, suffix: "M", label: "Warranty Coverage" },
];

const TESTIMONIALS = [
  {
    name: "Rohit Sharma",
    location: "Pune, Maharashtra",
    rating: 5,
    tag: "SMR CH-011 Super Fast Charger",
    text: "Charges my phone faster than the box charger it came with. Ordered two more for my family — genuinely impressed by the build quality for the price.",
  },
  {
    name: "Ayesha Khan",
    location: "Hyderabad, Telangana",
    rating: 5,
    tag: "SMR MAK-400 Earpods",
    text: "Bass is way better than I expected at this price point. Battery easily lasts me two full work days. No connectivity drops at all.",
  },
  {
    name: "Vikram Nair",
    location: "Kochi, Kerala",
    rating: 4,
    tag: "SMR Dual USB Power Charger",
    text: "Ordered 25 units for our office for client giveaways. Bulk pricing was fair and the team helped with everything over WhatsApp.",
  },
  {
    name: "Priya Deshmukh",
    location: "Nagpur, Maharashtra",
    rating: 5,
    tag: "SMR Type-C Fast Data Cable",
    text: "Cable feels sturdy, not flimsy like the cheaper ones I've bought before. It's been three months of daily use, zero issues so far.",
  },
  {
    name: "Arjun Mehta",
    location: "Jaipur, Rajasthan",
    rating: 5,
    tag: "SM-23 Dual USB Fast Charger",
    text: "Replacement under warranty was hassle-free — sent a video on WhatsApp and got a new unit within 4 days. That's rare these days.",
  },
  {
    name: "Sneha Reddy",
    location: "Vijayawada, Andhra Pradesh",
    rating: 4,
    tag: "SMR Mini Booster Charger",
    text: "Tiny enough to carry in my pocket but still charges fast. Perfect for travel. Wish it came in more colours, but no complaints otherwise.",
  },
];

/* ============================================================
   Star rating — same visual language as ProductCard's StarRating
   ============================================================ */
function StarRow({ rating, size = 13 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= rating ? "#F5A623" : "#E0D8CE"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ============================================================
   Count-up hook — animates a number from 0 → target once the
   section scrolls into view. Pure rAF, no extra dependencies.
   ============================================================ */
function useCountUp(target, decimals, isVisible, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    let raf;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target, duration]);

  return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");
}

function StatItem({ stat, isVisible, index }) {
  const display = useCountUp(stat.value, stat.decimals, isVisible);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "8px 16px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
          fontWeight: 900,
          color: "var(--white)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {display}
        <span style={{ color: "var(--red)" }}>{stat.suffix}</span>
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 600,
          marginTop: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

/* ============================================================
   Main component
   ============================================================ */
export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const [spotlight, setSpotlight] = useState(0);
  const sectionRef = useRef(null);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate the spotlight quote every 5s, pause when off-screen
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setSpotlight((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [visible]);

  const featured = TESTIMONIALS[spotlight];
  const gridReviews = TESTIMONIALS.filter((_, i) => i !== spotlight).slice(0, 3);

  return (
    <section ref={sectionRef} style={{ background: "var(--white)", overflow: "hidden" }}>
      {/* ── Stats strip ─────────────────────────────────── */}
      <div style={{ background: "var(--ink)", padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={visible} index={i} />
          ))}
        </div>
      </div>

      {/* ── Testimonials ────────────────────────────────── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 70px" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "560px",
            margin: "0 auto 48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Customer Voices
            </span>
            <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Real People. Real Reviews.
          </h2>
          <p style={{ fontSize: "0.98rem", color: "var(--ink-muted)", marginTop: "12px", lineHeight: 1.7 }}>
            Thousands of customers across India trust SMR for everyday reliability.
          </p>
        </div>

        {/* Spotlight quote */}
        <div
          style={{
            background: "var(--cream)",
            border: "1px solid var(--cream-border)",
            borderRadius: "24px",
            padding: "clamp(28px, 5vw, 52px)",
            position: "relative",
            marginBottom: "32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.15s",
          }}
        >
          {/* Quote mark */}
          <svg
            width="46" height="46" viewBox="0 0 24 24" fill="var(--red)"
            style={{ position: "absolute", top: "clamp(20px, 4vw, 36px)", left: "clamp(20px, 4vw, 36px)", opacity: 0.12 }}
          >
            <path d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm-10 0C-1.447 16.227-2 15-2 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" transform="translate(8)" />
          </svg>

          <div key={spotlight} className="qf-fade">
            <StarRow rating={featured.rating} size={16} />
            <p
              style={{
                fontSize: "clamp(1.05rem, 2.4vw, 1.35rem)",
                fontWeight: 600,
                color: "var(--ink)",
                lineHeight: 1.6,
                margin: "18px 0 24px",
                letterSpacing: "-0.01em",
                maxWidth: "780px",
              }}
            >
              "{featured.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "46px", height: "46px", borderRadius: "50%",
                  background: "var(--red)", color: "white", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.95rem", flexShrink: 0,
                }}
              >
                {featured.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "var(--ink)", fontSize: "0.95rem" }}>{featured.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>
                  {featured.location} · {featured.tag}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: "6px", marginTop: "28px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSpotlight(i)}
                aria-label={`Show review ${i + 1}`}
                style={{
                  width: i === spotlight ? "22px" : "8px",
                  height: "8px",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  background: i === spotlight ? "var(--red)" : "var(--cream-border)",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mini review grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {gridReviews.map((rev, i) => (
            <div
              key={rev.name}
              onClick={() => setSpotlight(TESTIMONIALS.indexOf(rev))}
              style={{
                background: "var(--white)",
                border: "1px solid var(--cream-border)",
                borderRadius: "16px",
                padding: "22px",
                cursor: "pointer",
                transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDelay: `${0.25 + i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(204,0,0,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cream-border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <StarRow rating={rev.rating} />
              <p
                style={{
                  fontSize: "0.87rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.65,
                  margin: "12px 0 16px",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                "{rev.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "var(--ink)", color: "white", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", flexShrink: 0,
                  }}
                >
                  {rev.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.84rem" }}>{rev.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}>{rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk / business CTA strip */}
        <div
          style={{
            marginTop: "56px",
            background: "linear-gradient(135deg, var(--ink) 0%, #2a2a2a 100%)",
            borderRadius: "20px",
            padding: "clamp(28px, 5vw, 44px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              For Businesses
            </p>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
              Need bulk pricing or custom branding?
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>
              Get a custom quote in under 24 hours — no obligation.
            </p>
          </div>
          <QueryButton className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
            Get a Quote →
          </QueryButton>
        </div>
      </div>

      <style>{`
        .qf-fade {
          animation: qfFadeIn 0.5s ease;
        }
        @keyframes qfFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            row-gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}