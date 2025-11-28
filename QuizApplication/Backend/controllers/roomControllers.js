import  Room  from "../modules/Room.js";
import jsonwebtoken from "jsonwebtoken";
// ✅ Get all rooms (paginated)
export const getRooms = async (req, res) => {
  try {
    console.log("Request")
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Room.countDocuments();
    const rooms = await Room.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      totalRooms: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Create a new room
export const createRoom = async (req, res) => {
  try {
    const { name, topic } = req.body;   // frontend se aayega: name, topic

    if (!name || !topic) {
      return res.status(400).json({ message: "Room name and topic are required" });
    }
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"No token found"})
    }
    const decoded=jsonwebtoken.verify(token,process.env.JWT_SECRET);
    // Logged-in user = host
    const hostId = decoded._id;  // verifyUser middleware se aata hai

    // Create room
    const newRoom = new Room({
      name,
      topic,
      host: hostId,
      participants: [hostId],  // host is first participant
    });

    await newRoom.save();

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
