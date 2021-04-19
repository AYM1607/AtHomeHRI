import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Camera from './modules/camera'

const ENDPOINT = "http://127.0.0.1:5000";

const socket = socketIOClient(ENDPOINT);

const modulesMap = {
  CameraFeed: Camera,
};

const availableModules = [
  "CameraFeed"
]

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    socket.on("CameraFeed", setData);

    socket.on("Comm", console.log);
    return () => socket.disconnect();
  }, []);

  const modules = availableModules.map(function(moduleName) {
    const module = modulesMap[moduleName];
    return <module data={JSON.parse(data)} />
  });

  console.log(modules);

  return (
    <div>{modules}</div>
  );
}

export default App;
