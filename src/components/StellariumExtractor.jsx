import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
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

const valuePulse = {
  y: [-10, 0],
  scale: [1, 1.07, 1],
  opacity: [0.72, 1],
  transition: { duration: 0.24, ease: "easeOut" },
};

function StellariumExtractor() {
  const [stellarium, setStellarium] = useState(0);
  const [extractionPower, setExtractionPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const stellariumControls = useAnimationControls();
  const extractionPowerControls = useAnimationControls();
  const autoClickerControls = useAnimationControls();
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

  useEffect(() => {
    if (stellarium > 0) {
      stellariumControls.start(valuePulse);
    }
  }, [stellarium, stellariumControls]);

  useEffect(() => {
    if (extractionPower > 1) {
      extractionPowerControls.start(valuePulse);
    }
  }, [extractionPower, extractionPowerControls]);

  useEffect(() => {
    if (autoClickers > 0) {
      autoClickerControls.start(valuePulse);
    }
  }, [autoClickers, autoClickerControls]);

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
        <Orbit size="1em" aria-hidden="true" />
        React Space Clicker
      </p>
      <h1>
        <Rocket size="0.75em" aria-hidden="true" />
        Witaj, kapitanie!
      </h1>
      <p className="stellarium-extractor__label">
        <Gem size="1em" aria-hidden="true" />
        Wydobyte Stellarium
      </p>
      <motion.output
        animate={stellariumControls}
        className="stellarium-extractor__value"
        aria-live="polite"
      >
        {stellarium}
      </motion.output>

      <p className="stellarium-extractor__label">
        <Gauge size="1em" aria-hidden="true" />
        Moc wydobycia
      </p>
      <motion.output
        animate={extractionPowerControls}
        className="stellarium-extractor__value"
        aria-live="polite"
      >
        {extractionPower}/klik
      </motion.output>

      <p className="stellarium-extractor__label">
        <Bot size="1em" aria-hidden="true" />
        Automatyczne wydobycie
      </p>
      <motion.output
        animate={autoClickerControls}
        className="stellarium-extractor__value"
        aria-live="polite"
      >
        {autoClickers}/sek
      </motion.output>

      <button
        className="stellarium-extractor__button"
        onClick={extractStellarium}
      >
        <Pickaxe size="1em" aria-hidden="true" />
        Wydobywaj
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeExtraction}
        disabled={stellarium < upgradeCost}
      >
        <Zap size="1em" aria-hidden="true" />
        Ulepsz wydobycie (koszt: {upgradeCost} Stellarium)
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={upgradeAutoClicker}
        disabled={stellarium < autoClickerCost}
      >
        <ShoppingCart size="1em" aria-hidden="true" />
        Kup auto-klikacz (koszt: {autoClickerCost} Stellarium)
      </button>
    </main>
  );
}

export default StellariumExtractor;
