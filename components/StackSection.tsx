import { stack } from "@/content/stack";
import Section from "./Section";

export default function StackSection() {
  return (
    <Section
      id="stack"
      kicker="What I work with"
      title="Tech Stack"
      sub="Every technology below comes from a real project I've built — nothing padded."
    >
      <div className="border-t border-hairline">
        {stack.map((group, g) => (
          <div
            key={group.title}
            className="reveal grid gap-3 border-b border-hairline py-6 md:grid-cols-[260px_1fr] md:gap-6"
          >
            <h3 className="flex items-baseline gap-3 font-medium md:pt-[5px]">
              <span className="font-mono text-xs font-normal text-subtle">{String(g + 1).padStart(2, "0")}</span>
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-sm transition-colors duration-150 hover:border-hairline-strong hover:bg-surface-2"
                >
                  {item.icon ? (
                    <i className={`${item.icon} text-base`} aria-hidden="true" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-subtle" />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
