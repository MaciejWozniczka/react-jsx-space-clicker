import { useEffect, useReducer } from "react";

const AUTO_CLICKER_CATALOG = [
  { id: "collector-probe", name: "Sonda Zbieracza", production: 1, baseCost: 10, unlockCost: 0 },
  { id: "mining-drone", name: "Dron Górniczy", production: 5, baseCost: 75, unlockCost: 50 },
  { id: "orbital-extractor", name: "Orbitalny Ekstraktor", production: 25, baseCost: 550, unlockCost: 350 },
  { id: "drilling-robot", name: "Robot Wiertniczy", production: 125, baseCost: 4000, unlockCost: 2500 },
  { id: "lunar-mine", name: "Księżycowa Kopalnia", production: 625, baseCost: 29000, unlockCost: 18000 },
  { id: "processing-station", name: "Stacja Przetwórcza", production: 3125, baseCost: 210000, unlockCost: 130000 },
  { id: "mining-fleet", name: "Flota Wydobywcza", production: 15625, baseCost: 1500000, unlockCost: 950000 },
  { id: "mining-ring", name: "Pierścień Górniczy", production: 78125, baseCost: 11000000, unlockCost: 7000000 },
  { id: "asteroid-combine", name: "Asteroidowy Kombinat", production: 390625, baseCost: 80000000, unlockCost: 50000000 },
  { id: "stellar-synthesizer", name: "Syntezer Gwiezdny", production: 1953125, baseCost: 580000000, unlockCost: 360000000 },
  { id: "nebula-reaper", name: "Żniwiarz Mgławic", production: 9765625, baseCost: 4200000000, unlockCost: 2600000000 },
  { id: "quasar-collector", name: "Kolektor Kwazara", production: 48828125, baseCost: 30000000000, unlockCost: 19000000000 },
];

const getAutoClickerCost = (baseCost, owned) =>
  Math.ceil(baseCost * 1.15 ** owned);

const initialGameState = {
  stellarium: 0,
  highestStellarium: 0,
  extractionPower: 1,
  autoClickerCounts: {},
};

function gameReducer(state, action) {
  if (action.type === "extract" || action.type === "auto-produce") {
    const amount =
      action.type === "extract" ? state.extractionPower : action.amount;

    if (amount === 0) {
      return state;
    }

    const stellarium = state.stellarium + amount;

    return {
      ...state,
      stellarium,
      highestStellarium: Math.max(state.highestStellarium, stellarium),
    };
  }

  if (action.type === "upgrade-extraction") {
    const cost = state.extractionPower ** 2;

    if (state.stellarium < cost) {
      return state;
    }

    return {
      ...state,
      stellarium: state.stellarium - cost,
      extractionPower: state.extractionPower + 1,
    };
  }

  if (action.type === "buy-auto-clicker") {
    const autoClicker = AUTO_CLICKER_CATALOG.find(
      (item) => item.id === action.id,
    );

    if (!autoClicker || state.highestStellarium < autoClicker.unlockCost) {
      return state;
    }

    const owned = state.autoClickerCounts[autoClicker.id] ?? 0;
    const cost = getAutoClickerCost(autoClicker.baseCost, owned);

    if (state.stellarium < cost) {
      return state;
    }

    return {
      ...state,
      stellarium: state.stellarium - cost,
      autoClickerCounts: {
        ...state.autoClickerCounts,
        [autoClicker.id]: owned + 1,
      },
    };
  }

  return state;
}

export function useStellariumGame() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const { autoClickerCounts, extractionPower, highestStellarium, stellarium } =
    gameState;

  const upgradeCost = extractionPower * extractionPower;
  const autoClickers = AUTO_CLICKER_CATALOG.map((autoClicker) => {
    const owned = autoClickerCounts[autoClicker.id] ?? 0;
    const cost = getAutoClickerCost(autoClicker.baseCost, owned);

    return {
      ...autoClicker,
      owned,
      cost,
      isUnlocked: highestStellarium >= autoClicker.unlockCost,
      canBuy: stellarium >= cost,
    };
  });
  const autoProduction = autoClickers.reduce(
    (total, autoClicker) => total + autoClicker.owned * autoClicker.production,
    0,
  );

  useEffect(() => {
    const autoClickerInterval = setInterval(() => {
      dispatch({ type: "auto-produce", amount: autoProduction });
    }, 1000);

    return () => clearInterval(autoClickerInterval);
  }, [autoProduction]);

  const extractStellarium = () => {
    dispatch({ type: "extract" });
  };

  const upgradeExtraction = () => {
    dispatch({ type: "upgrade-extraction" });
  };

  const buyAutoClicker = (id) => {
    dispatch({ type: "buy-auto-clicker", id });
  };

  return {
    autoClickers,
    autoProduction,
    buyAutoClicker,
    extractStellarium,
    extractionPower,
    stellarium,
    upgradeCost,
    upgradeExtraction,
  };
}
