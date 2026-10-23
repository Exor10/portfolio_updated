"use client";

import { useEffect } from "react";

/** Fades every `.reveal` element in as it scrolls into view, staggering siblings. */
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    // Stagger siblings that reveal together: delay grows with position in parent
    els.forEach((el) => {
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
        : [el];
      el.style.setProperty("--d", `${Math.min(siblings.indexOf(el) * 0.09, 0.45)}s`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
