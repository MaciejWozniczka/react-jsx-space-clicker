import { useState, useEffect } from "react";
import "./StellariumExtractor.css";
import {
  Bot,
  Gauge,
  Gem,
  Orbit,
  Pickaxe,
  Rocket,
  ShoppingCart,
  Zap,
} from "lucide-react";

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
      <p className="stellarium-extractor__eyebrow">
        <Orbit size={16} aria-hidden="true" />
        React Space Clicker
      </p>
      <h1>
        <Rocket size={32} aria-hidden="true" />
        Witaj, kapitanie!
      </h1>
      <p className="stellarium-extractor__label">
        <Gem size={15} aria-hidden="true" />
        Wydobyte Stellarium
      </p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {stellarium}
      </output>

      <p className="stellarium-extractor__label">
        <Gauge size={15} aria-hidden="true" />
        Moc wydobycia
      </p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {extractionPower}/klik
      </output>

      <p className="stellarium-extractor__label">
        <Bot size={15} aria-hidden="true" />
        Automatyczne wydobycie
      </p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {autoClickers}/sek
      </output>

      <button
        className="stellarium-extractor__button"
        onClick={extractStellarium}
      >
        <Pickaxe size={20} aria-hidden="true" />
        Wydobywaj
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeExtraction}
        disabled={stellarium < upgradeCost}
      >
        <Zap size={20} aria-hidden="true" />
        Ulepsz wydobycie (koszt: {upgradeCost} Stellarium)
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeAutoClicker}
        disabled={stellarium < autoClickerCost}
      >
        <ShoppingCart size={20} aria-hidden="true" />
        Kup auto-klikacz (koszt: {autoClickerCost} Stellarium)
      </button>
    </main>
  );
}

export default StellariumExtractor;
