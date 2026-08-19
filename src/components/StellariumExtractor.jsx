import { useState } from "react";
import "./StellariumExtractor.css";

function StellariumExtractor({ extractionYield = 1 }) {
  const [stellarium, setStellarium] = useState(0);
  const [extractPower, setExtractPower] = useState(1);
  const upgradeCost = extractPower * extractPower;
  const canUpgradeExtraction = stellarium >= upgradeCost;

  const extractStellarium = () => {
    setStellarium(
      (currentStellarium) => currentStellarium + extractionYield * extractPower,
    );
  };

  const upgradeExtraction = () => {
    if (!canUpgradeExtraction) {
      return;
    }

    setExtractPower((currentExtractPower) => currentExtractPower + 1);
    setStellarium(
      (currentStellarium) => currentStellarium - upgradeCost,
    );
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
        {extractPower}
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
        disabled={!canUpgradeExtraction}
      >
        Ulepsz wydobycie (koszt: {upgradeCost} Stellarium)
      </button>
    </main>
  );
}

export default StellariumExtractor;
