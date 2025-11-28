import  User  from "../modules/User.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    // 🔹 Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // 🔹 Verify token to extract user info
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const currentUserId = decoded.id;

    // 🔹 Fetch all users except current one
    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

    if (!users.length) {
      return res.status(200).json({ message: "No other users found", users: [] });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
