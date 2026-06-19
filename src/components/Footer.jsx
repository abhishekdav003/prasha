"use client";
import Link from "next/link";
import { navigation, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/data/navigation";
import { QueryButton } from "@/components/QueryForm";

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer style={{ background: "var(--ink)", color: "var(--white)" }}>
      

      {/* Main Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 24px 40px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            {/* Monogram mark */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: "40px", height: "40px", background: "var(--red)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: "15px", fontFamily: "Inter", letterSpacing: "-1px", lineHeight: 1 }}>PI</span>
              </div>
              <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "8px", height: "8px", background: "var(--red)", borderRadius: "50%", border: "2px solid var(--ink)" }} />
            </div>
            {/* Text lockup */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", lineHeight: 1 }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--white)", letterSpacing: "-0.04em", fontFamily: "Inter", lineHeight: 1 }}>Prasha</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--red)", letterSpacing: "-0.04em", fontFamily: "Inter", lineHeight: 1, marginLeft: "4px" }}>India</span>
                <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.05em", fontFamily: "Inter", lineHeight: 1, marginLeft: "3px", marginBottom: "2px", opacity: 0.85 }}>PVT LTD</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "14px", height: "1px", background: "var(--red)", opacity: 0.45, flexShrink: 0 }} />
                <span style={{ fontSize: "0.57rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", fontFamily: "Inter", lineHeight: 1, whiteSpace: "nowrap" }}>सुनो दिल की बात</span>
                <div style={{ width: "14px", height: "1px", background: "var(--red)", opacity: 0.45, flexShrink: 0 }} />
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "280px", marginBottom: "24px" }}>
            India's most trusted electronics accessories brand. Built to last. Priced to be fair.
            Backed by real customer support.
          </p>
          {/* Social links */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "Instagram", icon: "📸" },
              { label: "YouTube", icon: "▶️" },
              { label: "Twitter", icon: "🐦" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                title={s.label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--red)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "18px" }}>
            Navigation
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "18px" }}>
            Products
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Power Banks", "Audio", "Chargers", "Cables", "Wearables", "Cases"].map((cat) => (
              <li key={cat}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "18px" }}>
            Contact
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>📱</span> WhatsApp
            </a>
            <QueryButton
              style={{
                color: "rgba(255,255,255,0.7)",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              <span>📋</span> Query Form
            </QueryButton>
            <a
              href="mailto:support@prashaindia.com"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              <span>✉️</span> support@prashaindia.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        © {new Date().getFullYear()} Prasha India Pvt Ltd. All Rights Reserved. Built with ❤️ in India.
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}