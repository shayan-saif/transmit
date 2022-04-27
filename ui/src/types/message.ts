import { EVENT } from "./events";
import { User } from "./user";

export interface Message {
  id?: string;
  user?: User;
  text: string;
  metadata?: EVENT;
  timestamp?: string;
}
