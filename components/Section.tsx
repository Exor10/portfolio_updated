import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  title: string;
  sub: string;
  centered?: boolean;
  children: ReactNode;
};

export default function Section({ id, kicker, title, sub, centered, children }: Props) {
  return (
    <section id={id} className={`border-t border-hairline py-[clamp(4rem,10vw,8rem)] ${centered ? "text-center" : ""}`}>
      <div className="page-wrap">
        <p className="reveal mb-3 font-mono text-xs tracking-[0.08em] text-subtle uppercase">{kicker}</p>
        <h2 className="reveal mb-3 text-section font-semibold">{title}</h2>
        <p className={`reveal mb-12 max-w-[560px] text-muted ${centered ? "mx-auto" : ""}`}>{sub}</p>
        {children}
      </div>
    </section>
  );
}
