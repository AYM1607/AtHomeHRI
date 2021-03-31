import React, { useState, useEffect } from "react";
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
    <div>
      <h1>Websocket test</h1>
      {image && <img src={`data:image/jpg;base64,${image}`} />}
    </div>
  );
}

export default App;
