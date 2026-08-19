import { useState, useEffect } from "react";
import "./StellariumExtractor.css";

function StellariumExtractor() {
  const [stellarium, setStellarium] = useState(0);
  const [extractionPower, setExtractionPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const autoClickerCost = 10 + autoClickers * autoClickers * 10;
  const upgradeCost = extractionPower * extractionPower;

  useEffect(() => {
    const autoClickerInterval = setInterval(() => {
      setStellarium((currentStellarium) => currentStellarium + autoClickers);
    }, 1000);

    return () => {
      clearInterval(autoClickerInterval);
    };
  }, [autoClickers]);

  const extractStellarium = () => {
    setStellarium((currentStellarium) => currentStellarium + extractionPower);
  };

  const upgradeExtraction = () => {
    if (stellarium < upgradeCost) {
      return;
    }

    setStellarium((currentStellarium) => currentStellarium - upgradeCost);
    setExtractionPower((currentExtractionPower) => currentExtractionPower + 1);
  };

  const upgradeAutoClicker = () => {
    if (stellarium < autoClickerCost) {
      return;
    }

    setStellarium((currentStellarium) => currentStellarium - autoClickerCost);
    setAutoClickers((currentAutoClickers) => currentAutoClickers + 1);
  };

  return (
    <main className="stellarium-extractor">
      <p className="stellarium-extractor__eyebrow">React Space Clicker</p>
      <h1>Witaj, kapitanie!</h1>
      <p className="stellarium-extractor__label">Wydobyte Stellarium</p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {stellarium}
      </output>

      <p className="stellarium-extractor__label">Moc wydobycia</p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {extractionPower}/klik
      </output>

      <p className="stellarium-extractor__label">Automatyczne wydobycie</p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {autoClickers}/sek
      </output>

      <button
        className="stellarium-extractor__button"
        onClick={extractStellarium}
      >
        Wydobywaj
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeExtraction}
        disabled={stellarium < upgradeCost}
      >
        Ulepsz wydobycie (koszt: {upgradeCost} Stellarium)
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeAutoClicker}
        disabled={stellarium < autoClickerCost}
      >
        Kup auto-klikacz (koszt: {autoClickerCost} Stellarium)
      </button>
    </main>
  );
}

export default StellariumExtractor;
