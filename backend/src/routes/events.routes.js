//add events
//get all events
//get events by club Id

import {
  addEvent,
  getAllEvents,
  getEventsByClub
} from '../controllers/eventController.js';
import express from 'express';
const router = express.Router();
router.post('/events', addEvent);
router.get('/events', getAllEvents);
router.get('/events/club/:clubID', getEventsByClub);

export default router;
