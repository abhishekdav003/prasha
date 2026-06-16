"use client";
import Link from "next/link";
import { useState } from "react";
import { routes } from "@/data/navigation";

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F5A623" : "#E0D8CE"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link
      href={routes.productDetail(product.id)}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => { setHovered(true); setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
    >
      <article
        style={{
          background: "var(--white)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--cream-border)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.05)",
          borderColor: hovered ? "rgba(204,0,0,0.2)" : "var(--cream-border)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image area */}
        <div
          style={{
            position: "relative",
            background: "var(--cream)",
            aspectRatio: "1",
            overflow: "hidden",
          }}
        >
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease, opacity 0.3s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
              }}
            >
              <span
                className="badge"
                style={{
                  background: product.badge === "New" ? "var(--ink)" : "var(--red)",
                  color: "white",
                  fontSize: "0.68rem",
                }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#22C55E",
                color: "white",
                borderRadius: "6px",
                padding: "3px 8px",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              -{discount}%
            </div>
          )}

          {/* Hover overlay CTA */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26,26,26,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                background: "var(--red)",
                color: "white",
                padding: "10px 22px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.02em",
                transform: hovered ? "scale(1)" : "scale(0.88)",
                transition: "transform 0.3s ease",
              }}
            >
              View Details →
            </span>
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: "16px 18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
          }}
        >
          {/* Category */}
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--red)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {product.category}
          </span>

          {/* Name */}
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--ink-faint)",
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {product.tagline}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontWeight: 500 }}>
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "4px",
              paddingTop: "12px",
              borderTop: "1px solid var(--cream-border)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 900,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ₹{product.price.toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--ink-faint)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Color dots */}
            <div style={{ display: "flex", gap: "5px" }}>
              {product.colors.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid var(--cream-border)",
                    transition: "transform 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}