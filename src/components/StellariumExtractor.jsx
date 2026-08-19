import "./StellariumExtractor.css";
import { Bot, Gauge, Gem } from "lucide-react";
import { useStellariumGame } from "../hooks/useStellariumGame";
import StellariumActions from "./functional/StellariumActions";
import StellariumHeader from "./StellariumHeader";
import StellariumMetric from "./StellariumMetric";
import StarField from "./StarField";

function StellariumExtractor({ isDark }) {
  const {
    autoClickers,
    autoProduction,
    buyAutoClicker,
    extractStellarium,
    extractionPower,
    stellarium,
    upgradeCost,
    upgradeExtraction,
  } = useStellariumGame();

  return (
    <main className="stellarium-extractor">
      <StarField visible={isDark} />
      <header className="stellarium-extractor__status-panel">
        <div className="stellarium-extractor__identity">
          <StellariumHeader />
        </div>
        <div className="stellarium-extractor__metrics" aria-label="Stan wydobycia">
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
            value={`${autoProduction}/sek`}
            shouldAnimate={autoProduction > 0}
          />
        </div>
      </header>
      <section className="stellarium-extractor__content" aria-label="Sterowanie wydobyciem">
        <StellariumActions
          autoClickers={autoClickers}
          canUpgradeExtraction={stellarium >= upgradeCost}
          onExtract={extractStellarium}
          onBuyAutoClicker={buyAutoClicker}
          onUpgradeExtraction={upgradeExtraction}
          upgradeCost={upgradeCost}
        />
      </section>
    </main>
  );
}

export default StellariumExtractor;
