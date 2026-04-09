const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

/* ===== Reveal on scroll ===== */
const revealTargets = document.querySelectorAll(`
  .section-head,
  .about-card,
  .info-card,
  .project-card,
  .approach-item,
  .contact-box,
  .hero-left,
  .hero-card,
  .skills-box,
  .contact-links a
`);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ===== Liquid nav indicator ===== */
(() => {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const indicator = nav.querySelector(".nav-indicator");
  const links = [...nav.querySelectorAll("a")];
  if (!indicator || !links.length) return;

  const isDesktop = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const moveIndicator = (el) => {
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    indicator.style.width = `${rect.width + 14}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left - 7}px)`;
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!isDesktop()) return;
      moveIndicator(link);
      indicator.style.opacity = "1";
    });
  });

  nav.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
    indicator.style.width = "0px";
  });
})();
