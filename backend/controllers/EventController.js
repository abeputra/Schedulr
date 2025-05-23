import Event from "../models/EventModel.js";
import User from "../models/UserModel.js"; // Import User model for checking emails
import crypto from 'crypto';
import EventParticipant from '../models/EventParticipantModel.js';
import { sendInvitationEmail } from '../services/EmailService.js';

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


export const inviteParticipant = async (req, res) => {
  try {
    const { eventId, email } = req.body;
    
    const token = crypto.randomBytes(20).toString('hex');
    
    const participant = await EventParticipant.create({
      eventId,
      email,
      responseToken: token,
      status: 'pending'
    });

    // Kirim email
    await sendInvitationEmail({
      to: email,
      eventId,
      token
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/InvitationController.js

export const acceptInvitation = async (req, res) => {
  try {
    const { token } = req.query;
    
    const participant = await EventParticipant.findOne({ 
      where: { responseToken: token } 
    });
    
    if (!participant) {
      return res.status(404).send('Undangan tidak valid');
    }

    await participant.update({ status: 'accepted' });
    res.send('Undangan telah diterima');
  } catch (error) {
    res.status(500).send('Error');
  }
};

export const declineInvitation = async (req, res) => {
  try {
    const { token } = req.query;
    
    const participant = await EventParticipant.findOne({ 
      where: { responseToken: token } 
    });
    
    if (!participant) {
      return res.status(404).send('Undangan tidak valid');
    }

    await participant.update({ status: 'declined' });
    res.send('Undangan telah ditolak');
  } catch (error) {
    res.status(500).send('Error');
  }
};