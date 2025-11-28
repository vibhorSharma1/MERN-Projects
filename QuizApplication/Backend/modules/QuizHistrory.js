import mongoose from "mongoose";

const quizHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    status: { type: String, enum: ["Win", "Lose"], required: true },
  },
  { timestamps: true }
);

export const QuizHistory = mongoose.model("QuizHistory", quizHistorySchema);
