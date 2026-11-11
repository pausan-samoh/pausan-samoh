const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const year = document.querySelector("[data-current-year]");
const intro = document.querySelector("[data-intro]");
const introImage = document.querySelector("[data-intro-image]");
const introSkip = document.querySelector("[data-intro-skip]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) year.textContent = new Date().getFullYear();

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

let introStopped = false;
let introFinished = false;

const finishIntro = () => {
  if (introFinished) return;
  introStopped = true;
  introFinished = true;
  window.removeEventListener("resize", setIntroMetrics);
  intro?.classList.add("complete");
  body.classList.remove("intro-running");
  window.setTimeout(() => intro?.remove(), 520);
};

const setIntroMetrics = () => {
  if (!intro) return;
  intro.style.setProperty("--intro-exit-x", `${32 - window.innerWidth / 2}px`);
};

introSkip?.addEventListener("click", () => {
  if (introStopped) return;
  introStopped = true;
  intro?.classList.add("closing");
  window.setTimeout(finishIntro, 850);
});

const playIntro = async () => {
  if (!intro || !introImage) {
    intro?.remove();
    return;
  }

  body.classList.add("intro-running");
  setIntroMetrics();
  window.addEventListener("resize", setIntroMetrics, { passive: true });
  const pageReady =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

  try {
    await Promise.race([
      Promise.all([pageReady, document.fonts?.ready, introImage.decode()]),
      wait(2500),
    ]);
  } catch {
    await wait(200);
  }

  intro.classList.add("ready");
  await wait(700);
  if (introStopped) return;
  intro.classList.add("circle");
  await wait(900);
  if (introStopped) return;
  intro.classList.add("shrink");
  await wait(900);
  if (introStopped) return;
  setIntroMetrics();
  intro.classList.add("exit");
  await wait(1400);
  if (introStopped) return;
  intro.classList.add("closing");
  await wait(850);
  finishIntro();
};

playIntro();

const setMenu = (isOpen) => {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
  mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
  mobileMenu?.classList.toggle("open", isOpen);
  body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${current.target.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-28% 0px -58%", threshold: [0.08, 0.25, 0.5] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

const tagline = document.querySelector("[data-tagline]");
const reducedMotion = prefersReducedMotion;

if (tagline) {
  const words = tagline.textContent.trim().split(/\s+/);
  tagline.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "tagline-word";
    span.textContent = word;
    tagline.append(span);
    if (index < words.length - 1) tagline.append(" ");
  });

  const wordElements = tagline.querySelectorAll(".tagline-word");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    wordElements.forEach((word) => word.classList.add("active"));
  } else {
    const wordObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -32%", threshold: 0.9 }
    );
    wordElements.forEach((word) => wordObserver.observe(word));
  }
}
