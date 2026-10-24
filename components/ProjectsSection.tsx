import {
  featuredProjects,
  moreProjects,
  projectLink,
  type FeaturedProject,
  type MoreProject,
  type ProjectLink,
} from "@/content/projects";
import Section from "./Section";

function Tags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="rounded-md bg-white/4 px-2 py-[3px] font-mono text-[0.72rem] text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** A repo or site link, a "Private repo" note, or nothing when there's no repo. */
function ProjectLinkSlot({ link, className = "" }: { link: ProjectLink; className?: string }) {
  if (link === null) return null;
  if ("note" in link) {
    return <p className={`font-mono text-xs text-subtle ${className}`}>{link.note}</p>;
  }
  return (
    <div className={className}>
      <CardLink {...link} />
    </div>
  );
}

/** The link stretches over its whole card, so anywhere on the card opens it. */
function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent before:absolute before:inset-0"
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </a>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="reveal group relative flex flex-col rounded-card border border-hairline bg-surface p-6 transition-colors duration-250 ease-out hover:border-hairline-strong hover:bg-surface-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent">
      <div className="mb-6 flex items-center justify-between gap-3">
        <i className={`${project.icon} text-xl text-muted`} aria-hidden="true" />
        <span className="font-mono text-xs tracking-[0.06em] text-subtle uppercase">{project.type}</span>
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-lg/[1.3] font-semibold tracking-[-0.015em]">{project.title}</h3>
        <p className="text-[0.95rem] text-muted">{project.blurb}</p>
        <Tags tags={project.tags} className="mt-4" />
      </div>
      <ProjectLinkSlot link={projectLink(project)} className="mt-6" />
    </article>
  );
}

function Badge({ kind }: { kind: NonNullable<MoreProject["badge"]> }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-medium tracking-[0.04em] text-muted uppercase">
      <span className={`size-1.5 rounded-full ${kind === "live" ? "bg-live" : "bg-wip"}`} />
      {kind === "live" ? "Live" : "In Dev"}
    </span>
  );
}

function MoreProjectRow({ project }: { project: MoreProject }) {
  const link = projectLink(project);
  const linked = link !== null && "href" in link;
  return (
    <article className="reveal group relative border-t border-hairline py-6">
      <h4
        className={`mb-1 flex items-center gap-3 font-semibold tracking-[-0.01em] transition-colors duration-150 ${
          linked ? "group-hover:text-accent" : ""
        }`}
      >
        {project.title}
        {project.badge && <Badge kind={project.badge} />}
      </h4>
      <p className="text-sm text-muted">{project.blurb}</p>
      <Tags tags={project.tags} className="mt-3" />
      <ProjectLinkSlot link={link} className="mt-3" />
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <Section
      id="projects"
      kicker="Things I've built"
      title="Project Showcase"
      sub="Repo links are being added as I publish each project to GitHub."
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <h3 className="reveal mt-16 mb-4 text-lg font-semibold tracking-[-0.015em]">More Projects</h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-12">
        {moreProjects.map((project) => (
          <MoreProjectRow key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
