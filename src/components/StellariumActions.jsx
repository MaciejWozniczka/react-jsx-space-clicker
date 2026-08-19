import { Pickaxe, ShoppingCart, Zap } from "lucide-react";

function StellariumActions({
  autoClickerCost,
  canUpgradeAutoClicker,
  canUpgradeExtraction,
  onExtract,
  onUpgradeAutoClicker,
  onUpgradeExtraction,
  upgradeCost,
}) {
  return (
    <>
      <button className="stellarium-extractor__button" onClick={onExtract}>
        <Pickaxe size="1em" aria-hidden="true" />
        Wydobywaj
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={onUpgradeExtraction}
        disabled={!canUpgradeExtraction}
      >
        <Zap size="1em" aria-hidden="true" />
        Ulepsz wydobycie (koszt: {upgradeCost} Stellarium)
      </button>

      <button
        className="stellarium-extractor__button"
        onClick={onUpgradeAutoClicker}
        disabled={!canUpgradeAutoClicker}
      >
        <ShoppingCart size="1em" aria-hidden="true" />
        Kup auto-klikacz (koszt: {autoClickerCost} Stellarium)
      </button>
    </>
  );
}

export default StellariumActions;
