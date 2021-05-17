import { Box } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { socket } from "../../services/socketConnection";
import RobotEyeController from "./RobotEyeController"
import './RobotFace.css'

export default function RobotFace() {
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    socket.on("RobotFace", setEmotion);
    return () => socket.off("RobotFace");
  }, []);

  const eyes = new RobotEyeController({
    leftEye: document.querySelector('.left.eye'),
    rightEye: document.querySelector('.right.eye'),
    upperLeftEyelid: document.querySelector('.left .eyelid.upper'),
    upperRightEyelid: document.querySelector('.right .eyelid.upper'),
    lowerLeftEyelid: document.querySelector('.left .eyelid.lower'),
    lowerRightEyelid: document.querySelector('.right .eyelid.lower'),
  });

  if (emotion != null) {
    console.log("Emotion: ", emotion)
    switch(emotion) {
      case "start":
        eyes.startBlinking();
        break;
      case "stop":
        console.log("Stopping blinking ...")
        eyes.stopBlinking();
        break;
      default:
        eyes.express({type: emotion});
    }
  }

  return (
    <Box shadow="lg" p="4" borderRadius="lg" className="face">
      <Box className="eye left">
        <Box className="eyelid upper"></Box>
        <Box className="eyelid lower"></Box>
      </Box>
      <Box className="eye right">
        <Box className="eyelid upper"></Box>
        <Box className="eyelid lower"></Box>
      </Box>
    </Box>
  );
}
