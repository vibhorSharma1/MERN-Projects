import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  imageUrl: {
    type: String,
  },
  coins: { type: Number, default: 0 },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },

  // 🔹 Friends System
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // 🔹 Friend Requests System
  friendRequests: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);
