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

// ============ Hero name glitch decode ============
// Every letter scrambles through random glyphs and locks onto the real one,
// left to right, while a red/cyan channel split flickers and fades out.
// Hovering the settled name replays a quicker, lighter version.
// Intentionally plays even under prefers-reduced-motion.
const nameEl = document.querySelector(".hero-name");

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randGlyph = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

// resolves once the intro decode has landed — the title flips wait on it
let nameIntro = Promise.resolve();

if (nameEl) {
  // screen readers get the real name while the cells show random glyphs
  nameEl.setAttribute("aria-label", nameEl.textContent);

  let glitching = true; // the intro is pending from the start

  // Wrap each letter in a cell: an invisible copy of the real letter holds the
  // cell's width and baseline, and the scrambling glyph floats on top of it.
  const buildCells = () => {
    const cells = [];
    const toCells = (parent) => {
      [...parent.childNodes].forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          for (const ch of node.textContent) {
            if (ch.trim() === "") {
              frag.append(ch); // keep spaces so words still wrap normally
              continue;
            }
            const cell = document.createElement("span");
            cell.className = "glitch-cell";
            cell.setAttribute("aria-hidden", "true");
            const sizer = document.createElement("span");
            sizer.className = "glitch-sizer";
            sizer.textContent = ch;
            const glyph = document.createElement("span");
            glyph.className = "glitch-glyph";
            glyph.textContent = randGlyph();
            cell.append(sizer, glyph);
            cells.push({ cell, glyph, ch, locked: false });
            frag.append(cell);
          }
          node.replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          toCells(node); // the accent "." span — its cell stays inside so it keeps its color
        }
      });
    };
    toCells(nameEl);

    // group each word's cells (accent "." included) into a nowrap span so a
    // line can't break between two cells in the middle of a word
    let word = null;
    [...nameEl.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "") {
        word = null;
        return;
      }
      if (!word) {
        word = document.createElement("span");
        word.className = "glitch-word";
        node.before(word);
      }
      word.append(node);
    });
    return cells;
  };

  // swap the cells back to plain text once every letter has landed
  const unwrapCells = () => {
    nameEl.querySelectorAll(".glitch-cell").forEach((c) => c.replaceWith(c.firstChild.textContent));
    nameEl.querySelectorAll(".glitch-word").forEach((w) => w.replaceWith(...w.childNodes));
    nameEl.normalize();
  };

  const decode = (cells, { base, stagger, jitter, lite = false }) =>
    new Promise((resolve) => {
      const lockAt = cells.map((_, i) => base + i * stagger + Math.random() * jitter);
      nameEl.style.setProperty("--glitch-dur", `${Math.round(Math.max(...lockAt))}ms`);
      nameEl.classList.toggle("lite", lite);
      nameEl.classList.remove("glitching");
      void nameEl.offsetWidth; // restart the channel-split animation
      nameEl.classList.add("glitching");

      const start = performance.now();
      let lastSwap = start;
      const frame = (now) => {
        const t = now - start;
        const swap = now - lastSwap >= 50; // new glyphs ~20 times a second
        if (swap) lastSwap = now;
        let pending = 0;
        cells.forEach((c, i) => {
          if (c.locked) return;
          if (t >= lockAt[i]) {
            c.locked = true;
            c.glyph.textContent = c.ch;
            c.cell.classList.add("locked");
          } else {
            pending++;
            if (swap) c.glyph.textContent = randGlyph();
          }
        });
        if (pending) {
          requestAnimationFrame(frame);
        } else {
          unwrapCells();
          nameEl.classList.remove("glitching", "lite");
          glitching = false;
          resolve();
        }
      };
      requestAnimationFrame(frame);
    });

  // scramble right away so the real name never flashes before the decode
  const introCells = buildCells();

  nameIntro = new Promise((resolve) => {
    // Hold the decode until the page has loaded, is actually being looked at,
    // and 400ms have passed — otherwise a fast load can burn through the
    // animation before the first paint is ever seen.
    const settle = () =>
      setTimeout(() => {
        decode(introCells, { base: 200, stagger: 45, jitter: 120 }).then(resolve);
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
  });

  nameEl.addEventListener("mouseenter", () => {
    if (glitching) return;
    glitching = true;
    decode(buildCells(), { base: 60, stagger: 18, jitter: 90, lite: true });
  });
}

// ============ Hero title flip ============
// "Learning as a ___" flips through titles like a desk flip-clock. Once the
// visitor has spent FINAL_AFTER_MS on the page, the next flip lands on
// FINAL_TITLE and stays there for good.
// Intentionally plays even under prefers-reduced-motion.
const FLIP_TITLES = ["Student Developer", "Full-Stack Developer", "Data Science Student"];
const FINAL_TITLE = "Future Software Engineer";
const HOLD_MS = 2600; // how long each title stays up
const FINAL_AFTER_MS = 30000; // visible time on the page before the final flip

const flipEl = document.getElementById("role-flip");

if (flipEl) {
  const half = (cls, text) => {
    const el = document.createElement("span");
    el.className = `flip-half ${cls}`;
    const inner = document.createElement("span");
    inner.textContent = text;
    el.append(inner);
    return el;
  };

  // every title stacked in one grid cell, so the card is as wide as the longest
  const sizer = document.createElement("span");
  sizer.className = "flip-sizer";
  [...FLIP_TITLES, FINAL_TITLE].forEach((t) => {
    const s = document.createElement("span");
    s.textContent = t;
    sizer.append(s);
  });

  const top = half("flip-top", FLIP_TITLES[0]);
  const bottom = half("flip-bottom", FLIP_TITLES[0]);
  const leafFront = half("flip-top flip-leaf", FLIP_TITLES[0]);
  const leafBack = half("flip-bottom flip-leaf", FLIP_TITLES[0]);
  flipEl.replaceChildren(sizer, top, bottom, leafFront, leafBack);

  const setText = (el, text) => (el.firstElementChild.textContent = text);

  // The static top half shows the next title straight away; the front leaf
  // folds down off it, then the back leaf falls over the old bottom half.
  const flipTo = (next) =>
    new Promise((resolve) => {
      setText(top, next);
      setText(leafBack, next);
      leafBack.addEventListener(
        "animationend",
        () => {
          setText(bottom, next);
          setText(leafFront, next);
          flipEl.classList.remove("flipping");
          resolve();
        },
        { once: true }
      );
      flipEl.classList.add("flipping");
    });

  // time on the page only counts while the tab is visible
  let engaged = 0;
  let last = performance.now();
  document.addEventListener("visibilitychange", () => {
    const now = performance.now();
    if (document.visibilityState === "hidden") engaged += now - last;
    last = now;
  });
  const engagedMs = () =>
    engaged + (document.visibilityState === "visible" ? performance.now() - last : 0);

  // no flipping while the title is scrolled out of view — a visitor who comes
  // back up after the wait still gets to see the final flip happen
  let inView = true;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  }).observe(flipEl);

  let idx = 0;
  const tick = async () => {
    if (!inView || document.visibilityState !== "visible") {
      setTimeout(tick, 500);
      return;
    }
    if (engagedMs() >= FINAL_AFTER_MS) {
      await flipTo(FINAL_TITLE);
      flipEl.classList.add("landed");
      return;
    }
    idx = (idx + 1) % FLIP_TITLES.length;
    await flipTo(FLIP_TITLES[idx]);
    setTimeout(tick, HOLD_MS);
  };

  nameIntro.then(() => setTimeout(tick, HOLD_MS));
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
