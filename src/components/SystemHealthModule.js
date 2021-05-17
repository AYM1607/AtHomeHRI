import React, { useEffect, useState } from "react";
import { Box, Text, Icon, VStack, StackDivider } from "@chakra-ui/react";
import { FaBatteryFull, FaMicrochip, FaPercentage } from "react-icons/fa";
import { SocketChannels } from "lib/enums";
import { socket } from "services/socketConnection";

export default function SystemHealthModule() {
  const [systemHealth, setSystemHealth] = useState([0, 0, 0]);

  useEffect(() => {
    socket.on(SocketChannels.SYSTEM_HEALTH, (data) =>
      setSystemHealth(JSON.parse(data))
    );
    return () => socket.off(SocketChannels.ACTIVE_MODULES);
  }, []);

  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="600px">
      <Text fontSize="2xl" mb="4">
        System Health
      </Text>
      <VStack divider={<StackDivider borderColor="gray" />} alignItems="start">
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaBatteryFull} /> Battery:{" "}
          {parseInt(systemHealth[0])}%
        </Box>
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaPercentage} /> CPU:{" "}
          {parseInt(systemHealth[1])}%
        </Box>
        <Box>
          <Icon boxSize="1.5em" mr="5" as={FaMicrochip} /> RAM:{" "}
          {parseInt(systemHealth[2])}%
        </Box>
      </VStack>
    </Box>
  );
}
