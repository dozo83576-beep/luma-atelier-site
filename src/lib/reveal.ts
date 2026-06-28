// IntersectionObserver-driven reveal + Lenis smooth scroll.
// Анимируем только opacity/transform. Уважаем prefers-reduced-motion.
import Lenis from "lenis";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Reveal on scroll -------------------------------------------------------
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  els.forEach((el) => io.observe(el));
}

// --- Smooth scroll ----------------------------------------------------------
function initLenis() {
  if (prefersReduced) return;
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Anchor links → lenis scroll
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -8 });
      }
    });
  });
}

// --- Sticky nav state -------------------------------------------------------
function initNav() {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 40) nav.setAttribute("data-scrolled", "true");
    else nav.removeAttribute("data-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function init() {
  initReveal();
  initLenis();
  initNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
