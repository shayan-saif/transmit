import express from "express";
import http from "http";
import { Server } from "socket.io";
import { onConnection, onDisconnect, onMessage } from "./controller";
import { getConnections } from "./model/connections";
import { getMessage, getMessages } from "./model/messages";
import { EVENT } from "./types/events";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: ["http://localhost:5500"] },
});

io.on(EVENT.connection, socket => {
  onConnection(socket);

  socket.on(EVENT.message, (message: string) => {
    onMessage(message, socket);
  });

  socket.on(EVENT.disconnect, () => {
    onDisconnect(socket);
  });
});

app.get("/", (req, res) => res.json(getMessages()));

server.listen(4200, () => {
  console.log("listening on *:4200");
});
