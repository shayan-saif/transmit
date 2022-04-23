import { User } from "./user";

export interface Message {
  id?: string;
  user?: User;
  text: string;
  timestamp?: string;
}
