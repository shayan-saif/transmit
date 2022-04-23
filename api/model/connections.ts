import { User } from "../types/user";

let connections: User[] = [];

export function getConnections(): User[] {
  return connections;
}

export function getConnection(userId: string | undefined): User | undefined {
  return connections.find(_user => _user.id === userId);
}

export function addConnection(user: User): void {
  connections.push(user);
}

export function removeConnection(userId: string): void {
  connections = connections.filter(_user => _user.id !== userId);
}
