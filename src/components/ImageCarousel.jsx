"use client";
import { useEffect, useRef } from "react";

/* ─── Config ─────────────────────────────────────────────────
   Every image is shown FULLY and UNCROPPED (objectFit: "contain").
   No part of the image is ever cut off — top, bottom, or sides.

   The empty space around a "contain"-fitted image is filled with a
   soft blurred version of the same image (an industry-standard
   technique used by Spotify/Apple/YouTube) instead of ugly bars.

   `pos` only affects the decorative blurred backdrop layer (it's
   fine for that layer to crop, since it's just background texture).
   "center top"    → backdrop crop favors top of image
   "center center" → backdrop crop favors midpoint (default)
   "center bottom" → backdrop crop favors bottom of image
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
     * Each slide now renders TWO stacked images:
     *   1. A blurred, cover-fit backdrop that fills the box
     *      (purely decorative — fine if this one crops).
     *   2. The real image on top with objectFit:"contain",
     *      which guarantees it is ALWAYS shown in full —
     *      nothing is ever cut off, regardless of the image's
     *      own aspect ratio vs. the container's aspect ratio.
     *
     * The outer wrapper still does NOT use aspectRatio directly;
     * it uses height:100% / paddingTop sizing so the slides fill
     * whatever space the parent gives them.
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
            {/*
             * Blurred backdrop layer — same image, cropped + blurred, fills
             * the entire box edge-to-edge. This is what you see "around"
             * the real image instead of empty bars. Purely decorative,
             * so it's fine if this layer crops.
             */}
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         "-2%", // slightly oversized so the blur edge never shows a hard border
                width:         "104%",
                height:        "104%",
                objectFit:     "cover",
                objectPosition: img.pos,
                filter:        "blur(36px) saturate(1.15) brightness(0.65)",
                transform:     "scale(1.12)",
                display:       "block",
                pointerEvents: "none",
                userSelect:    "none",
              }}
              draggable={false}
            />

            {/* Soft dark wash so the blurred backdrop never fights the foreground image */}
            <div
              style={{
                position:   "absolute",
                inset:      "0",
                background: "rgba(10,10,10,0.18)",
              }}
            />

            {/*
             * Foreground layer — the ACTUAL image, fully visible, never
             * cropped. objectFit:"contain" guarantees the whole image
             * (top, bottom, both sides) is always shown intact.
             */}
            <img
              src={img.src}
              alt={img.alt}
              style={{
                position:       "absolute",
                inset:          "0",
                width:          "100%",
                height:         "100%",
                objectFit:      "contain",
                objectPosition: "center center",
                display:        "block",
                pointerEvents:  "none",
                userSelect:     "none",
                filter:         "drop-shadow(0 12px 32px rgba(0,0,0,0.35))",
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