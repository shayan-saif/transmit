import { SocketContext } from "@/contexts/socket";
import { getMessages } from "@/http";
import { EVENT } from "@/types/events";
import { Message as IMessage } from "@/types/message";
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

    socket.on(EVENT.userJoin, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on(EVENT.message, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on(EVENT.userLeft, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off(EVENT.userJoin);
      socket.off(EVENT.message);
      socket.off(EVENT.userLeft);
    };
  }, []);

  return (
    <div className="messages">
      {messages.map((message: IMessage) => (
        <Message
          key={message.id}
          message={message}
          currentUser={message.user.id === socket.id}
        />
      ))}
    </div>
  );
}
