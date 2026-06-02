const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = () => {
  let activeId = sections[0]?.id;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
};

document.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

const pcSearch = document.querySelector("#pc-search");
const committeeItems = Array.from(document.querySelectorAll("#committee-list .committee-member"));

if (pcSearch) {
  pcSearch.addEventListener("input", () => {
    const query = pcSearch.value.trim().toLowerCase();
    committeeItems.forEach((item) => {
      item.classList.toggle("is-hidden", query && !item.textContent.toLowerCase().includes(query));
    });
  });
}
