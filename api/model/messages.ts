import _drop from "lodash/drop";
import { Message } from "../types/message";

// Lodash
import _parseInt from "lodash/parseInt";

let messages: Message[] = [];
const messageLimit: number = _parseInt(process.env.MESSAGE_LIMIT || "") || 10;

export function getMessages(): Message[] {
  return messages;
}

export function getMessage(messageId: string): Message | undefined {
  return messages.find(_message => _message.id === messageId);
}

export function addMessage(message: Message): void {
  const { length } = messages;

  if (length > messageLimit) messages = _drop(messages);

  messages.push(message);
}
