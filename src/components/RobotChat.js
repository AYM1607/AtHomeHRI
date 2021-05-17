import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

import { socket } from "../services/socketConnection";
import { v4 as uuidv4 } from "uuid";

const user = {
  uid: "admin",
};

const robotChatLocalStorageKey = "robotMessages";

function getLocalStorageRobotChat() {
  let messages = [];
  const storedMessages = window.localStorage.getItem(robotChatLocalStorageKey);

  if (storedMessages != null) {
    messages = JSON.parse(storedMessages);
  }

  return messages;
}

function setLocalStorageRobotChat(messages) {
  const messagesJSONString = JSON.stringify(messages);
  window.localStorage.setItem(robotChatLocalStorageKey, messagesJSONString);
}

function messageExists(messageId, messages) {
  return messages.find((message) => message.id === messageId) != undefined;
}

export default function RobotChat() {
  const [newMessage, setNewMessage] = useState(null);

  function sendMessage(message) {
    const newMessage = {
      text: message,
      id: uuidv4(),
      sender: {
        uid: user.uid,
        avatar: "https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png",
      },
    };

    // TODO: Add post to python API that communicates with ROS Node
    // to send instruction.

    setNewMessage(newMessage);
  }

  useEffect(() => {
    socket.on("RobotMessage", setNewMessage);
    return () => socket.off("RobotMessage");
  }, []);

  const storedMessages = getLocalStorageRobotChat();

  if (newMessage != null && !messageExists(newMessage.id, storedMessages)) {
    console.log("New Message: ", newMessage);

    storedMessages.push(newMessage);
    setLocalStorageRobotChat(storedMessages);
  }

  return (
    <Box borderRadius="lg" p="4" shadow="lg" w="600px">
      <Text fontSize="2xl" mb="4">
        Robot messages
      </Text>
      <ChatBox messages={storedMessages} user={user} onSubmit={sendMessage} />
    </Box>
  );
}
