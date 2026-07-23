"use client";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CatalogButton — floating download button for PrashaIndia product catalog
//
// Placement : right side, vertically centred (middle of viewport)
// Behaviour : collapsed tab → click → expanded panel with download CTA
// Mobile    : bottom-sheet style panel, tab on right edge
// Desktop   : side-tab expands into a sleek panel
// PDF path  : /public/catalog.pdf  (served at /catalog.pdf)
// ─────────────────────────────────────────────────────────────────────────────

const CATALOG_PATH = "/catalog.pdf";
const CATALOG_NAME = "PrashaIndia-Product-Catalog.pdf";

export default function CatalogButton() {
  const [open, setOpen]           = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded]   = useState(false);
  const [visible, setVisible]     = useState(false);
  const panelRef                  = useRef(null);

  // Fade in after mount so it doesn't flash on SSR
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleDownload = () => {
    setDownloading(true);

    // Create a temporary <a> to trigger browser download dialog
    const a = document.createElement("a");
    a.href = CATALOG_PATH;
    a.download = CATALOG_NAME;
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Simulate progress then show success state
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      // Reset back to normal after 3s
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  };

  const handlePreview = () => {
    window.open(CATALOG_PATH, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* ── Floating container ── */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 998,
          display: "flex",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        className="catalog-fab-root"
      >
        {/* ── Expanded panel (slides in from right) ── */}
        <div
          style={{
            width: open ? "260px" : "0px",
            overflow: "hidden",
            transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
          aria-hidden={!open}
        >
          <div
            style={{
              width: "260px",
              background: "var(--white)",
              borderRadius: "16px 0 0 16px",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
              border: "1px solid var(--cream-border)",
              borderRight: "none",
              padding: "20px 20px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Panel header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--red)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CatalogIcon color="white" size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  Product Catalog
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-faint)", fontWeight: 500, marginTop: "2px" }}>
                  PrashaIndia Pvt. Ltd.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--cream-border)" }} />

            {/* Stats row */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: "📄", label: "100+ Products" },
                { icon: "🎨", label: "Full Specs" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    background: "var(--cream)",
                    borderRadius: "8px",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1rem", marginBottom: "2px" }}>{s.icon}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.6, margin: 0 }}>
              Our complete product catalog with detailed specs, pricing, and high-resolution images.
            </p>

            {/* Primary: Download button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "11px 16px",
                background: downloaded ? "#22C55E" : "var(--red)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: downloading ? "wait" : "pointer",
                transition: "background 0.3s ease, transform 0.2s ease",
                transform: downloading ? "scale(0.97)" : "scale(1)",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { if (!downloading && !downloaded) e.currentTarget.style.background = "var(--red-dark)"; }}
              onMouseLeave={(e) => { if (!downloading && !downloaded) e.currentTarget.style.background = "var(--red)"; }}
            >
              {downloading ? (
                <>
                  <Spinner />
                  Downloading...
                </>
              ) : downloaded ? (
                <>
                  <CheckIcon />
                  Downloaded!
                </>
              ) : (
                <>
                  <DownloadIcon />
                  Download Catalog
                </>
              )}
            </button>

            {/* Secondary: Preview button */}
            <button
              onClick={handlePreview}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                padding: "9px 16px",
                background: "transparent",
                color: "var(--ink-muted)",
                border: "1.5px solid var(--cream-border)",
                borderRadius: "10px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.color = "var(--red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cream-border)";
                e.currentTarget.style.color = "var(--ink-muted)";
              }}
            >
              <EyeIcon />
              Preview in Browser
            </button>

            {/* Footer note */}
            <p style={{ fontSize: "0.62rem", color: "var(--ink-faint)", textAlign: "center", margin: 0 }}>
              PDF format · Updated 2026
            </p>
          </div>
        </div>

        {/* ── Side tab (always visible, toggles panel) ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close catalog panel" : "Download product catalog"}
          aria-expanded={open}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "36px",
            padding: "18px 0",
            background: open ? "var(--ink)" : "var(--red)",
            color: "white",
            border: "none",
            borderRadius: "10px 0 0 10px",
            cursor: "pointer",
            boxShadow: "-4px 0 20px rgba(0,0,0,0.18)",
            transition: "background 0.25s ease",
            flexShrink: 0,
            outline: "none",
          }}
          onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "var(--red-dark)"; }}
          onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "var(--red)"; }}
        >
          {/* Rotated label */}
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            Catalog
          </span>

          {/* Icon */}
          <div
            style={{
              transition: "transform 0.3s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
            }}
          >
            <ChevronIcon />
          </div>
        </button>
      </div>

      {/* ── Backdrop blur on mobile when open ── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,26,26,0.4)",
          zIndex: 997,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        className="catalog-backdrop"
        aria-hidden="true"
      />

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Mobile: panel becomes bottom-sheet style */
        @media (max-width: 640px) {
          .catalog-fab-root {
            top: auto !important;
            bottom: 120px !important;
            transform: none !important;
          }
          .catalog-backdrop {
            display: block;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .catalog-fab-root * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Icon components ──────────────────────────────────────────────────────────

function CatalogIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "catalog-spin 0.8s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <style>{`@keyframes catalog-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}