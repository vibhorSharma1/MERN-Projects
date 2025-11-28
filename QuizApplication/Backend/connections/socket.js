import { Server } from "socket.io";

const rooms = {};

export const setUpSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ New user connected:", socket.id);

    socket.on("joinRoom", ({ roomID, userID, userName }) => {
      socket.join(roomID);

      if (!rooms[roomID]) rooms[roomID] = [];
      rooms[roomID].push({ userID, userName, socketID: socket.id });

      console.log(`${userName} joined room: ${roomID}`);
      io.to(roomID).emit("roomUsers", rooms[roomID]); // broadcast room user list
    });

    socket.on("sendMessage", ({ roomID, message, userName }) => {
      io.to(roomID).emit("receiveMessage", { userName, message });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
      for (const roomID in rooms) {
        rooms[roomID] = rooms[roomID].filter(u => u.socketID !== socket.id);
        io.to(roomID).emit("roomUsers", rooms[roomID]);
      }
    });
  });
};
