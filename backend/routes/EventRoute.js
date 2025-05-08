import express from 'express';
import {
  createEvent,
  getUserEvents
} from '../controllers/EventController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Semua endpoint ini memerlukan verifikasi token
router.post('/events', verifyToken, createEvent);
router.get('/events', verifyToken, getUserEvents);

export default router;
