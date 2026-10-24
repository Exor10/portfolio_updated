"use client";

import { useScrolledPast } from "@/lib/useScrolledPast";

export default function BackToTop() {
  const show = useScrolledPast(600);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      className={`fixed right-6 bottom-6 z-[800] size-11 cursor-pointer rounded-lg border border-hairline bg-surface text-muted transition-[opacity,translate,border-color,color] duration-250 ease-out hover:border-accent hover:text-fg ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
