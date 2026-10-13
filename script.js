(() => {
  const root = document.documentElement;
  const languageButton = document.getElementById("languageToggle");
  const themeButton = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const menuButton = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  const setLanguage = (language) => {
    root.lang = language;
    document.querySelectorAll("[data-en][data-hi]").forEach((element) => {
      const value = element.dataset[language];
      if (value !== undefined) element.textContent = value;
    });
    if (languageButton) languageButton.textContent = language === "en" ? "हिंदी" : "English";
    try { localStorage.setItem("lm-language", language); } catch (_) {}
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === "light" ? "☾" : "☼";
    if (themeButton) themeButton.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    try { localStorage.setItem("lm-theme", theme); } catch (_) {}
  };

  let language = "en";
  let theme = "dark";
  try {
    language = localStorage.getItem("lm-language") || "en";
    theme = localStorage.getItem("lm-theme") || "dark";
  } catch (_) {}
  setLanguage(language);
  setTheme(theme);

  languageButton?.addEventListener("click", () => setLanguage(root.lang === "en" ? "hi" : "en"));
  themeButton?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("nav-open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})(); 
