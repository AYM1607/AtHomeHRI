import { Box, Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { socket } from "../services/socketConnection";

export default function ComponentTemplate() {
  // State variables used for component with initial state as null.
  const [var, setVar] = useState('HOLA');

  // Use effect for receiving robot socket messages.
  useEffect(() => {
    socket.on("ComponentTemplate", setVar);
    return () => socket.off("ComponentTemplate");
  }, []);

  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="600px">
      <Text fontSize="2xl" mb="4">
        Hello World! {var}
      </Text>
    </Box>
  );
}

