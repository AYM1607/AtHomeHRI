import React, { useState } from "react";
import {
  ChakraProvider,
  IconButton,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HamburgerIcon, WarningTwoIcon } from "@chakra-ui/icons";

import SelectionDrawer from "./components/SelectionDrawer";
import { useActiveModules } from "./hooks/useActiveModules";
import { mapModuleIdToComponent } from "./lib/util";

function App() {
  const { activeModulesState } = useActiveModules();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      {/* Modules options drawer */}
      <SelectionDrawer isOpen={isOpen} onClose={onClose} />
      {/* Modules options button */}
      <IconButton
        pos="fixed"
        right="10"
        bottom="10"
        size="lg"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        style={{ zIndex: 200 }}
      />
      <IconButton
        pos="fixed"
        right="10"
        bottom="100"
        size="lg"
        colorScheme="red"
        icon={<WarningTwoIcon />}
        style={{ zIndex: 200 }}
      />
      <Wrap p="6">
        {Object.keys(activeModulesState)
          .filter((moduleId) => activeModulesState[moduleId])
          .map((moduleId) => (
            <WrapItem key={moduleId}>
              {mapModuleIdToComponent(moduleId)}
            </WrapItem>
          ))}
      </Wrap>
    </ChakraProvider>
  );
}

export default App;
