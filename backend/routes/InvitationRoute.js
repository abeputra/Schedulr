import express from 'express';
import {
  inviteParticipant,
  acceptInvitation,
  declineInvitation
} from '../controllers/EventController.js';
import Event from '../models/EventModel.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Middleware untuk mendapatkan event info
router.use('/:eventId/invite', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    req.event = event;
    next();
  } catch (error) {
    next(error);
  }
});

// Endpoints
router.post('/:eventId/invite', verifyToken, inviteParticipant);

router.get('/invitations/accept', acceptInvitation);
router.get('/invitations/decline', declineInvitation);

export default router;