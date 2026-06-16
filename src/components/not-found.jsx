import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        background: "var(--cream)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Red left stripe */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5px", background: "var(--red)" }} />

      <div>
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(6rem, 15vw, 10rem)",
            fontWeight: 900,
            color: "var(--red)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            marginBottom: "8px",
            opacity: 0.12,
            userSelect: "none",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          404
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔌</div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              marginBottom: "14px",
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              color: "var(--ink-muted)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "420px",
              margin: "0 auto 36px",
            }}
          >
            Looks like this page got unplugged. Let's get you back to the good stuff.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              ← Back to Home
            </Link>
            <Link href="/products" className="btn btn-outline">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}