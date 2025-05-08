import Event from "../models/EventModel.js";
import User from "../models/UserModel.js"; // Import User model for checking emails

// Menambahkan event baru
export const createEvent = async (req, res) => {
  try {
    const { title, organizer, description, invited_members } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing or invalid." });
    }
    
    // Verifikasi apakah setiap email anggota yang diundang terdaftar
    const invalidEmails = [];
    for (let email of invited_members) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        invalidEmails.push(email);
      }
    }

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        message: `The following emails are not registered: ${invalidEmails.join(", ")}`,
      });
    }

    // Jika semua email valid, lanjutkan untuk membuat event
    const newEvent = await Event.create({
      title,
      organizer,
      description,
      invited_members,
      userId,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// Mendapatkan event milik user yang sedang login
export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.findAll({ where: { userId } });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};
