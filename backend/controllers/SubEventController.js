import SubEvent from '../models/SubEventModel.js';
import Event from '../models/EventModel.js';

// POST /api/subevents
export const createSubEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      additional_description,
      date,
      time,
      location,
      task_type,
      eventId,
      assignedtasks,
      assignedmembers,
    } = req.body;

    if (!eventId || !title || !date || !time || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.findByPk(eventId, {
      attributes: ['organizer'],
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const organizer = event.organizer;

    const newSubEvent = await SubEvent.create({
      eventId,
      title,
      description,
      additional_description,
      organizer,
      date,
      time,
      location,
      task_or_agenda: task_type,
      task_type,
      assignedtasks,
      assignedmembers,
    });

    res.status(201).json({
      message: 'Sub Event created successfully',
      subEvent: newSubEvent,
    });
  } catch (error) {
    console.error('Error creating sub event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/subevents/invited-members/:eventId
export const getInvitedMembers = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByPk(eventId, {
      attributes: ['invited_members'],
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const members = event.invited_members || [];
    res.status(200).json(members);
  } catch (error) {
    console.error('Error getting invited members:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/subevents/:eventId
export const getSubEventsByEventId = async (req, res) => {
  const { eventId } = req.params;
  try {
    const subEvents = await SubEvent.findAll({
      where: { eventId },
    });
    res.json(subEvents);
  } catch (err) {
    console.error('Error fetching sub-events:', err);
    res.status(500).json({ message: 'Failed to fetch sub-events' });
  }
};
