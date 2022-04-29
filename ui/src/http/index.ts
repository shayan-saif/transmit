import axios, { AxiosResponse } from "axios";

const http = axios.create({
  baseURL: "http://localhost:4200",
});

export async function getParticipants(): Promise<AxiosResponse<any, any>> {
  return await http.get("/participants");
}

export async function getMessages(): Promise<AxiosResponse<any, any>> {
  return await http.get("/messages");
}

export default http;
