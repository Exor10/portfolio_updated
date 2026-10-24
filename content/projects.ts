// ============================================================
//  PROJECTS
//
//  Every project on the site lives here. To add one, add an entry
//  to `featuredProjects` (big cards) or `moreProjects` (list rows).
//
//  Links: set `live` for a live site, or `repo` for a GitHub repo.
//  Leave both out and the project links to DEFAULT_REPO for now.
// ============================================================

export const DEFAULT_REPO = "https://github.com/Exor10/portfolio_updated";

type ProjectLinks = {
  /** A live site; when set the project links here instead of a repo. */
  live?: string;
  /** The project's GitHub repo. */
  repo?: string;
};

export type FeaturedProject = ProjectLinks & {
  title: string;
  /** Label in the card's top-right corner. */
  type: string;
  /** Devicon class for the card's icon, e.g. "devicon-nextjs-plain". */
  icon: string;
  blurb: string;
  tags: string[];
};

export type MoreProject = ProjectLinks & {
  title: string;
  blurb: string;
  tags: string[];
  badge?: "live" | "wip";
};

export function projectLink({ live, repo }: ProjectLinks) {
  return live
    ? { href: live, label: "Visit Live Site" }
    : { href: repo || DEFAULT_REPO, label: "View Repo" };
}

export const featuredProjects: FeaturedProject[] = [
  {
    // client project: the repo is private, so the card links to the live site
    title: "Kep Cool Airconditioning Services",
    type: "Live Client Site",
    icon: "devicon-nextjs-plain",
    blurb:
      "Booking website for an aircon service business in Cebu. Customers book any of 21 services and pay online through PayMongo or in cash; a separate staff admin handles scheduling, technician job reports with e-signatures, inventory and sales reports. Built with AI pair programming (Claude Code).",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PayMongo", "Vercel"],
    live: "https://kepcoolairconditioning.com",
  },
  {
    title: "Enomy-Finances",
    type: "Full-Stack Java",
    icon: "devicon-spring-original",
    blurb:
      "Financial services web app with authentication, savings & investment quotes, and currency conversion. Built first with Servlets/JSP/JDBC, then rebuilt on Spring Boot 3 with Thymeleaf, Spring Security and JPA.",
    tags: ["Java 17", "Spring Boot", "Thymeleaf", "Spring Security", "JPA", "MySQL", "Maven"],
    repo: "",
  },
  {
    title: "Employee Attendance Scanner",
    type: "Web App",
    icon: "devicon-javascript-plain",
    blurb:
      "QR attendance & timekeeping system: webcam scanner, live dashboard, and per-employee reports with CSV export — a static frontend talking to a Google Apps Script backend, deployable straight to GitHub Pages.",
    tags: ["JavaScript", "html5-qrcode", "Google Apps Script", "HTML/CSS", "GitHub Pages"],
    repo: "",
  },
  {
    title: "Inventory System",
    type: "Web App",
    icon: "devicon-google-plain",
    blurb:
      "Barcode-scanner inventory tracker that uses Google Sheets as its database through a Google Apps Script API layer — auth, config and scanning handled in a lightweight vanilla JS frontend.",
    tags: ["JavaScript", "Google Apps Script", "Google Sheets", "REST API"],
    repo: "",
  },
  {
    title: "OKCupid Profile Analysis",
    type: "Machine Learning",
    icon: "devicon-python-plain",
    blurb:
      "End-to-end ML project on the OKCupid profiles dataset: cleaning and feature engineering, exploratory visualizations, and classification models predicting user attributes from profile data.",
    tags: ["Python", "pandas", "scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    repo: "",
  },
  {
    title: "Neural Network Forecasting",
    type: "Deep Learning",
    icon: "devicon-tensorflow-original",
    blurb:
      "Deep learning notebooks covering regression on housing data and time-series forecasting of monthly milk production — model design, training curves and evaluation with TensorFlow/Keras.",
    tags: ["Python", "TensorFlow", "Keras", "Time Series", "Jupyter"],
    repo: "",
  },
];

export const moreProjects: MoreProject[] = [
  {
    title: "Sharksfin Store",
    badge: "live",
    blurb: "Static e-commerce storefront deployed with a custom domain.",
    tags: ["HTML/CSS", "JavaScript", "GitHub Pages"],
    repo: "",
  },
  {
    title: "DoBu Martial Arts",
    blurb: "Responsive martial arts gym website — front-end development project.",
    tags: ["HTML/CSS", "Bootstrap", "jQuery"],
    repo: "",
  },
  {
    title: "Java OOP Collection",
    blurb: "Banking app, ATM interface, inheritance demos and a password generator.",
    tags: ["Java", "OOP", "IntelliJ"],
    repo: "",
  },
  {
    title: "SQL Data Pipeline",
    blurb: "CSV-to-MySQL ETL with schema design and scheduled backups via batch scripts + Task Scheduler.",
    tags: ["MySQL", "SQL", "Batch"],
    repo: "",
  },
  {
    title: "Dogs and Taverns",
    badge: "wip",
    blurb:
      "A personal game project I work on in my free time — a Roblox idle autobattler / gacha RPG scripted in Luau.",
    tags: ["Luau", "Roblox Studio"],
    repo: "",
  },
  {
    title: "Enterprise Network Design",
    blurb: "Multi-site network topology designed and simulated in Cisco Packet Tracer.",
    tags: ["Networking", "Cisco Packet Tracer"],
    repo: "",
  },
];
