export const metadata = {
  title: "About Us",
  description:
    "Learn about SMR — India's premium mobile accessories brand built on quality, reliability and real customer support.",
};

const team = [
  { name: "Sunil", role: "Founder", emoji: "👨‍💼" },
  { name: "Subhash Sharma", role: "Founder", emoji: "👨‍💼" },
];

const milestones = [
  { year: "2019", event: "SMR founded with a single cable product" },
  {
    year: "2020",
    event: "Launched first power bank line — sold out in 48 hours",
  },
  { year: "2021", event: "Crossed 10,000 customers across India" },
  { year: "2022", event: "Expanded to audio — AeroBuds line launched" },
  { year: "2023", event: "Crossed ₹5 Crore in annual revenue" },
  {
    year: "2024",
    event: "SmartWatch Edge launched — our most complex product",
  },
  { year: "2026", event: "50,000+ happy customers and growing every day" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--white)" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "var(--cream)",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red left stripe */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            background: "var(--red)",
          }}
        />

        <div
          style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
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
              Our Story
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
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              marginBottom: "28px",
            }}
          >
            Built by People Who Were
            <br />
            <span style={{ color: "var(--red)" }}>
              Tired of Bad Accessories.
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--ink-muted)",
              lineHeight: 1.8,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            SMR started in 2019 when our founder, Sunil, got fed up with cables
            that broke in three months, power banks that lied about capacity,
            and earbuds that fell apart after a year. He decided to build
            better. We've been doing exactly that ever since.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 24px", background: "var(--white)" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
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
                Our Mission
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                marginBottom: "20px",
                lineHeight: 1.15,
              }}
            >
              Make Premium Accessible to Every Indian.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--ink-muted)",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              We believe you shouldn't have to choose between quality and
              affordability. Our supply chain is built directly with certified
              manufacturers, cutting out the middlemen so you pay for the
              product — not the markup.
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--ink-muted)",
                lineHeight: 1.8,
              }}
            >
              Every SMR product is tested in real Indian conditions — voltage
              spikes, monsoon humidity, and the chaos of daily life. If it
              doesn't survive our lab, it doesn't reach your hands.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {[
              { value: "50K+", label: "Happy Customers", icon: "😊" },
              { value: "100+", label: "Products Launched", icon: "📦" },
              { value: "4.8★", label: "Average Rating", icon: "⭐" },
              { value: "12mo", label: "Warranty on All", icon: "🛡️" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "var(--cream)",
                  borderRadius: "16px",
                  padding: "28px 20px",
                  textAlign: "center",
                  border: "1px solid var(--cream-border)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "var(--ink)",
                    letterSpacing: "-0.03em",
                    marginBottom: "6px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-faint)",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                Our Journey
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
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              From Zero to 50,000 Customers.
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "28px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                background: "var(--cream-border)",
              }}
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              {milestones.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      minWidth: "58px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background:
                          i === milestones.length - 1
                            ? "var(--red)"
                            : "var(--white)",
                        border: `3px solid ${i === milestones.length - 1 ? "var(--red)" : "var(--cream-border)"}`,
                        boxShadow:
                          i === milestones.length - 1
                            ? "0 0 0 4px rgba(204,0,0,0.15)"
                            : "none",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      background: "var(--white)",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      flex: 1,
                      border: "1px solid var(--cream-border)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "var(--red)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {m.year}
                    </span>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--ink)",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}
                    >
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "var(--white)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                The Team
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
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              The People Behind SMR.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                className="team-card"
                style={{
                  background: "var(--cream)",
                  borderRadius: "16px",
                  padding: "36px 24px",
                  textAlign: "center",
                  border: "1px solid var(--cream-border)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(204,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 16px",
                    border: "2px solid rgba(204,0,0,0.12)",
                  }}
                >
                  {member.emoji}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "var(--ink)",
                    marginBottom: "6px",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-faint)",
                    fontWeight: 500,
                  }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
