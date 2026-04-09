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

/* ===== Reveal on scroll with stagger groups ===== */
const revealGroups = [
  document.querySelectorAll(".hero-left, .hero-card"),
  document.querySelectorAll("#about .about-card"),
  document.querySelectorAll("#services .info-card"),
  document.querySelectorAll("#projects .project-card"),
  document.querySelectorAll(".approach-item"),
  document.querySelectorAll(".skills-box"),
  document.querySelectorAll(".contact-box, .contact-links a")
];

revealGroups.forEach((group) => {
  group.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });
});

document.querySelectorAll(".section-head").forEach((el) => {
  el.classList.add("reveal");
  el.style.setProperty("--reveal-delay", `0ms`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ===== Liquid nav indicator ===== */
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

/* ===== Scroll progress ===== */
(() => {
  const progress = document.getElementById("scrollProgress");
  if (!progress) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${value}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();

/* ===== Magnetic buttons ===== */
(() => {
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const magneticTargets = document.querySelectorAll(".btn, .nav-btn");

  magneticTargets.forEach((el) => {
    el.classList.add("magnetic");

    el.addEventListener("mousemove", (e) => {
      if (!canHover()) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();

/* ===== Spotlight hover ===== */
(() => {
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const spotlightCards = document.querySelectorAll(
    ".about-card, .info-card, .project-card, .approach-item, .profile-card, .contact-box"
  );

  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (!canHover()) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
  });
})();

/* ===== Active nav by scroll ===== */
(() => {
  const nav = document.getElementById("navLinks");
  if (!nav) return;

  const links = [...nav.querySelectorAll("a")];
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) return null;
      const section = document.querySelector(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const updateActive = () => {
    const offset = window.scrollY + 160;
    let current = sections[0];

    sections.forEach((item) => {
      if (item.section.offsetTop <= offset) current = item;
    });

    links.forEach((link) => link.classList.remove("is-active"));
    if (current) current.link.classList.add("is-active");
  };

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
})();

/* ===== Hero card parallax ===== */
(() => {
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const heroCardWrap = document.querySelector(".hero-card");
  const profileCard = document.querySelector(".profile-card");
  if (!heroCardWrap || !profileCard) return;

  heroCardWrap.addEventListener("mousemove", (e) => {
    if (!canHover()) return;

    const rect = heroCardWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    profileCard.style.transform =
      `perspective(900px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
  });

  heroCardWrap.addEventListener("mouseleave", () => {
    profileCard.style.transform = "";
  });
})();

/* ===== Project cards subtle tilt ===== */
(() => {
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (!canHover()) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
