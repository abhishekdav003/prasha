"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { featuredProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
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
    <section ref={ref} style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ width: "24px", height: "3px", background: "var(--red)", display: "block" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Top Picks
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}>
              Bestselling Products.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--ink-muted)", marginTop: "10px", maxWidth: "420px" }}>
              Trusted by thousands of customers across India. Engineered to last.
            </p>
          </div>
          <Link href="/products" className="btn btn-outline">
            See All Products →
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {featuredProducts.map((product, i) => (
            <div
              key={product.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}