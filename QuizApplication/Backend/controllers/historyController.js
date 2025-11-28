import { QuizHistory } from "../modules/QuizHistrory.js";

export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user.id;  // after verifyUser middleware

    const history = await QuizHistory.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      history
    });

  } catch (err) {
    console.error("Error fetching quiz history:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Save quiz result when a quiz finishes
export const saveQuizResult = async (req, res) => {
  try {
    const { title, score, rank, status } = req.body;
    const userId = req.user.id;

    const newHistory = new QuizHistory({
      userId,
      title,
      score,
      rank,
      status,
      date: new Date()
    });

    await newHistory.save();

    res.status(201).json({ success: true, history: newHistory });

  } catch (err) {
    console.error("Error saving quiz result:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
