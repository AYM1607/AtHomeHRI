import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { socket } from "../services/socketConnection";

export default function DummyModule() {
  const [message, setMessage] = useState("No messages yet");

  useEffect(() => {
    socket.on("Comm", setMessage);
    return () => socket.off("Comm");
  }, []);

  return (
    <Box borderRadius="lg" p="4" shadow="lg" w="600px" h="403.5px">
      <Text mb="4" fontSize="2xl">
        Robot messages
      </Text>
      <Text fontSize="md">{message}</Text>
    </Box>
  );
}
