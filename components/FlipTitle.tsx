"use client";

import { useEffect, useRef, useState, type AnimationEvent } from "react";

// "Learning as a ___" flips through titles like a desk flip-clock. By the time
// the visitor has spent FINAL_AFTER_MS on the page, it has landed on
// FINAL_TITLE, and it stays there for good.
// Intentionally plays even under prefers-reduced-motion.

const FLIP_TITLES = ["Student Developer", "Full-Stack Developer", "AI Engineer"];
const FINAL_TITLE = "Future Software Engineer";
const HOLD_MS = 2600; // how long each title stays up
const FINAL_AFTER_MS = 15000; // visible time on the page by which the final title is up

// "a Full-Stack Developer" but "an AI Engineer" (a vowel check is enough for these titles)
const article = (title: string) => (/^[AEIOU]/i.test(title) ? "an" : "a");

export default function FlipTitle({ start }: { start: boolean }) {
  const [shown, setShown] = useState(FLIP_TITLES[0]); // title on the settled card
  const [next, setNext] = useState<string | null>(null); // title flipping in
  const cardRef = useRef<HTMLSpanElement>(null);
  const flipDone = useRef<(() => void) | null>(null);

  // time on the page only counts while the tab is visible
  const engaged = useRef({ total: 0, last: 0 });
  useEffect(() => {
    const e = engaged.current;
    e.last = performance.now();
    const onVisibility = () => {
      const now = performance.now();
      if (document.visibilityState === "hidden") e.total += now - e.last;
      e.last = now;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!start) return;
    const e = engaged.current;
    const engagedMs = () =>
      e.total + (document.visibilityState === "visible" ? performance.now() - e.last : 0);

    // no flipping while the title is scrolled out of view — a visitor who comes
    // back up after the wait still gets to see the final flip happen
    let inView = true;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(cardRef.current!);

    // resolves when the back leaf has finished falling (see onAnimationEnd)
    const flipTo = (title: string) =>
      new Promise<void>((resolve) => {
        flipDone.current = resolve;
        setNext(title);
      });

    let timer = 0;
    let idx = 0;
    let stopped = false;
    const tick = async () => {
      if (!inView || document.visibilityState !== "visible") {
        timer = window.setTimeout(tick, 500);
        return;
      }
      // land now if waiting out another title would run past FINAL_AFTER_MS
      if (engagedMs() + HOLD_MS >= FINAL_AFTER_MS) {
        await flipTo(FINAL_TITLE); // stays for good
        return;
      }
      idx = (idx + 1) % FLIP_TITLES.length;
      await flipTo(FLIP_TITLES[idx]);
      if (!stopped) timer = window.setTimeout(tick, HOLD_MS);
    };
    timer = window.setTimeout(tick, HOLD_MS);

    return () => {
      stopped = true;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [start]);

  // The static top half shows the next title straight away; the front leaf
  // folds down off it, then the back leaf falls over the old bottom half.
  const incoming = next ?? shown;
  const onAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName !== "flip-unfold" || next === null) return;
    setShown(next);
    setNext(null);
    flipDone.current?.();
  };

  const landed = shown === FINAL_TITLE && next === null;

  return (
    <h2 className="reveal mt-6 flex flex-wrap items-center gap-x-[0.4em] gap-y-3 text-role font-medium text-muted">
      <span>
        Learning as <span>{article(incoming)}</span>
      </span>
      <span
        ref={cardRef}
        aria-hidden="true"
        className={`flip${next !== null ? " flipping" : ""}${landed ? " landed" : ""}`}
      >
        <span className="flip-sizer">
          {[...FLIP_TITLES, FINAL_TITLE].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
        <span className="flip-half flip-top">
          <span>{incoming}</span>
        </span>
        <span className="flip-half flip-bottom">
          <span>{shown}</span>
        </span>
        <span className="flip-half flip-top flip-leaf">
          <span>{shown}</span>
        </span>
        <span className="flip-half flip-bottom flip-leaf" onAnimationEnd={onAnimationEnd}>
          <span>{incoming}</span>
        </span>
      </span>
      <span className="sr-only">{FINAL_TITLE}</span>
    </h2>
  );
}
