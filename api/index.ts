import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import { onConnection, onDisconnect, onMessage } from "./controller";
import { getConnections } from "./model/connections";
import { getMessages } from "./model/messages";
import { EVENT } from "./types/events";

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "dist")));

export const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"] },
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

app.get("/", (req, res) => {
  return res.sendFile("index.html");
});

app.get("/participants", (req, res) => {
  return res.json(getConnections());
});

app.get("/messages", (req, res) => {
  return res.json(getMessages());
});

server.listen(4200, () => {
  console.log("listening on *:4200");
});
