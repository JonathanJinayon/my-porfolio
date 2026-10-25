export const THEME_STORAGE_KEY = "portfolio-theme";

export type Theme = "light" | "dark";

export const themeInitScript = `(function(){try{var saved=localStorage.getItem("${THEME_STORAGE_KEY}");var theme=saved==="dark"?"dark":"light";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}})();`;
