import "./App.css";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import StellariumExtractor from "./components/StellariumExtractor";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={`app app--${theme}`}>
      <StellariumExtractor isDark={theme === "dark"} />
      <button
        className="theme-toggle"
        type="button"
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
          )
        }
        aria-label={
          theme === "dark" ? "Włącz dzienne niebo" : "Włącz gwiezdne niebo"
        }
        aria-pressed={theme === "light"}
      >
        {theme === "dark" ? (
          <Sun size="1.25rem" aria-hidden="true" />
        ) : (
          <Moon size="1.25rem" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default App;
