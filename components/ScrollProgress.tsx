"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  // writes the width straight to the element, so scrolling never re-renders
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.current!.style.width = docHeight > 0 ? `${(window.scrollY / docHeight) * 100}%` : "0%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={bar} aria-hidden="true" className="fixed top-0 left-0 z-[1000] h-0.5 w-0 bg-accent" />;
}
