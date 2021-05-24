import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react";

import { useActiveModules } from "../hooks/useActiveModules";
import { mapModuleIdToName } from "../lib/util";
import ConfigSelectionForm from "./ConfigSelectionForm";

export default function SelectionDrawer({ isOpen, onClose }) {
  const { activeModulesState, toggleModuleState } = useActiveModules();

  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Modulos activos</DrawerHeader>
          <DrawerBody>
            <Stack direction="column">
              <ConfigSelectionForm/>
              {Object.keys(activeModulesState).map((moduleId) => (
                <Checkbox
                  key={moduleId}
                  isChecked={activeModulesState[moduleId]}
                  onChange={(_) => toggleModuleState(moduleId)}
                  size="lg"
                >
                  {mapModuleIdToName(moduleId)}
                </Checkbox>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="pink">Enter competition mode</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
