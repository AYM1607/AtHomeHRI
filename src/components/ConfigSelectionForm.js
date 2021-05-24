import {
  Button,
  Divider,
  Select,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import NewConfigModal from "./NewConfigModal";
import { useState } from 'react';
import { getLocalStorageConfigs, storeConfig } from "../lib/util";
import { useActiveModules } from "../hooks/useActiveModules";

const defaultValue = "Select config";

export default function ConfigSelectionForm() {
  const { currentConfig, loadConfig, activeModulesState } = useActiveModules();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const configs = getLocalStorageConfigs();

  const buttonDisabled = () => {
    // TODO(eskr): Checar is se modifico la configuracion.
    // Puede ser modificada en cuanto cantidad y orden de modulos.
    return !currentConfig;
  };

  const handleSaveConfig = () => {
    currentConfig.modules = Object.keys(activeModulesState).filter(
      moduleId => activeModulesState[moduleId]);
    storeConfig(currentConfig.name, currentConfig.modules);
    loadConfig(currentConfig);
  };

  return (
    <Stack>
      <NewConfigModal  isOpen={isOpen} onClose={onClose} />
      <Stack direction="row">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
            {currentConfig ? currentConfig.name : defaultValue}
          </MenuButton>
          <MenuList>
            {Object.keys(configs).map((configId) => (
              <MenuItem value={configId} key={configId}
                onClick={event => loadConfig(configs[event.target.value])}>{configId}</MenuItem>
            ))}
            <MenuDivider />
            <MenuItem onClick={onOpen} key="new">Add config ...</MenuItem>
          </MenuList>
        </Menu>
        <Button colorScheme="pink" isDisabled={buttonDisabled()} onClick={handleSaveConfig}>Save</Button>
      </Stack>
    </Stack>
  );
}