// ============================================================
//  PROJECTS
//
//  Every project on the site lives here. To add one, add an entry
//  to `featuredProjects` (big cards) or `moreProjects` (list rows).
//
//  Links: set `live` for a live site, or `repo` for a GitHub repo.
//  - `privateRepo: true` shows a "Private repo" note instead of a link.
//  - `repo: null` means there's no repo, so the project shows no link.
//  - Leave `repo` empty and the project links to DEFAULT_REPO for now.
// ============================================================

export const DEFAULT_REPO = "https://github.com/Exor10/portfolio_updated";

type ProjectLinks = {
  /** A live site; when set the project links here instead of a repo. */
  live?: string;
  /** The project's GitHub repo; `null` when there is none, so no link shows. */
  repo?: string | null;
  /** The repo is private: show a "Private repo" note, since a link would 404. */
  privateRepo?: boolean;
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

export type ProjectLink = { href: string; label: string } | { note: string } | null;

export function projectLink({ live, repo, privateRepo }: ProjectLinks): ProjectLink {
  if (live) return { href: live, label: "Visit Live Site" };
  if (privateRepo) return { note: "Private repo" };
  if (repo === null) return null;
  return { href: repo || DEFAULT_REPO, label: "View Repo" };
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
    repo: "https://github.com/Exor10/enomy-wdf",
  },
  {
    title: "Employee Attendance Scanner",
    type: "Web App",
    icon: "devicon-javascript-plain",
    blurb:
      "QR attendance & timekeeping system: webcam scanner, live dashboard, and per-employee reports with CSV export — a static frontend talking to a Google Apps Script backend, deployable straight to GitHub Pages.",
    tags: ["JavaScript", "html5-qrcode", "Google Apps Script", "HTML/CSS", "GitHub Pages"],
    repo: "https://github.com/Exor10/Employee-Attendance-Scanner",
  },
  {
    title: "Inventory System",
    type: "Web App",
    icon: "devicon-google-plain",
    blurb:
      "Barcode-scanner inventory tracker that uses Google Sheets as its database through a Google Apps Script API layer — auth, config and scanning handled in a lightweight vanilla JS frontend.",
    tags: ["JavaScript", "Google Apps Script", "Google Sheets", "REST API"],
    repo: "https://github.com/Exor10/Inventory-System",
  },
  {
    title: "Inventory System (Desktop)",
    type: "Desktop App",
    icon: "devicon-python-plain",
    blurb:
      "Offline Windows app for inventory, purchasing, sales and work orders, packaged as an .exe. It reads customers' PO PDFs into work orders, imports items and documents from PDFs and scans with offline OCR, costs stock by weighted average, and exports every list and report to Excel, Word and PDF.",
    tags: ["Python", "PySide6", "SQLite", "PyInstaller", "pytest"],
    privateRepo: true,
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
    title: "OKCupid Profile Analysis",
    blurb:
      "End-to-end ML on the OKCupid profiles dataset: cleaning, feature engineering, visualizations and classification models.",
    tags: ["Python", "pandas", "scikit-learn", "Seaborn", "Jupyter"],
    repo: null,
  },
  {
    title: "Face-Recognition Attendance",
    blurb:
      "The attendance scanner plus an AI face mode: a CNN trained in Google Colab runs in the browser with TensorFlow.js, so later scans of the day need no QR card.",
    tags: ["TensorFlow.js", "Google Colab", "JavaScript", "Google Apps Script"],
    privateRepo: true,
  },
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
    privateRepo: true,
  },
  {
    title: "Enterprise Network Design",
    blurb: "Multi-site network topology designed and simulated in Cisco Packet Tracer.",
    tags: ["Networking", "Cisco Packet Tracer"],
    repo: "",
  },
];
