"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "50K+", label: "Happy Customers", icon: "😊" },
  { value: "100+", label: "Products", icon: "📦" },
  { value: "4.8★", label: "Average Rating", icon: "⭐" },
  { value: "12mo", label: "Warranty", icon: "🛡️" },
];

const pillars = [
  {
    icon: "⚡",
    title: "Built for Performance",
    desc: "Every product is rigorously tested to deliver peak output — whether it's 65W charging speed or 40dB ANC depth.",
  },
  {
    icon: "🔬",
    title: "Premium Materials Only",
    desc: "We use aerospace-grade aramid fiber, industrial-grade connectors, and premium audio drivers. No compromises.",
  },
  {
    icon: "🇮🇳",
    title: "Made for India",
    desc: "Designed around Indian usage patterns — voltage fluctuations, humidity, and the way we actually use our devices.",
  },
  {
    icon: "📞",
    title: "Real Support",
    desc: "Every purchase comes with dedicated WhatsApp support and a 12-month warranty. We're one message away.",
  },
];

function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    // Just show the value directly (it's already formatted)
    const t = setTimeout(() => setDisplay(value), 200);
    return () => clearTimeout(t);
  }, [started, value]);

  return <span ref={ref}>{started ? value : "—"}</span>;
}

export default function WhyUs() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Stats bar */}
      <section style={{ background: "var(--ink)", padding: "48px 24px" }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "32px",
          textAlign: "center",
        }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: "4px" }}>
                <Counter value={s.value} />
              </div>
              <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section ref={ref} style={{ background: "var(--white)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            textAlign: "center",
            marginBottom: "60px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Why SMR
              </span>
              <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}>
              The Standard. Not the Option.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--ink-muted)", maxWidth: "520px", margin: "0 auto" }}>
              We build accessories that outlast, outperform, and outlove everything else on the shelf.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "var(--cream)",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid var(--cream-border)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(204,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--cream-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  background: "rgba(204,0,0,0.08)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "18px",
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--ink)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}