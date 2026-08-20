import { useCallback, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  AUTO_CLICKER_CATALOG,
  getAutoClickerCost,
  getAutoProduction,
  getClickYield,
  getExtractionUpgrade,
  getFleetClickBonus,
} from "../game/economy.js";

export const initialGameState = {
  stellarium: 0,
  highestStellarium: 0,
  extractionLevel: 0,
  autoClickerCounts: {},
};

function getInitialGameState() {
  return {
    ...initialGameState,
    autoClickerCounts: {},
  };
}

export function gameReducer(state, action) {
  if (action.type === "extract" || action.type === "auto-produce") {
    const amount =
      action.type === "extract"
        ? getClickYield(
            state.extractionLevel,
            state.autoClickerCounts,
          )
        : action.amount;

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
    const { cost } = getExtractionUpgrade(state.extractionLevel);

    if (state.stellarium < cost) {
      return state;
    }

    return {
      ...state,
      stellarium: state.stellarium - cost,
      extractionLevel: state.extractionLevel + 1,
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
  const [gameState, setGameState] = useLocalStorageState(
    "space-clicker-game-state",
    { defaultValue: getInitialGameState() },
  );
  const dispatch = useCallback(
    (action) => {
      setGameState((currentState) => gameReducer(currentState, action));
    },
    [setGameState],
  );
  const { autoClickerCounts, extractionLevel, highestStellarium, stellarium } =
    gameState;
  const autoProduction = getAutoProduction(autoClickerCounts);
  const clickYield = getClickYield(extractionLevel, autoClickerCounts);
  const fleetClickBonus = getFleetClickBonus(autoClickerCounts);
  const extractionUpgrade = getExtractionUpgrade(extractionLevel);
  const upgradeCost = extractionUpgrade.cost;
  const autoClickers = AUTO_CLICKER_CATALOG.map((autoClicker) => {
    const owned = autoClickerCounts[autoClicker.id] ?? 0;
    const cost = getAutoClickerCost(autoClicker.baseCost, owned);

    return {
      ...autoClicker,
      owned,
      cost,
      currentManualClickBonus: owned * autoClicker.manualClickBonus,
      currentProduction: owned * autoClicker.production,
      isUnlocked: highestStellarium >= autoClicker.unlockCost,
      canBuy: stellarium >= cost,
    };
  });

  useEffect(() => {
    const autoClickerInterval = setInterval(() => {
      if (!document.hasFocus()) {
        return;
      }

      dispatch({ type: "auto-produce", amount: autoProduction });
    }, 1000);

    return () => clearInterval(autoClickerInterval);
  }, [autoProduction, dispatch]);

  return {
    autoClickers,
    autoProduction,
    buyAutoClicker: (id) => dispatch({ type: "buy-auto-clicker", id }),
    clickYield,
    extractStellarium: () => dispatch({ type: "extract" }),
    extractionUpgrade,
    fleetClickBonus,
    resetProgress: () => setGameState(getInitialGameState()),
    stellarium,
    upgradeCost,
    upgradeExtraction: () => dispatch({ type: "upgrade-extraction" }),
  };
}
