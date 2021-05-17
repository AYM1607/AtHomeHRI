import React, { useEffect, useState } from "react";
import { Box, Text, VStack, StackDivider, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { RobotModule, SocketChannels } from "../lib/enums";
import { mapRobotModuleToName } from "../lib/util";
import { socket } from "services/socketConnection";

export default function RobotModulesModule() {
  // TODO: This array should come from the socket.
  const [activeRobotModules, setActiveRobotModules] = useState([]);

  const activeRobotModulesMap = Object.values(RobotModule).reduce(
    (acum, robotModule) => {
      acum[robotModule] = !!activeRobotModules.find(
        (val) => val === robotModule
      );
      return acum;
    },
    {}
  );

  useEffect(() => {
    socket.on(SocketChannels.ACTIVE_MODULES, (data) =>
      setActiveRobotModules(JSON.parse(data))
    );
    return () => socket.off(SocketChannels.ACTIVE_MODULES);
  }, []);

  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="600px">
      <Text fontSize="2xl" mb="4">
        Active robot modules
      </Text>
      <VStack divider={<StackDivider borderColor="gray" />} alignItems="start">
        {Object.values(RobotModule).map((robotModule) => {
          const active = activeRobotModulesMap[robotModule];
          return (
            <Box key={robotModule} color={active ? "green" : "gray"}>
              {active ? (
                <Icon as={FaCheckCircle} />
              ) : (
                <Icon as={FaTimesCircle} />
              )}{" "}
              {mapRobotModuleToName(robotModule)}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
