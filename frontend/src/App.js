import React, { useState, useEffect } from "react";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

const socket = socketIOClient(ENDPOINT);

function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.on("CameraFeed", setImage);

    socket.on("Comm", console.log);
    return () => socket.disconnect();
  }, []);

  return (
    <ChakraProvider>
      <Container textAlign="center">
        <Heading mb={10}>@HOME HRI</Heading>
        {image && <img src={`data:image/jpg;base64,${image}`} />}
      </Container>
    </ChakraProvider>
  );
}

export default App;
