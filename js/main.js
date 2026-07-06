// ============ Reveal on scroll (staggered) ============
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  // Stagger siblings that reveal together: delay grows with position in parent
  revealEls.forEach((el) => {
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
      : [el];
    const idx = siblings.indexOf(el);
    el.style.setProperty("--d", `${Math.min(idx * 0.09, 0.45)}s`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

// ============ Scroll progress bar + header border + back-to-top ============
const progressBar = document.querySelector(".scroll-progress");
const header = document.querySelector(".site-header");
const toTop = document.querySelector(".to-top");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
  header.classList.toggle("scrolled", scrollTop > 10);
  toTop.classList.toggle("show", scrollTop > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

// ============ Active nav link highlighting ============
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => sectionObserver.observe(s));

// ============ Hero name slot-machine spin-in ============
// Each letter becomes a vertical reel of random characters that spins fast
// and decelerates onto the real letter — the name locks in over ~3 seconds.
// Intentionally plays even under prefers-reduced-motion.
const nameEl = document.querySelector(".hero-name");

if (nameEl) {
  const REEL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randChar = () => REEL_CHARS[Math.floor(Math.random() * REEL_CHARS.length)];

  // screen readers get the real name while the reels show random characters
  nameEl.setAttribute("aria-label", nameEl.textContent);

  const buildReel = (ch) => {
    const reel = document.createElement("span");
    reel.className = "reel";
    reel.dataset.ch = ch;
    reel.setAttribute("aria-hidden", "true");

    // invisible copy of the real letter keeps the reel's width and baseline
    const sizer = document.createElement("span");
    sizer.className = "reel-sizer";
    sizer.textContent = ch;

    const strip = document.createElement("span");
    strip.className = "reel-strip";
    const spins = 8 + Math.floor(Math.random() * 7); // 8–14 chars fly past
    for (let i = 0; i < spins; i++) {
      const cell = document.createElement("span");
      cell.textContent = randChar();
      strip.append(cell);
    }
    const target = document.createElement("span");
    target.textContent = ch;
    strip.append(target);

    strip.style.setProperty("--n", spins);
    strip.style.setProperty("--dur", `${(1.1 + Math.random() * 1.3).toFixed(2)}s`);
    strip.style.setProperty("--jd", `${(Math.random() * 0.5).toFixed(2)}s`);

    reel.append(sizer, strip);
    return reel;
  };

  [...nameEl.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent) {
        if (ch.trim() === "") {
          frag.append(ch); // keep spaces so words still wrap normally
        } else {
          frag.append(buildReel(ch));
        }
      }
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // the accent "." span — put its reel inside so it keeps its color
      const ch = node.textContent;
      node.textContent = "";
      node.append(buildReel(ch));
    }
  });

  // force a reflow so the reels' start position registers before spinning
  void nameEl.offsetWidth;

  // Hold the reels until the page has loaded, is actually being looked at,
  // and 400ms have passed — otherwise a fast load can burn through the
  // animation before the first paint is ever seen.
  const settle = () =>
    setTimeout(() => {
      nameEl.classList.add("settled");
      // once every reel has landed, swap them back to plain text
      setTimeout(() => {
        nameEl.querySelectorAll(".reel").forEach((r) => r.replaceWith(r.dataset.ch));
      }, 3400);
    }, 400);
  const armSettle = () => {
    if (document.visibilityState === "visible") {
      settle();
    } else {
      document.addEventListener("visibilitychange", function onVis() {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVis);
          settle();
        }
      });
    }
  };
  if (document.readyState === "complete") {
    armSettle();
  } else {
    window.addEventListener("load", armSettle, { once: true });
  }
}

// ============ Rotating hero role ============
const roles = [
  "Full-Stack Developer",
  "Machine Learning Enthusiast",
  "Web Developer",
  "Data Engineering Student",
];

const roleEl = document.getElementById("rotating-role");

if (!reduceMotion && roleEl) {
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let deleting = true;

  function typeLoop() {
    const current = roles[roleIdx];

    if (deleting) {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    } else {
      charIdx++;
      if (charIdx === roles[roleIdx].length) {
        deleting = true;
        setTimeout(typeLoop, 2200); // pause on the full word
        roleEl.textContent = roles[roleIdx];
        return;
      }
    }

    roleEl.textContent = (deleting ? current : roles[roleIdx]).slice(0, charIdx) || " ";
    setTimeout(typeLoop, deleting ? 40 : 70);
  }

  setTimeout(typeLoop, 2200);
}

// ============ Project repo links ============
// URLs come from js/repos.js — cards whose entry is "" fall back to DEFAULT_REPO.
document.querySelectorAll("[data-project]").forEach((card) => {
  const link = card.querySelector(".repo-link");
  if (!link) return;
  const url = (typeof PROJECT_REPOS !== "undefined" && PROJECT_REPOS[card.dataset.project]) || "";
  link.href = url || (typeof DEFAULT_REPO !== "undefined" ? DEFAULT_REPO : link.href);
});

// ============ Footer year ============
document.getElementById("year").textContent = new Date().getFullYear();
