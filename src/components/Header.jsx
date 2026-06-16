"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
          borderBottom: scrolled ? "1px solid var(--cream-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo-link">
            {/* Logo mark — image */}
            <div className="logo-mark">
              <Image
                src="/logo.png"
                alt="Prasha India Pvt Ltd"
                fill
                sizes="40px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Text lockup */}
            <div className="logo-textblock">
              {/* Brand name row */}
              <div className="logo-name-row">
                <span className="logo-brand-text logo-brand-ink">Prasha</span>
                <span className="logo-brand-text logo-brand-red">India</span>
                <span className="logo-pvtltd">PVT LTD</span>
              </div>

              {/* Tagline row */}
              <div className="logo-tagline-row">
                <span className="logo-tagline-rule" />
                <span className="logo-tagline-text">सुनो दिल की बात</span>
                <span className="logo-tagline-rule" />
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navigation.map((item) => {
              const active = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta">
            <Link
              href="/contact"
              className="btn btn-outline"
              style={{ padding: "9px 20px", fontSize: "0.88rem" }}
            >
              Query Now
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: "9px 20px", fontSize: "0.88rem" }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger-btn"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className="hamburger-bar"
              style={{
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              className="hamburger-bar"
              style={{
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="hamburger-bar"
              style={{
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="mobile-overlay"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className="mobile-drawer"
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <nav className="mobile-nav">
          {navigation.map((item, i) => {
            const active = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`mobile-nav-link ${active ? "mobile-nav-link-active" : ""}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {item.title}
                {active && <span className="mobile-nav-arrow">→</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-cta-block">
          <Link href="/contact" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
            Query Now
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </div>

        <p className="mobile-copyright">
          © 2026 Prasha India Pvt Ltd. All Rights Reserved.
        </p>
      </div>

      {/* Spacer for fixed header */}
      <div className="header-spacer" />

      {/* ============ STYLES ============ */}
      <style>{`
        /* ---------- Header shell ---------- */
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 12px;
        }
        .header-spacer { height: 68px; }

        /* ---------- Logo ---------- */
        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex-shrink: 1;
        }
        .logo-mark {
          position: relative;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--cream);
          border: 1px solid var(--cream-border);
        }
        .logo-textblock {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .logo-name-row {
          display: flex;
          align-items: flex-end;
          line-height: 1;
          flex-wrap: nowrap;
        }
        .logo-brand-text {
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          font-family: Inter, sans-serif;
          line-height: 1;
          white-space: nowrap;
        }
        .logo-brand-ink { color: var(--ink); }
        .logo-brand-red { color: var(--red); margin-left: 4px; }
        .logo-pvtltd {
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--red);
          letter-spacing: 0.05em;
          font-family: Inter, sans-serif;
          line-height: 1;
          margin-left: 3px;
          margin-bottom: 2px;
          opacity: 0.85;
          white-space: nowrap;
        }
        .logo-tagline-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .logo-tagline-rule {
          width: 14px;
          height: 1px;
          background: var(--red);
          opacity: 0.45;
          flex-shrink: 0;
          display: block;
        }
        .logo-tagline-text {
          font-size: 0.57rem;
          font-weight: 500;
          color: var(--ink-faint, #999);
          letter-spacing: 0.1em;
          font-family: Inter, sans-serif;
          line-height: 1;
          white-space: nowrap;
        }

        /* ---------- Desktop nav ---------- */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          background: transparent;
          transition: all 0.2s ease;
          position: relative;
          white-space: nowrap;
        }
        .nav-link:hover {
          background: var(--cream);
          color: var(--red);
        }
        .nav-link-active {
          font-weight: 700;
          color: var(--red);
          background: rgba(204,0,0,0.07);
        }
        .nav-link-active:hover {
          background: rgba(204,0,0,0.07);
          color: var(--red);
        }

        /* ---------- Desktop CTA ---------- */
        .desktop-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* ---------- Hamburger ---------- */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
        }
        .hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* ---------- Mobile overlay & drawer ---------- */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(26,26,26,0.5);
          transition: opacity 0.3s ease;
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 280px;
          background: var(--white);
          z-index: 100;
          padding: 80px 28px 40px;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
        }
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .mobile-nav-link {
          padding: 14px 16px;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          background: transparent;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-nav-link-active {
          font-weight: 700;
          color: var(--red);
          background: rgba(204,0,0,0.07);
        }
        .mobile-nav-arrow {
          color: var(--red);
          font-size: 18px;
        }
        .mobile-cta-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 32px;
        }
        .mobile-copyright {
          margin-top: 24px;
          font-size: 0.75rem;
          color: var(--ink-faint);
          text-align: center;
        }

        /* =========================================================
           BREAKPOINT: tablet and below — show hamburger, hide desktop nav/CTA
           ========================================================= */
        @media (max-width: 860px) {
          .desktop-nav,
          .desktop-cta {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }

        /* =========================================================
           BREAKPOINT: large desktop only — make sure hamburger is hidden
           ========================================================= */
        @media (min-width: 861px) {
          .hamburger-btn {
            display: none !important;
          }
          .mobile-overlay,
          .mobile-drawer {
            display: none !important;
          }
        }

        /* ---------- Tablet padding tightening ---------- */
        @media (max-width: 1024px) {
          .header-inner { padding: 0 16px; }
        }

        /* ---------- Mobile sizing ---------- */
        @media (max-width: 860px) {
          .header-inner { height: 64px; }
          .header-spacer { height: 64px; }
          .logo-mark { width: 36px; height: 36px; }
          .logo-brand-text { font-size: 1.05rem; }
        }

        @media (max-width: 480px) {
          .header-inner { padding: 0 12px; height: 60px; }
          .header-spacer { height: 60px; }
          .logo-link { gap: 8px; }
          .logo-mark { width: 32px; height: 32px; border-radius: 8px; }
          .logo-brand-text { font-size: 0.92rem; }
          .logo-pvtltd { font-size: 0.5rem; margin-left: 2px; }
          .logo-tagline-text { font-size: 0.48rem; letter-spacing: 0.06em; }
          .logo-tagline-rule { width: 9px; }
        }

        @media (max-width: 360px) {
          .logo-tagline-row { display: none; }
          .logo-pvtltd { display: none; }
          .logo-mark { width: 30px; height: 30px; }
          .logo-brand-text { font-size: 0.85rem; }
          .mobile-drawer { width: 88vw; max-width: 300px; }
        }

        /* ---------- Safe-area insets for notched devices ---------- */
        @supports (padding: max(0px)) {
          .header-inner {
            padding-left: max(24px, env(safe-area-inset-left));
            padding-right: max(24px, env(safe-area-inset-right));
          }
        }
        @media (max-width: 1024px) {
          @supports (padding: max(0px)) {
            .header-inner {
              padding-left: max(16px, env(safe-area-inset-left));
              padding-right: max(16px, env(safe-area-inset-right));
            }
          }
        }
        @media (max-width: 480px) {
          @supports (padding: max(0px)) {
            .header-inner {
              padding-left: max(12px, env(safe-area-inset-left));
              padding-right: max(12px, env(safe-area-inset-right));
            }
          }
        }
      `}</style>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}