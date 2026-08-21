import { useState, useEffect } from "react";

const PWA_INSTALLED_STORAGE_KEY = "space-clicker-pwa-installed";

function isRunningAsInstalledApp() {
  return (
    window.navigator.standalone === true ||
    ["standalone", "fullscreen", "minimal-ui"].some((displayMode) =>
      window.matchMedia(`(display-mode: ${displayMode})`).matches,
    )
  );
}

function PWAInstallButton() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isMarkedAsInstalled =
      window.localStorage.getItem(PWA_INSTALLED_STORAGE_KEY) === "true";

    if (isRunningAsInstalledApp() || isMarkedAsInstalled) {
      return undefined;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.localStorage.removeItem(PWA_INSTALLED_STORAGE_KEY);
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      window.localStorage.setItem(PWA_INSTALLED_STORAGE_KEY, "true");
      setDeferredPrompt(null);
      setShowInstallButton(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const userChoice = await deferredPrompt.prompt();

      if (userChoice.outcome === "accepted") {
        window.localStorage.setItem(PWA_INSTALLED_STORAGE_KEY, "true");
        setDeferredPrompt(null);
        setShowInstallButton(false);
      }
    }
  };

  return (
    showInstallButton && (
      <button
        className="stellarium-extractor__button"
        type="button"
        onClick={handleInstallClick}
      >
        Zainstaluj na urządzeniu
      </button>
    )
  );
}

export default PWAInstallButton;
