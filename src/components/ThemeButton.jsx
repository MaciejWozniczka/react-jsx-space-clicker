import { Moon, Sun } from "lucide-react";

function ThemeButton({ theme, onThemeChange }) {
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() =>
        onThemeChange((currentTheme) =>
          currentTheme === "dark" ? "light" : "dark",
        )
      }
      aria-label={isDark ? "Włącz dzienne niebo" : "Włącz gwiezdne niebo"}
      aria-pressed={!isDark}
    >
      {isDark ? (
        <Sun size="1.6rem" aria-hidden="true" />
      ) : (
        <Moon size="1.6rem" aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeButton;
