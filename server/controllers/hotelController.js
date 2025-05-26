import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.status(400).json({ success: false, message: "Hotel already registered" });
    }

    const newHotel = await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel registered successfully", hotel: newHotel });
  } catch (error) {
    console.error("Hotel registration error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
