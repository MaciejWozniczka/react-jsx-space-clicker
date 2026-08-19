import { useState } from "react";
import "./StellariumExtractor.css";

function StellariumExtractor({ extractionYield = 1 }) {
  const [stellarium, setStellarium] = useState(0);

  const extractStellarium = () => {
    setStellarium((currentStellarium) => currentStellarium + extractionYield);
  };

  return (
    <main className="stellarium-extractor">
      <p className="stellarium-extractor__eyebrow">React Space Clicker</p>
      <h1>Witaj, kapitanie!</h1>
      <p className="stellarium-extractor__label">Wydobyte Stellarium</p>
      <output className="stellarium-extractor__value" aria-live="polite">
        {stellarium}
      </output>
      <p className="stellarium-extractor__label">jednostek</p>
      <button className="stellarium-extractor__button" onClick={extractStellarium}>
        Wydobywaj
      </button>
    </main>
  );
}

export default StellariumExtractor;
