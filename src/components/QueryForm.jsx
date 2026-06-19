"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { GOOGLE_FORM_CONFIG } from "@/data/googleForm";

/* ============================================================
   1. CONTEXT — lets ANY component open the popup, anywhere
   ============================================================ */
const QueryFormContext = createContext(null);

export function QueryFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");

  const openQueryForm = useCallback((product = "") => {
    setProductName(product || "");
    setIsOpen(true);
  }, []);

  const closeQueryForm = useCallback(() => setIsOpen(false), []);

  return (
    <QueryFormContext.Provider value={{ isOpen, productName, openQueryForm, closeQueryForm }}>
      {children}
      <QueryFormPopup />
    </QueryFormContext.Provider>
  );
}

export function useQueryForm() {
  const ctx = useContext(QueryFormContext);
  if (!ctx) {
    throw new Error("useQueryForm() must be used inside <QueryFormProvider>");
  }
  return ctx;
}

/* ============================================================
   2. QueryButton — drop-in replacement for any "Query Now" /
      "Submit a Query" link. Pass product={product.name} on
      product pages to auto-fill it; leave empty elsewhere.
   ============================================================ */
export function QueryButton({ product, className, style, children, onClick, ...rest }) {
  const { openQueryForm } = useQueryForm();
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={(e) => {
        onClick?.(e);
        openQueryForm(product);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ============================================================
   3. THE POPUP ITSELF
   ============================================================ */
const EMPTY_FORM = { name: "", mobile: "", email: "", message: "", company: "" };
// "company" is a hidden honeypot field — real users never fill it, bots often do.

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";

  const digits = data.mobile.replace(/\D/g, "");
  if (!digits) errors.mobile = "Please enter your mobile number.";
  else if (digits.length < 10) errors.mobile = "Enter a valid 10-digit mobile number.";

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

function QueryFormPopup() {
  const { isOpen, productName, closeQueryForm } = useQueryForm();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Reset everything whenever the popup is freshly opened
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("idle");
      const t = setTimeout(() => firstFieldRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeQueryForm();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeQueryForm]);

  function handleChange(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot tripped -> silently fake success, never submit
    if (form.company.trim()) {
      setStatus("success");
      return;
    }

    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");

    try {
      const body = new URLSearchParams();
      const { entries } = GOOGLE_FORM_CONFIG;
      if (entries.name) body.append(entries.name, form.name.trim());
      if (entries.mobile) body.append(entries.mobile, form.mobile.trim());
      if (entries.email && form.email.trim()) body.append(entries.email, form.email.trim());
      if (entries.message && form.message.trim()) body.append(entries.message, form.message.trim());
      if (entries.product && productName) body.append(entries.product, productName);

      // Google Forms' formResponse endpoint doesn't support CORS, so the
      // response is opaque ("no-cors"). The request still reaches Google
      // and gets recorded — we just can't read the response back.
      await fetch(GOOGLE_FORM_CONFIG.actionUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      setStatus("success");
      setTimeout(() => {
        closeQueryForm();
      }, 2400);
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Overlay (click outside to close) */}
      <div
        className="qform-overlay"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={closeQueryForm}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="qform-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qform-title"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div className="qform-head">
          <div>
            <h3 id="qform-title" className="qform-title">
              {status === "success" ? "Query Received" : "Send a Quick Query"}
            </h3>
            <p className="qform-subtitle">
              {status === "success"
                ? "Thanks — our team has it now."
                : "We usually respond within a few hours."}
            </p>
          </div>
          <button
            type="button"
            className="qform-close"
            onClick={closeQueryForm}
            aria-label="Close form"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {status === "success" ? (
          <div className="qform-success">
            <div className="qform-success-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="qform-success-text">
              Your query has been recorded successfully.
              {productName ? (
                <> We'll follow up about <strong>{productName}</strong> shortly.</>
              ) : (
                <> We'll get back to you shortly.</>
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="qform-form" noValidate>
            {productName && (
              <div className="qform-product-chip">
                <span className="qform-product-tag">Regarding</span>
                <span className="qform-product-name">{productName}</span>
              </div>
            )}

            <div className="qform-field">
              <label className="qform-label" htmlFor="qform-name">Name *</label>
              <input
                id="qform-name"
                ref={firstFieldRef}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange("name")}
                className={`qform-input ${errors.name ? "qform-input-error" : ""}`}
              />
              {errors.name && <span className="qform-error">{errors.name}</span>}
            </div>

            <div className="qform-field">
              <label className="qform-label" htmlFor="qform-mobile">Mobile Number *</label>
              <input
                id="qform-mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="9XXXXXXXXX"
                value={form.mobile}
                onChange={handleChange("mobile")}
                className={`qform-input ${errors.mobile ? "qform-input-error" : ""}`}
              />
              {errors.mobile && <span className="qform-error">{errors.mobile}</span>}
            </div>

            <div className="qform-field">
              <label className="qform-label" htmlFor="qform-email">Email (optional)</label>
              <input
                id="qform-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className={`qform-input ${errors.email ? "qform-input-error" : ""}`}
              />
              {errors.email && <span className="qform-error">{errors.email}</span>}
            </div>

            <div className="qform-field">
              <label className="qform-label" htmlFor="qform-message">Message (optional)</label>
              <textarea
                id="qform-message"
                rows={3}
                placeholder="Tell us what you need..."
                value={form.message}
                onChange={handleChange("message")}
                className="qform-input qform-textarea"
              />
            </div>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange("company")}
              className="qform-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {status === "error" && (
              <p className="qform-error-banner">
                Something went wrong sending your query. Please try again, or reach us directly on WhatsApp.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary qform-submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Submit Query"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .qform-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(26,26,26,0.42);
          transition: opacity 0.25s ease;
        }
        .qform-panel {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 380px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 130px);
          overflow-y: auto;
          background: var(--white);
          border-radius: 18px;
          border: 1px solid var(--cream-border);
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          z-index: 301;
          transform-origin: bottom right;
          transition: opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .qform-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--cream-border);
          background: var(--cream);
        }
        .qform-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }
        .qform-subtitle {
          font-size: 0.8rem;
          color: var(--ink-faint);
          margin: 0;
        }
        .qform-close {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid var(--cream-border);
          background: var(--white);
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .qform-close:hover {
          background: var(--red);
          border-color: var(--red);
          color: var(--white);
        }
        .qform-form {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .qform-product-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(204,0,0,0.06);
          border: 1px solid rgba(204,0,0,0.18);
          border-radius: 10px;
          padding: 8px 12px;
        }
        .qform-product-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--red);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .qform-product-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .qform-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .qform-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--ink-muted);
        }
        .qform-input {
          width: 100%;
          padding: 10px 13px;
          border-radius: 10px;
          border: 1.5px solid var(--cream-border);
          background: var(--cream);
          font-size: 0.88rem;
          color: var(--ink);
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }
        .qform-input:focus {
          border-color: var(--red);
          background: var(--white);
        }
        .qform-input-error {
          border-color: var(--red);
        }
        .qform-textarea {
          resize: vertical;
          min-height: 64px;
          font-family: inherit;
        }
        .qform-error {
          font-size: 0.74rem;
          color: var(--red);
          font-weight: 500;
        }
        .qform-error-banner {
          font-size: 0.78rem;
          color: var(--red);
          background: rgba(204,0,0,0.06);
          border: 1px solid rgba(204,0,0,0.18);
          border-radius: 10px;
          padding: 10px 12px;
          margin: 0;
        }
        .qform-submit {
          width: 100%;
          justify-content: center;
          margin-top: 2px;
          opacity: 1;
        }
        .qform-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .qform-honeypot {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
          left: -9999px;
        }
        .qform-success {
          padding: 32px 24px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
        }
        .qform-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #22C55E;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(34,197,94,0.35);
          animation: qformPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes qformPop {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .qform-success-text {
          font-size: 0.9rem;
          color: var(--ink-muted);
          line-height: 1.6;
          margin: 0;
          max-width: 280px;
        }

        /* Mobile: bottom-sheet style, full width */
        @media (max-width: 560px) {
          .qform-panel {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            max-height: 86vh;
            border-radius: 20px 20px 0 0;
            transform-origin: bottom center;
          }
        }
      `}</style>
    </>
  );
}