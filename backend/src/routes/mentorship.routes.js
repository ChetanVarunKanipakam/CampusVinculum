//add mentorship
//remove mentorship
//update mentorship status
import {
  addMentorship,
  removeMentorship,
  updateMentorshipStatus
} from '../controllers/mentorshipController.js'; 
import express from 'express';
const router = express.Router();
router.delete('/:id', removeMentorship);
router.patch('/:id/status', updateMentorshipStatus);
router.post('/', addMentorship);
export default router;