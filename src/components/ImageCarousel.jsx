"use client";
import { useEffect, useRef } from "react";

/* ─── Config ─────────────────────────────────────────────────
   Change objectPosition per image if your subject is off-centre.
   "center top"   → shows top of image (faces, skylines)
   "center center" → default midpoint
   "center bottom" → shows bottom of image
──────────────────────────────────────────────────────────── */
const IMAGES = [
  { src: "/images/img1.png", alt: "Slide 1", pos: "center center" },
  { src: "/images/img2.png", alt: "Slide 2", pos: "center center" },
];

const INTERVAL = 3000; // ms each slide stays visible
const DUR      = 850;  // ms the cross-fade takes
const EASE     = "cubic-bezier(0.76, 0, 0.24, 1)";

export default function ImageCarousel() {
  const wrapRef   = useRef(null);
  const slideRefs = useRef([]);
  const progRef   = useRef(null);
  const curRef    = useRef(0);
  const lockedRef = useRef(false);
  const rafRef    = useRef(null);
  const psRef     = useRef(null);
  const timerRef  = useRef(null);

  /* ── Instant style setter (bypasses React render) ─────── */
  function snap(el, props) {
    el.style.transition = "none";
    Object.assign(el.style, props);
  }

  /* ── Smooth rAF progress bar ──────────────────────────── */
  function startProg() {
    cancelAnimationFrame(rafRef.current);
    psRef.current = null;
    const bar = progRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";

    function tick(now) {
      if (!psRef.current) psRef.current = now;
      const p = Math.min((now - psRef.current) / INTERVAL, 1);
      bar.style.width = p * 100 + "%";
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  /* ── Core cross-fade — pure DOM, zero state ───────────── */
  function go() {
    if (lockedRef.current) return;
    lockedRef.current = true;
    cancelAnimationFrame(rafRef.current);

    const c   = curRef.current;
    const nxt = (c + 1) % IMAGES.length;
    const from = slideRefs.current[c];
    const to   = slideRefs.current[nxt];
    if (!from || !to) { lockedRef.current = false; return; }

    const T = `opacity ${DUR}ms ${EASE}, transform ${DUR}ms ${EASE}`;

    /* Park incoming: invisible, very slightly scaled up, behind */
    snap(to, {
      zIndex:    "1",
      opacity:   "0",
      transform: "scale(1.04) translateX(30px)",
    });
    from.style.zIndex = "2";

    /*
     * Double-rAF: forces the browser to commit the snap() paint
     * before beginning the animation — the only reliable way to
     * prevent flicker / snap artefacts in every browser.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        /* Outgoing: fade + drift left */
        from.style.transition = T;
        from.style.opacity    = "0";
        from.style.transform  = "scale(0.97) translateX(-24px)";

        /* Incoming: fade in + slide to resting position */
        to.style.transition = T;
        to.style.opacity    = "1";
        to.style.transform  = "scale(1) translateX(0)";

        setTimeout(() => {
          /* Reset outgoing to "waiting" state for its next turn */
          snap(from, {
            zIndex:    "1",
            opacity:   "0",
            transform: "scale(1.04) translateX(30px)",
          });
          to.style.zIndex    = "2";
          curRef.current     = nxt;
          lockedRef.current  = false;

          startProg();
          timerRef.current = setTimeout(go, INTERVAL);
        }, DUR + 60);
      });
    });
  }

  /* ── Mount ────────────────────────────────────────────── */
  useEffect(() => {
    /* Give every slide its initial position */
    slideRefs.current.forEach((el, i) => {
      snap(el, {
        position:  "absolute",
        inset:     "0",
        zIndex:    i === 0 ? "2" : "1",
        opacity:   i === 0 ? "1" : "0",
        transform: i === 0
          ? "scale(1) translateX(0)"
          : "scale(1.04) translateX(30px)",
        willChange: "transform, opacity",
      });
    });

    startProg();
    timerRef.current = setTimeout(go, INTERVAL);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Render ───────────────────────────────────────────── */
  return (
    /*
     * KEY FIX FOR IMAGE CROPPING:
     * ─────────────────────────────────────────────────────
     * We do NOT use aspectRatio on the outer wrapper.
     * Instead the wrapper is height: 100% and the images
     * use position:absolute + inset:0 so they fill whatever
     * space the parent gives them — nothing gets clipped.
     *
     * Wrap this component in a div with an explicit height:
     *   <div style={{ height: "500px" }}>
     *     <ImageCarousel />
     *   </div>
     * or use the paddingTop trick below for a responsive ratio.
     */
    <div
      ref={wrapRef}
      style={{
        /* Responsive 16:9 container — change the % for other ratios:
           4:3  → 75%   |  16:9 → 56.25%  |  21:9 → 42.85%          */
        position:     "relative",
        width:        "100%",
        paddingTop:   "56.25%", /* 16:9 — swap this number to change ratio */
        overflow:     "hidden",
        borderRadius: "16px",
        background:   "#0a0a0a",
      }}
    >
      {/* Inner absolutely-positioned box fills the padding-top space */}
      <div
        style={{
          position: "absolute",
          inset:    "0",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        {/* ── Slides ──────────────────────────────── */}
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            style={{ position: "absolute", inset: "0" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                /*
                 * position:absolute + inset:0 + width/height 100% is
                 * more reliable than just width/height on a flex child —
                 * guarantees the img fills the slide div edge-to-edge on
                 * every screen size with no whitespace.
                 */
                position:       "absolute",
                inset:          "0",
                width:          "100%",
                height:         "100%",
                objectFit:      "cover",
                /*
                 * objectPosition controls which part of the image is visible.
                 * "center center" keeps the midpoint — change per-image above.
                 * Use "center top" if faces/products are being cut at the top.
                 */
                objectPosition: img.pos,
                display:        "block",
                pointerEvents:  "none",
                userSelect:     "none",
              }}
              draggable={false}
            />
          </div>
        ))}

        {/* ── Progress bar ──────────────────────── */}
        <div
          style={{
            position:   "absolute",
            bottom:     "0",
            left:       "0",
            right:      "0",
            height:     "3px",
            background: "rgba(255,255,255,0.15)",
            zIndex:     "20",
          }}
        >
          <div
            ref={progRef}
            style={{
              height:          "100%",
              width:           "0%",
              background:      "#ffffff",
              borderRadius:    "0 99px 99px 0",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </div>
  );
}