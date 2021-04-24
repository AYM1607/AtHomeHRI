import { Box, Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { socket } from "../services/socketConnection";

export default function CameraFeed() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.on("CameraFeed", setImage);
    return () => socket.off("CameraFeed");
  }, []);

  return (
    <Box shadow="lg" p="4" borderRadius="lg" maxW="50%">
      <Text fontSize="2xl" mb="4">
        Camera feed
      </Text>
      {image && <img src={`data:image/jpg;base64,${image}`} />}
    </Box>
  );
}
