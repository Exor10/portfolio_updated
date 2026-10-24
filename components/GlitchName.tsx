"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

// Every letter scrambles through random glyphs and locks onto the real one,
// left to right, while a red/cyan channel split flickers and fades out.
// Hovering the settled name replays a quicker, lighter version.
// Intentionally plays even under prefers-reduced-motion.

const NAME = "Nathan Ian Comiso";
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randGlyph = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

type Letter = { ch: string; i: number; accent?: boolean };

// each word's letters, numbered across the whole name; the last word carries
// the accent "." so a line can never break between "Comiso" and its dot
let count = 0;
const WORDS: Letter[][] = NAME.split(" ").map((word) => [...word].map((ch) => ({ ch, i: count++ })));
WORDS[WORDS.length - 1].push({ ch: ".", i: count++, accent: true });

type Decode = { base: number; stagger: number; jitter: number; lite?: boolean };
const INTRO: Decode = { base: 200, stagger: 45, jitter: 120 };
const HOVER: Decode = { base: 60, stagger: 18, jitter: 90, lite: true };

export default function GlitchName({ onIntroDone }: { onIntroDone: () => void }) {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // layout effect: scramble before the first paint so the real name never
  // flashes before the decode
  useLayoutEffect(() => {
    const name = nameRef.current!;
    const glyphs = [...name.querySelectorAll<HTMLElement>(".glitch-glyph")];
    let raf = 0;
    let timer = 0;
    let running = true; // the intro is pending from the start

    const scramble = () =>
      glyphs.forEach((g) => {
        g.textContent = randGlyph();
        g.parentElement!.classList.remove("locked");
      });

    const decode = ({ base, stagger, jitter, lite = false }: Decode) =>
      new Promise<void>((resolve) => {
        const lockAt = glyphs.map((_, i) => base + i * stagger + Math.random() * jitter);
        name.style.setProperty("--glitch-dur", `${Math.round(Math.max(...lockAt))}ms`);
        name.classList.toggle("lite", lite);
        name.classList.remove("glitching");
        void name.offsetWidth; // restart the channel-split animation
        name.classList.add("glitching");

        const start = performance.now();
        let lastSwap = start;
        const frame = (now: number) => {
          const swap = now - lastSwap >= 50; // new glyphs ~20 times a second
          if (swap) lastSwap = now;
          let pending = 0;
          glyphs.forEach((g, i) => {
            const cell = g.parentElement!;
            if (cell.classList.contains("locked")) return;
            if (now - start >= lockAt[i]) {
              g.textContent = cell.dataset.ch!;
              cell.classList.add("locked");
            } else {
              pending++;
              if (swap) g.textContent = randGlyph();
            }
          });
          if (pending) {
            raf = requestAnimationFrame(frame);
          } else {
            name.classList.remove("glitching", "lite");
            running = false;
            resolve();
          }
        };
        raf = requestAnimationFrame(frame);
      });

    scramble();

    // Hold the decode until the page has loaded, is actually being looked at,
    // and 400ms have passed — otherwise a fast load can burn through the
    // animation before the first paint is ever seen.
    const settle = () => {
      timer = window.setTimeout(() => decode(INTRO).then(onIntroDone), 400);
    };
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      settle();
    };
    const armSettle = () => {
      if (document.visibilityState === "visible") settle();
      else document.addEventListener("visibilitychange", onVisible);
    };
    if (document.readyState === "complete") armSettle();
    else window.addEventListener("load", armSettle, { once: true });

    const onEnter = () => {
      if (running) return;
      running = true;
      scramble();
      decode(HOVER);
    };
    name.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("load", armSettle);
      document.removeEventListener("visibilitychange", onVisible);
      name.removeEventListener("mouseenter", onEnter);
    };
  }, [onIntroDone]);

  return (
    // screen readers get the real name while the cells show random glyphs
    <h1 ref={nameRef} aria-label={`${NAME}.`} className="reveal text-hero font-semibold [font-kerning:none]">
      {WORDS.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="glitch-word">
            {word.map(({ ch, i, accent }) => (
              <span
                key={i}
                aria-hidden="true"
                data-ch={ch}
                className={`glitch-cell locked${accent ? " text-accent" : ""}`}
              >
                <span className="glitch-glyph">{ch}</span>
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
