import { SocketContext } from "@/contexts/socket";
import { getMessages } from "@/http";
import { EVENT } from "@/types/events";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";

type Props = {};

export default function Messages({}: Props) {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  async function updateMessages() {
    const { data } = await getMessages();
    setMessages(data);
  }

  useEffect(() => {
    updateMessages();

    socket.on(EVENT.message, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off(EVENT.message);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
