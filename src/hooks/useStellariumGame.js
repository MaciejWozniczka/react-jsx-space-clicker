import { useEffect, useState } from "react";

export function useStellariumGame() {
  const [stellarium, setStellarium] = useState(0);
  const [extractionPower, setExtractionPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  const autoClickerCost = 10 + autoClickers * autoClickers * 10;
  const upgradeCost = extractionPower * extractionPower;

  useEffect(() => {
    const autoClickerInterval = setInterval(() => {
      setStellarium((currentStellarium) => currentStellarium + autoClickers);
    }, 1000);

    return () => clearInterval(autoClickerInterval);
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

  return {
    autoClickerCost,
    autoClickers,
    extractStellarium,
    extractionPower,
    stellarium,
    upgradeAutoClicker,
    upgradeCost,
    upgradeExtraction,
  };
}
