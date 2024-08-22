import { Server } from "socket.io";

let io: Server;
const userSocketMap = new Map<number, string>();
export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("join", (userId: number) => {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });

    socket.on("disconnect", () => {
      userSocketMap.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`User ${userId} disconnected`);
        }
      });
    });
  });
};

export const notifyUser = (userId: number, message: string) => {
  const socketId = userSocketMap.get(userId);
  if (socketId && io) {
    io.to(socketId).emit("notification", message);
  }
};
