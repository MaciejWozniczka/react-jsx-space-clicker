import "./StellariumExtractor.css";
import { Bot, Gauge, Gem } from "lucide-react";
import { useStellariumGame } from "../hooks/useStellariumGame";
import StellariumActions from "./StellariumActions";
import StellariumHeader from "./StellariumHeader";
import StellariumMetric from "./StellariumMetric";

function StellariumExtractor() {
  const {
    autoClickerCost,
    autoClickers,
    extractStellarium,
    extractionPower,
    stellarium,
    upgradeAutoClicker,
    upgradeCost,
    upgradeExtraction,
  } = useStellariumGame();

  return (
    <main className="stellarium-extractor">
      <StellariumHeader />
      <StellariumMetric
        icon={Gem}
        label="Wydobyte Stellarium"
        value={stellarium}
        shouldAnimate={stellarium > 0}
      />
      <StellariumMetric
        icon={Gauge}
        label="Moc wydobycia"
        value={`${extractionPower}/klik`}
        shouldAnimate={extractionPower > 1}
      />
      <StellariumMetric
        icon={Bot}
        label="Automatyczne wydobycie"
        value={`${autoClickers}/sek`}
        shouldAnimate={autoClickers > 0}
      />
      <StellariumActions
        autoClickerCost={autoClickerCost}
        canUpgradeAutoClicker={stellarium >= autoClickerCost}
        canUpgradeExtraction={stellarium >= upgradeCost}
        onExtract={extractStellarium}
        onUpgradeAutoClicker={upgradeAutoClicker}
        onUpgradeExtraction={upgradeExtraction}
        upgradeCost={upgradeCost}
      />
    </main>
  );
}

export default StellariumExtractor;
