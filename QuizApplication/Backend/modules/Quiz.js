import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  questions: [questionSchema],
});

export default mongoose.model("Quiz", quizSchema);