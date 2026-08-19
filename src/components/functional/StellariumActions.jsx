import { Bot, Pickaxe, Zap } from "lucide-react";

function StellariumActions({
  autoClickers,
  canUpgradeExtraction,
  onExtract,
  onBuyAutoClicker,
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

      <section className="stellarium-extractor__shop" aria-labelledby="auto-clicker-shop-title">
        <div className="stellarium-extractor__shop-heading">
          <Bot size="1.2em" aria-hidden="true" />
          <div>
            <p>Manifest floty</p>
            <h2 id="auto-clicker-shop-title">Automatyczne wydobycie</h2>
          </div>
        </div>
        <ol className="stellarium-extractor__shop-list">
          {autoClickers
            .filter((autoClicker) => autoClicker.isUnlocked)
            .map((autoClicker) => (
              <li className="stellarium-extractor__shop-item" key={autoClicker.id}>
                <article>
                  <div className="stellarium-extractor__shop-machine">
                    <span className="stellarium-extractor__shop-type">Jednostka</span>
                    <h3>{autoClicker.name}</h3>
                  </div>
                  <p className="stellarium-extractor__shop-production">
                    <strong>+{autoClicker.production}</strong>/sek
                  </p>
                  <p className="stellarium-extractor__shop-owned">
                    W służbie: <strong>{autoClicker.owned}</strong>
                  </p>
                </article>
                <button
                  className="stellarium-extractor__shop-button"
                  onClick={() => onBuyAutoClicker(autoClicker.id)}
                  disabled={!autoClicker.canBuy}
                >
                  Kup za {autoClicker.cost} Stellarium
                </button>
              </li>
            ))}
        </ol>
      </section>
    </>
  );
}

export default StellariumActions;
