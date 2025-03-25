import { Server as SocketIOServer, Socket } from "socket.io";

class Sockets {
  constructor(private io: SocketIOServer) {
    this.listen();
  }

  private listen(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("New connection", socket.id);

      socket.on("mensaje-cliente", (data) => {
        console.log("Message received", data);
        this.io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }

  emitMessageToClients(metric: string, topic: string, message: string): void {
    this.io.emit(metric, { topic, message });
  }
}

export default Sockets;
