import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import { useState } from 'react';
import { ModuleIdentifier } from "../lib/enums";
import { mapModuleIdToName, storeConfig } from "../lib/util";

export default function NewConfigModal({ isOpen, onClose }) {
  const [configName, setConfigName] = useState('');
  var modules = [];

  const handleConfigSubmit = event => {
    event.preventDefault();
    storeConfig(configName, modules);
    onClose();
  };

  const appendModule = event => {
    event.stopPropagation();
    if (event.target.checked) {
      modules.push(event.target.value);
    } else {
      const index = modules.indexOf(event.target.value);
      if (index > -1) {
        modules.splice(index, 1);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleConfigSubmit}>
            <ModalHeader>Create new configuration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired mb={5}>
                <FormLabel>Configuration name</FormLabel>
                <Input
                  type="text"
                  onChange={event => setConfigName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl>
                <Stack direction="column">
                  {Object.values(ModuleIdentifier).map((moduleId) => (
                    <Checkbox
                      value={moduleId}
                      key={moduleId}
                      onChange={appendModule}
                      size="lg"
                    >
                      {mapModuleIdToName(moduleId)}
                    </Checkbox>
                  ))}
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="pink">Create</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}