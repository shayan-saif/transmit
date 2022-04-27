import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4200",
});

export async function getParticipants() {
  return await http.get("/participants");
}

export async function getMessages() {
  return await http.get("/messages");
}

export default http;
