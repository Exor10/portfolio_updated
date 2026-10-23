"use client";

import { useEffect, useState } from "react";
import { useScrolledPast } from "@/lib/useScrolledPast";
import Button from "./Button";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const scrolled = useScrolledPast(10);
  const [active, setActive] = useState("home");

  // highlight the nav link of the section crossing the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[900] h-16 border-b bg-bg/72 backdrop-blur-md backdrop-saturate-150 transition-colors duration-250 ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <nav className="page-wrap flex h-16 items-center justify-between gap-6">
        <a href="#home" className="text-lg font-semibold tracking-[-0.02em]">
          NC<span className="text-accent">.</span>
        </a>
        <ul className="hidden gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  active === id ? "bg-accent-soft text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="https://github.com/Exor10" variant="ghost" size="sm" external>
          GitHub ↗
        </Button>
      </nav>
    </header>
  );
}
