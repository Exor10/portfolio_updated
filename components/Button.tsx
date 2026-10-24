import type { ReactNode } from "react";

const VARIANTS = {
  primary: "border-transparent bg-fg text-bg hover:bg-zinc-300",
  ghost: "border-hairline text-fg hover:border-hairline-strong hover:bg-surface-2",
};

const SIZES = {
  md: "px-[18px] py-3",
  sm: "px-3.5 py-2",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Opens in a new tab. */
  external?: boolean;
};

export default function Button({ href, children, variant = "primary", size = "md", external }: Props) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener" })}
      className={`inline-flex items-center gap-2 rounded-lg border text-sm leading-none font-medium transition-colors duration-150 ${VARIANTS[variant]} ${SIZES[size]}`}
    >
      {children}
    </a>
  );
}
