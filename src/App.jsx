import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import { Moon, Sun } from "lucide-react";
import StellariumExtractor from "./components/StellariumExtractor";

function App() {
  const [theme, setTheme] = useLocalStorageState("space-clicker-theme", {
    defaultValue: "dark",
  });

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
          <Sun size="1.6rem" aria-hidden="true" />
        ) : (
          <Moon size="1.6rem" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default App;
