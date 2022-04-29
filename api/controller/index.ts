import { Socket } from "socket.io";
import {
  addConnection,
  getConnection,
  removeConnection,
} from "../model/connections";
import { generateMessage, generateUser } from "../utils";
import { io } from "../";
import { addMessage } from "../model/messages";
import { User } from "../types/user";
import { Message } from "../types/message";
import { EVENT } from "../types/events";

export function onConnection(socket: Socket): void {
  const user: User = generateUser(socket);
  addConnection(user);

  const message: Message = generateMessage(
    `joined the chat.`,
    EVENT.userJoin,
    socket
  );
  console.log(message);
  addMessage(message);

  socket.broadcast.emit(EVENT.userJoin, message);
}

export function onMessage(text: string, socket: Socket): void {
  const message: Message = generateMessage(text, EVENT.message, socket);

  console.log(message);
  addMessage(message);

  io.emit(EVENT.message, message);
}

export function onDisconnect(socket: Socket): void {
  const user: User | undefined = getConnection(socket.id);
  const message: Message = generateMessage(
    "left the chat.",
    EVENT.userLeft,
    socket
  );

  console.log(message);
  addMessage(message);

  removeConnection(socket.id);

  io.emit(EVENT.userLeft, message);
}
