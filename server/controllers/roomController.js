import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) return res.status(404).json({ success: false, message: "No hotel found" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload room images" });
    }

    // Upload images to Cloudinary
    const images = await Promise.all(
      req.files.map(async (file) => {
        const uploaded = await cloudinary.uploader.upload(file.path);
        return uploaded.secure_url;
      })
    );

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.status(201).json({ success: true, message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all rooms (public-facing)
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: { path: "owner", select: "image" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get rooms for a specific hotel owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotelData) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated", isAvailable: roomData.isAvailable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
