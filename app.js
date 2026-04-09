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

/* Reveal on scroll */
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

/* Liquid nav indicator */
(() => {
  const nav = document.getElementById("navLinks");
  const indicator = document.getElementById("navIndicator");
  if (!nav || !indicator) return;

  const links = [...nav.querySelectorAll("a")];

  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const moveIndicator = (el) => {
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
    indicator.style.opacity = "1";
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!canHover()) return;
      moveIndicator(link);
    });
  });

  nav.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
    indicator.style.width = "0px";
  });
})();
