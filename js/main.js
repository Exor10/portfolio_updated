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

// ============ Rotating hero role ============
const roles = [
  "Full-Stack Java Developer",
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

// ============ Repo link placeholders ============
// Links still pointing at "#" show as "coming soon" until a real URL is added.
document.querySelectorAll(".repo-link").forEach((link) => {
  if (link.getAttribute("href") === "#") {
    link.classList.add("soon");
    link.textContent = "Repo coming soon ";
    link.removeAttribute("target");
  }
});

// ============ Footer year ============
document.getElementById("year").textContent = new Date().getFullYear();
