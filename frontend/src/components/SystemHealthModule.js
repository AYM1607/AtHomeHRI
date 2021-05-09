import React from "react";
import { Box, Text, Icon, VStack, StackDivider } from "@chakra-ui/react";
import { FaBatteryFull, FaMicrochip, FaPercentage } from "react-icons/fa";

export default function SystemHealthModule() {
  // TODO: Receive real values from the socket.
  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="600px">
      <Text fontSize="2xl" mb="4">
        System Health
      </Text>
      <VStack divider={<StackDivider borderColor="gray" />} alignItems="start">
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaBatteryFull} /> Battery: 100%
        </Box>
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaPercentage} /> CPU: 10%
        </Box>
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaMicrochip} /> RAM: 10%
        </Box>
      </VStack>
    </Box>
  );
}
