"use client";
import { useState, useRef } from "react";
import { WHATSAPP_URL } from "@/data/navigation";
import Link from "next/link";
import { QueryButton } from "@/components/QueryForm";

const FAQ_ITEMS = [
  {
    category: "Orders & Shipping",
    q: "How long does shipping take?",
    a: "Standard shipping across India takes 3–5 business days. Express delivery (1–2 days) is available for select pincodes. Once your order is dispatched, you'll receive a tracking link on WhatsApp.",
  },
  {
    category: "Orders & Shipping",
    q: "Do you ship pan-India?",
    a: "Yes, we deliver to 27,000+ pincodes across India including Tier-2 and Tier-3 cities. For remote areas, delivery may take an additional 1–2 days.",
  },
  {
    category: "Returns & Warranty",
    q: "What is your return policy?",
    a: "We offer a 7-day no-questions-asked return policy on all products, provided they are unused and in original packaging. Initiate your return via WhatsApp or our query form and we'll arrange a pickup.",
  },
  {
    category: "Returns & Warranty",
    q: "What does the warranty cover?",
    a: "Our 12-month warranty covers manufacturing defects, hardware failures, and performance issues under normal usage. Physical damage, liquid damage, and misuse are not covered. Warranty claims are processed within 3–5 business days.",
  },
  {
    category: "Returns & Warranty",
    q: "How do I claim a warranty?",
    a: "Simply WhatsApp us with your order ID and a short video or photo of the issue. Our support team will guide you through the replacement or repair process — typically resolved within 48 hours.",
  },
  {
    category: "Bulk & Business",
    q: "Do you offer bulk or wholesale pricing?",
    a: "Absolutely. We have special pricing tiers for bulk orders of 10+ units with additional discounts at 50+ and 100+ unit thresholds. Fill out our query form or WhatsApp us with your requirements for a custom quote.",
  },
  {
    category: "Bulk & Business",
    q: "Can we get custom branding / white-label products?",
    a: "Yes, we offer private label and co-branding solutions for businesses. Minimum order quantities apply. Reach out via our query form with your brand details and we'll connect you with our B2B team.",
  },
  {
    category: "Products",
    q: "Are your products compatible with all phone models?",
    a: "Most of our accessories (cables, chargers, power banks) are universally compatible. Model-specific products like cases and screen protectors are clearly labeled with compatible devices on the product page.",
  },
  {
    category: "Products",
    q: "What certifications do your chargers carry?",
    a: "All our chargers and cables are BIS certified (Bureau of Indian Standards) and meet international safety standards. Our fast-charging accessories are certified by the relevant protocol authorities (PD, QC, VOOC etc.).",
  },
  {
    category: "Payments",
    q: "What payment methods do you accept?",
    a: "We accept UPI (GPay, PhonePe, Paytm), all major debit/credit cards, net banking, EMI options, and Cash on Delivery (COD) for eligible pincodes.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const categories = [...new Set(FAQ_ITEMS.map((f) => f.category))];

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              width: "24px",
              height: "3px",
              background: "var(--red)",
              display: "block",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--red)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            FAQ
          </span>
          <span
            style={{
              width: "24px",
              height: "3px",
              background: "var(--red)",
              display: "block",
              borderRadius: "2px",
            }}
          />
        </div>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 900,
            color: "var(--ink)",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
            lineHeight: 1.15,
          }}
        >
          Common Questions
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--ink-muted)",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}
        >
          Everything you need to know about our products, shipping, and support.
          Can't find an answer? We're a WhatsApp message away.
        </p>
      </div>

      {/* Category groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {categories.map((cat) => (
          <div key={cat}>
            {/* Category label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--red)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {cat}
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--cream-border)",
                }}
              />
            </div>

            {/* Items */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {FAQ_ITEMS.filter((f) => f.category === cat).map((item, i) => {
                const globalIndex = FAQ_ITEMS.indexOf(item);
                const isOpen = openIndex === globalIndex;
                return (
                  <AccordionItem
                    key={globalIndex}
                    item={item}
                    isOpen={isOpen}
                    onToggle={() => setOpenIndex(isOpen ? null : globalIndex)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: "56px",
          background: "var(--ink)",
          borderRadius: "20px",
          padding: "40px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--red)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Still have questions?
          </p>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            We're here to help, always.
          </h3>
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.5)",
              marginTop: "6px",
            }}
          >
            Avg. response time · under 15 minutes
          </p>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#25D366",
            color: "white",
            fontWeight: 700,
            fontSize: "0.92rem",
            padding: "13px 24px",
            borderRadius: "10px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  return (
    <div
      style={{
        background: isOpen ? "var(--white)" : "var(--cream)",
        border: isOpen
          ? "1.5px solid var(--red)"
          : "1.5px solid var(--cream-border)",
        borderRadius: "14px",
        overflow: "hidden",
        transition:
          "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
        boxShadow: isOpen ? "0 4px 24px rgba(204,0,0,0.07)" : "none",
      }}
    >
      {/* Trigger */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "0.97rem",
            fontWeight: 700,
            color: isOpen ? "var(--red)" : "var(--ink)",
            lineHeight: 1.4,
            transition: "color 0.2s ease",
            flex: 1,
          }}
        >
          {item.q}
        </span>

        {/* +/- icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: isOpen ? "var(--red)" : "rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.25s ease, transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2v8M2 6h8"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </button>

      {/* Animated body */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <p
          style={{
            padding: "0 24px 22px",
            fontSize: "0.91rem",
            color: "var(--ink-muted)",
            lineHeight: 1.75,
            borderTop: "1px solid var(--cream-border)",
            paddingTop: "16px",
            margin: 0,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <section style={{ background: "var(--white)" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid var(--cream-border)",
          padding: "80px 24px 60px",
        }}
      >
        <div
          style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "3px",
                background: "var(--red)",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--red)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </span>
            <span
              style={{
                width: "24px",
                height: "3px",
                background: "var(--red)",
                display: "block",
              }}
            />
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            We're One Message Away.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
            }}
          >
            Have a question about a product? Need help with an order? Our team
            responds within minutes on WhatsApp.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
            marginBottom: "60px",
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "#25D366",
              borderRadius: "20px",
              padding: "40px 32px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>💬</div>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                marginBottom: "10px",
                letterSpacing: "-0.02em",
              }}
            >
              WhatsApp Support
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.9,
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Chat with us directly. Get product recommendations, order help,
              and warranty support — instantly.
            </p>
            <span
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "8px",
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "inline-block",
              }}
            >
              Chat Now →
            </span>
          </a>

          <QueryButton
            style={{
              display: "block",
              width: "100%",
              background: "var(--cream)",
              border: "1.5px solid var(--cream-border)",
              borderRadius: "20px",
              padding: "40px 32px",
              textDecoration: "none",
              color: "var(--ink)",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>📋</div>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                marginBottom: "10px",
                letterSpacing: "-0.02em",
              }}
            >
              Submit a Query
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              For bulk orders, partnerships, or detailed enquiries, fill out our
              form and we'll get back to you within 24 hours.
            </p>
            <span
              className="btn btn-primary"
              style={{ display: "inline-flex" }}
            >
              Open Form →
            </span>
          </QueryButton>

          <div
            style={{
              background: "var(--ink)",
              borderRadius: "20px",
              padding: "40px 32px",
              color: "white",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🕐</div>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                marginBottom: "10px",
                letterSpacing: "-0.02em",
              }}
            >
              Support Hours
            </h2>
            <div
              style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.8 }}
            >
              <p>Monday – Saturday</p>
              <p
                style={{
                  fontWeight: 700,
                  opacity: 1,
                  color: "white",
                  fontSize: "1.05rem",
                }}
              >
                9:00 AM – 7:00 PM IST
              </p>
              <p style={{ marginTop: "12px" }}>
                WhatsApp responses typically within{" "}
                <strong style={{ color: "white" }}>15 minutes</strong>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ />
      </div>
    </section>
  );
}
