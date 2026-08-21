import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import StellariumExtractor from "./components/StellariumExtractor";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [theme, setTheme] = useLocalStorageState("space-clicker-theme", {
    defaultValue: "dark",
  });

  return (
    <div className={`app app--${theme}`}>
      <StellariumExtractor isDark={theme === "dark"} />
      <ThemeButton theme={theme} onThemeChange={setTheme} />
    </div>
  );
}

export default App;
