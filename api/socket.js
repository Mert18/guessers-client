import { Server } from "socket.io";

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
    res.socket.server.io = io;
  }
  res.end();
}
