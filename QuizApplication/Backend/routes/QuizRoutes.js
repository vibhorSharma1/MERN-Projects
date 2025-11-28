import express from "express";
import { getUserHistory, saveQuizResult } from "../controllers/historyController.js";
import { verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/", verifyUser, getUserHistory);
router.post("/", verifyUser, saveQuizResult);

export default router;
