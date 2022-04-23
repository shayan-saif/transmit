import faker from "@faker-js/faker";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { getConnection } from "../model/connections";
import { Message } from "../types/message";
import { User } from "../types/user";

export function generateUser(socket: Socket): User {
  return {
    id: socket.id,
    name: faker.internet.domainWord(),
  };
}

export function generateMessage(
  text: string,
  socket: Socket | undefined = undefined
): Message {
  const user: User | undefined = getConnection(socket?.id);

  return {
    id: uuidv4(),
    user,
    text,
    timestamp: new Date().toISOString(),
  };
}
