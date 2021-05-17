import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

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
