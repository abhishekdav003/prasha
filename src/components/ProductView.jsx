"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { WHATSAPP_NUMBER } from "@/data/navigation";
import { QueryButton } from "@/components/QueryForm";

function StarRating({ rating, large }) {
  const size = large ? 18 : 12;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#F5A623" : "#E0D8CE"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductView({ product }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState("features");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (₹${product.price.toLocaleString()}). Can you help me?`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div style={{ background: "var(--white)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--cream-border)", padding: "14px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "center", fontSize: "0.82rem", color: "var(--ink-faint)" }}>
          <Link href="/" style={{ color: "var(--ink-faint)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/products" style={{ color: "var(--ink-faint)", textDecoration: "none" }}>Products</Link>
          <span>›</span>
          <span style={{ color: "var(--red)", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
          className="product-detail-grid"
        >
          {/* Images */}
          <div>
            {/* Main image */}
            <div
              style={{
                background: "var(--cream)",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "1",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.3s ease",
                }}
              />
              {discount > 0 && (
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "#22C55E", color: "white",
                  borderRadius: "8px", padding: "4px 12px",
                  fontWeight: 700, fontSize: "0.85rem",
                }}>
                  Save {discount}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "10px" }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor: selectedImg === i ? "var(--red)" : "var(--cream-border)",
                    cursor: "pointer",
                    padding: 0,
                    background: "var(--cream)",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Category + badge */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {product.category}
              </span>
              {product.badge && (
                <span className="badge badge-ink">{product.badge}</span>
              )}
            </div>

            {/* Name */}
            <h1 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}>
              {product.name}
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: "1.05rem", color: "var(--red)", fontWeight: 600, marginBottom: "16px" }}>
              {product.tagline}
            </p>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <StarRating rating={product.rating} large />
              <span style={{ fontWeight: 700, color: "var(--ink)" }}>{product.rating}</span>
              <span style={{ color: "var(--ink-faint)", fontSize: "0.88rem" }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{
              background: "var(--cream)",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
                  ₹{product.price.toLocaleString()}
                </span>
                <span style={{ fontSize: "1.1rem", color: "var(--ink-faint)", textDecoration: "line-through" }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ background: "#22C55E", color: "white", borderRadius: "6px", padding: "3px 10px", fontSize: "0.8rem", fontWeight: 700 }}>
                  Save ₹{(product.originalPrice - product.price).toLocaleString()} ({discount}% off)
                </span>
                <span style={{ background: product.inStock ? "#DCFCE7" : "#FEE2E2", color: product.inStock ? "#15803D" : "#DC2626", borderRadius: "6px", padding: "3px 10px", fontSize: "0.8rem", fontWeight: 700 }}>
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Colors */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Color Options
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: c,
                      border: "3px solid",
                      borderColor: selectedColor === i ? "var(--red)" : "transparent",
                      outline: "2px solid var(--cream-border)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    aria-label={`Color option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: "1", minWidth: "150px", justifyContent: "center" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Enquiry
              </a>
              <QueryButton
                product={product.name}
                className="btn btn-outline"
                style={{ flex: "1", minWidth: "150px", justifyContent: "center" }}
              >
                📋 Query Now
              </QueryButton>
            </div>

            {/* Quick specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    background: "var(--cream)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ fontSize: "0.7rem", color: "var(--ink-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                    {key}
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)" }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Features / Full Specs */}
        <div style={{ marginTop: "80px" }}>
          <div style={{ display: "flex", borderBottom: "2px solid var(--cream-border)", marginBottom: "40px", gap: "0" }}>
            {["features", "specs", "description"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 28px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? "var(--red)" : "var(--ink-muted)",
                  borderBottom: `3px solid ${activeTab === tab ? "var(--red)" : "transparent"}`,
                  marginBottom: "-2px",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                  fontFamily: "inherit",
                }}
              >
                {tab === "features" ? "Key Features" : tab === "specs" ? "Full Specs" : "About"}
              </button>
            ))}
          </div>

          {activeTab === "features" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {product.features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "18px 20px",
                    background: "var(--cream)",
                    borderRadius: "12px",
                    border: "1px solid var(--cream-border)",
                  }}
                >
                  <div style={{
                    minWidth: "28px", height: "28px",
                    background: "var(--red)", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 900, fontSize: "0.78rem",
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.6 }}>{f}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "specs" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "12px",
            }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "var(--cream)",
                    borderRadius: "10px",
                    border: "1px solid var(--cream-border)",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--ink-faint)", fontWeight: 600, textTransform: "capitalize" }}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ink)", textAlign: "right", maxWidth: "55%" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "description" && (
            <div style={{
              maxWidth: "720px",
              background: "var(--cream)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid var(--cream-border)",
            }}>
              <p style={{ fontSize: "1.05rem", color: "var(--ink-muted)", lineHeight: 1.85 }}>
                {product.description}
              </p>
              <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Enquire on WhatsApp
                </a>
                <QueryButton product={product.name} className="btn btn-outline">
                  Submit a Query
                </QueryButton>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Related Products
                  </span>
                </div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  You May Also Like
                </h2>
              </div>
              <Link href="/products" className="btn btn-outline" style={{ whiteSpace: "nowrap" }}>
                View All →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}