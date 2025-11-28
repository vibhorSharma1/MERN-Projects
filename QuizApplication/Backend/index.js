import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setUpSocket } from "./connections/socket.js"; // 👈 import your socket logic
import userRouter from "./routes/User.js";
import roomRoutes from "./routes/Room.js"
import QuizRoutes from "./routes/QuizRoutes.js";
import dotenv from "dotenv";
import {connectDB} from "./connections/DBconnection.js";
connectDB();

dotenv.config();
import "./connections/passport.js"; // 👈 ensure passport strategies are loaded
import passport from "passport";

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ exactly your frontend URL
    credentials: true, // ✅ allow cookies to be sent
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/auth",userRouter)
app.use("/room",roomRoutes)
app.use("/quiz",QuizRoutes)
app.use(passport.initialize());



// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setUpSocket(server); // 👈 plug socket setup here



// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
