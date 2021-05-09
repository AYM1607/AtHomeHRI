import React, { useState } from "react";
import { Box, Text, VStack, StackDivider, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { RobotModule } from "../lib/enums";
import { mapRobotModuleToName } from "../lib/util";

export default function RobotModulesModule() {
  // TODO: This array should come from the socket.
  const [activeRobotModules, setActiveRobotModules] = useState([
    RobotModule.MAIN_ENGINE,
    RobotModule.SPEECH,
    RobotModule.NLU,
  ]);

  const activeRobotModulesMap = Object.values(RobotModule).reduce(
    (acum, robotModule) => {
      acum[robotModule] = !!activeRobotModules.find(
        (val) => val === robotModule
      );
      return acum;
    },
    {}
  );

  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="600px">
      <Text fontSize="2xl" mb="4">
        Active robot modules
      </Text>
      <VStack divider={<StackDivider borderColor="gray" />} alignItems="start">
        {Object.values(RobotModule).map((robotModule) => {
          const active = activeRobotModulesMap[robotModule];
          return (
            <Box color={active ? "green" : "gray"}>
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

