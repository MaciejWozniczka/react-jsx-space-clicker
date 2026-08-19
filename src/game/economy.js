export const FLEET_CLICK_BONUS_RATE = 0.02;
export const FLEET_PRODUCTION_GROWTH = 3;
export const FLEET_COST_MULTIPLIER = 60;
export const FLEET_COST_GROWTH = 1.16;
export const FLEET_UNLOCK_COST_RATE = 0.6;
export const EXTRACTION_UPGRADE_BASE_COST = 40;
export const EXTRACTION_UPGRADE_COST_GROWTH = 1.24;

const FLEET_TYPES = [
  ["collector-probe", "Sonda Zbieracza"],
  ["mining-drone", "Dron Górniczy"],
  ["orbital-extractor", "Orbitalny Ekstraktor"],
  ["drilling-robot", "Robot Wiertniczy"],
  ["lunar-mine", "Księżycowa Kopalnia"],
  ["processing-station", "Stacja Przetwórcza"],
  ["mining-fleet", "Flota Wydobywcza"],
  ["mining-ring", "Pierścień Górniczy"],
  ["asteroid-combine", "Asteroidowy Kombinat"],
  ["stellar-synthesizer", "Syntezer Gwiezdny"],
  ["nebula-reaper", "Żniwiarz Mgławic"],
  ["quasar-collector", "Kolektor Kwazara"],
];

export const AUTO_CLICKER_CATALOG = FLEET_TYPES.map(([id, name], index) => {
  const production = FLEET_PRODUCTION_GROWTH ** index;
  const baseCost = production * FLEET_COST_MULTIPLIER;
  const artworkColumn = index % 3;
  const artworkRow = Math.floor(index / 3);

  return {
    id,
    name,
    artworkPosition: `${artworkColumn * 50}% ${artworkRow * (100 / 3)}%`,
    production,
    manualClickBonus: Math.floor(production * FLEET_CLICK_BONUS_RATE),
    baseCost,
    unlockCost: index === 0 ? 0 : Math.ceil(baseCost * FLEET_UNLOCK_COST_RATE),
  };
});

export function getAutoClickerCost(baseCost, owned) {
  return Math.ceil(baseCost * FLEET_COST_GROWTH ** owned);
}

export function getAutoProduction(autoClickerCounts) {
  return AUTO_CLICKER_CATALOG.reduce(
    (total, autoClicker) =>
      total + (autoClickerCounts[autoClicker.id] ?? 0) * autoClicker.production,
    0,
  );
}

export function getBaseExtractionPower(extractionLevel) {
  return extractionLevel + 1;
}

export function getFleetClickBonus(autoClickerCounts) {
  return AUTO_CLICKER_CATALOG.reduce(
    (total, autoClicker) =>
      total +
      (autoClickerCounts[autoClicker.id] ?? 0) * autoClicker.manualClickBonus,
    0,
  );
}

export function getClickYield(extractionLevel, autoClickerCounts) {
  return getBaseExtractionPower(extractionLevel) + getFleetClickBonus(autoClickerCounts);
}

export function getExtractionUpgrade(extractionLevel) {
  return {
    cost: Math.ceil(
      EXTRACTION_UPGRADE_BASE_COST *
        EXTRACTION_UPGRADE_COST_GROWTH ** extractionLevel,
    ),
    nextBasePowerGain: 1,
  };
}
