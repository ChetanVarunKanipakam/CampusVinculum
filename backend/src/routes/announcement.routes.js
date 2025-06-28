//add announcement
//update announcement
//fetch all announcements
//fetch announcements by role
import {createAnnouncement,updateAnnouncement,getAllAnnouncements} from "../controllers/announcementController.js";
import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();
// Create a new announcement
router.post('/',verifyToken, createAnnouncement);

// Update an existing announcement by ID
router.put('/:id', updateAnnouncement);

// Retrieve all announcements
router.get('/', getAllAnnouncements);

export default router;