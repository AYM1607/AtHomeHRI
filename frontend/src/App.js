import React, { useState } from "react";
import {
  Button,
  ChakraProvider,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import CameraFeed from "./components/CameraFeed";
import DummyModule from "./components/DummyModule";
import RobotFace from "./components/RobotFace/RobotFace";
import RobotChat from "./components/RobotChat";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCameraFeedActive, setIsCameraFeedActive] = useState(false);
  const [isDummyModuleActive, setIsDummyModuleActive] = useState(false);
  const [isRobotFaceActive, setIsRobotFaceActive] = useState(false);
  const [isRobotChatActive, setIsRobotChatActive] = useState(false);

  return (
    <ChakraProvider>
      {/* Modules options drawer */}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Modulos activos</DrawerHeader>
            <DrawerBody>
              <Stack direction="column">
                <Checkbox
                  isChecked={isCameraFeedActive}
                  onChange={(e) => setIsCameraFeedActive(e.target.checked)}
                  size="lg"
                >
                  Camera feed
                </Checkbox>
                <Checkbox
                  isChecked={isDummyModuleActive}
                  onChange={(e) => setIsDummyModuleActive(e.target.checked)}
                  size="lg"
                >
                  Dummy module
                </Checkbox>
                <Checkbox
                  isChecked={isRobotFaceActive}
                  onChange={(e) => setIsRobotFaceActive(e.target.checked)}
                  size="lg"
                >
                  Robot Face
                </Checkbox>
                <Checkbox
                  isChecked={isRobotChatActive}
                  onChange={(e) => setIsRobotChatActive(e.target.checked)}
                  size="lg"
                >
                  Robot Chat
                </Checkbox>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="pink">Enter competition mode</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
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
      <Wrap p="6">
        {isRobotFaceActive && (
          <WrapItem>
            <RobotFace />
          </WrapItem>
        )}
        {isCameraFeedActive && (
          <WrapItem>
            <CameraFeed />
          </WrapItem>
        )}
        {isDummyModuleActive && (
          <WrapItem>
            <DummyModule />
          </WrapItem>
        )}
        {isRobotChatActive && (
          <WrapItem>
            <RobotChat />
          </WrapItem>
        )}
      </Wrap>
    </ChakraProvider>
  );
}

export default App;
