import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

import { ModuleIdentifier } from "../lib/enums";

const generateInitialState = () => {
  let initialState = {};

  // Initialize all modules to be inactive.
  Object.keys(ModuleIdentifier).map((key) => {
    // We don't want to use the keys but the values since that's
    // what will be passed by the calling modules.
    const moduleIdentifier = ModuleIdentifier[key];
    initialState[moduleIdentifier] = false;
  });
  return initialState;
};

let state = generateInitialState();

const activeModulesSubject = new BehaviorSubject(state);

function toggleModuleState(moduleIdentifier) {
  state[moduleIdentifier] = !state[moduleIdentifier];
  // We need to create a new object, otherwhise the subject
  // does not recognize it as a new value.
  const newState = { ...state };
  activeModulesSubject.next(newState);
}

export const useActiveModules = () => {
  // default to the current state to avoid having null periods.
  const [activeModulesState, setActiveModulesState] = useState(state);

  useEffect(() => {
    const subscription = activeModulesSubject.subscribe(setActiveModulesState);
    // Unsubscribe when component is unmounted.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { activeModulesState, toggleModuleState };
};
