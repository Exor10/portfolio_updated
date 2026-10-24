"use client";

import { useEffect, useState } from "react";

/** The email as a mailto link, with a button that copies it to the clipboard. */
export default function EmailLink({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    navigator.clipboard.writeText(email).then(
      () => setCopied(true),
      () => {} // clipboard blocked: the mailto link still works
    );
  };

  return (
    <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm">
      <a href={`mailto:${email}`} className="text-muted transition-colors duration-150 hover:text-accent">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer rounded-md border border-hairline px-2 text-xs text-subtle transition-colors duration-150 hover:border-hairline-strong hover:text-fg"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
