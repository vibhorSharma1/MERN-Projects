import express from "express";
import { getRooms, createRoom } from "../controllers/roomControllers.js";

const router = express.Router();

router.get("/rooms", getRooms);
router.post("/create", createRoom);

export default router;
