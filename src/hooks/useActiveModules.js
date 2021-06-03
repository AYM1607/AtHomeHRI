import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { useLocalStorage } from "use-hooks";

import { ModuleIdentifier } from "../lib/enums";

const generateInitialState = () =>
  Object.values(ModuleIdentifier).reduce((acum, moduleId) => {
    // Initialize all modules to be inactive.
    acum[moduleId] = false;
    return acum;
  }, {});

let state = generateInitialState();

const activeModulesSubject = new BehaviorSubject(state);

function toggleModuleState(moduleIdentifier) {
  state[moduleIdentifier] = !state[moduleIdentifier];
  // We need to create a new object, otherwhise the subject
  // does not recognize it as a new value.
  const newState = { ...state };
  activeModulesSubject.next(newState);
}

function loadConfig(config) {
  let newState = {};
  if (config) {
    Object.values(ModuleIdentifier).forEach(moduleId => {
      newState[moduleId] = config.modules.includes(moduleId);
    });
  }

  state = newState;
  activeModulesSubject.next(newState);
}

export const useActiveModules = () => {
  // default to the current state to avoid having null periods.
  const [activeModulesState, setActiveModulesState] = useState(state);
  const [currentConfig, setCurrentConfig] = useLocalStorage('currentConfig', undefined);

  useEffect(() => {
    const subscription = activeModulesSubject.subscribe(setActiveModulesState);
    if (currentConfig)
      loadConfig(currentConfig);
    // Unsubscribe when component is unmounted.
    return () => {
      subscription.unsubscribe();
    };
  }, []);



  return {
    activeModulesState,
    toggleModuleState,
    currentConfig,
    loadConfig: (config) => { loadConfig(config); setCurrentConfig(config); } };
};
