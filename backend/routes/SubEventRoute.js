import express from 'express';
import { createSubEvent, getInvitedMembers, getSubEventsByEventId } from '../controllers/SubEventController.js';

const router = express.Router();

// POST /api/subevents
router.post('/subevents', createSubEvent);
router.get('/subevents/invited-members/:eventId', getInvitedMembers);
router.get('/sub-events/:eventId', getSubEventsByEventId);

export default router;
