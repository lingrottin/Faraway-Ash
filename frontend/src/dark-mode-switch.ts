const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
// Infer dark mode preference and enable
function setDarkMode() {
  let dark_mode = false;
  let dm_setting = localStorage.getItem("dark_mode");
  switch (dm_setting) {
    case "dark":
      dark_mode = true;
      break;
    case "light":
      dark_mode = false;
      break;
    default:
      dark_mode = darkModeQuery.matches;
  }
  if (dark_mode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

darkModeQuery.addEventListener("change", setDarkMode);
addEventListener("storage", (event) => {
  if (event.key === "dark_mode") {
    setDarkMode();
  }
});

const themes = ["system", "dark", "light"] as const;
const theme_toggle = document.getElementById(
  "theme-toggle",
) as HTMLButtonElement;

document.addEventListener("theme-change", () => {
  let current_theme = localStorage.getItem("dark_mode") as
    | (typeof themes)[number]
    | null;
  if (current_theme === null) {
    current_theme = "system";
  }
  const current_idx = themes.indexOf(current_theme);
  const next_idx = (current_idx + 1) % themes.length;
  const next_theme = themes[next_idx];
  localStorage.setItem("dark_mode", next_theme);
  theme_toggle.setAttribute("data-selected", next_theme);

  setDarkMode();
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize: set the data-selected attribute on the theme toggle button
  let current_theme = localStorage.getItem("dark_mode") as
    | (typeof themes)[number]
    | null;
  if (current_theme === null) {
    current_theme = "system";
  }
  theme_toggle.setAttribute("data-selected", current_theme);
});
setDarkMode();
