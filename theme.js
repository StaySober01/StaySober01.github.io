const themeToggle = document.querySelector(".theme-toggle");

function updateThemeToggle(theme) {
  const isLight = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "다크 모드로 전환" : "화이트 모드로 전환");
}

updateThemeToggle(document.documentElement.dataset.theme);

themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // The selected theme still applies for this page when storage is unavailable.
  }
  updateThemeToggle(theme);
});
