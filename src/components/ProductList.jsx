"use client";
import { useState, useEffect, useRef } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductList({ initialCategory = "All" }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const searchMatch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--white)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
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
                Our Products
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Built for Modern Life.
            </h2>
          </div>

          {/* Search */}
          <div style={{ position: "relative", minWidth: "220px" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--ink-faint)",
                fontSize: "16px",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 16px 10px 40px",
                borderRadius: "10px",
                border: "1.5px solid var(--cream-border)",
                background: "var(--cream)",
                fontSize: "0.88rem",
                color: "var(--ink)",
                outline: "none",
                width: "100%",
                transition: "border-color 0.2s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--red)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--cream-border)")}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "40px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--cream-border)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "99px",
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "var(--red)" : "var(--cream-border)",
                background: activeCategory === cat ? "var(--red)" : "var(--white)",
                color: activeCategory === cat ? "var(--white)" : "var(--ink-muted)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "var(--red)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = "var(--cream-border)";
                  e.currentTarget.style.color = "var(--ink-muted)";
                }
              }}
            >
              {cat}
              {cat !== "All" && (
                <span style={{ marginLeft: "6px", opacity: 0.7 }}>
                  ({products.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "var(--ink-faint)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "var(--ink)" }}>
              No products found
            </h3>
            <p>Try adjusting your search or category filter.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((product, i) => (
              <div
                key={product.id}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "0.85rem",
              color: "var(--ink-faint)",
            }}
          >
            Showing {filtered.length} of {products.length} products
          </p>
        )}
      </div>
    </section>
  );
}