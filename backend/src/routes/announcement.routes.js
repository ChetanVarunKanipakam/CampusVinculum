//add announcement
//update announcement
//fetch all announcements
//fetch announcements by role
import {createAnnouncement,updateAnnouncement,getAllAnnouncements} from "../controllers/announcementController.js";
import express from 'express';
const router = express.Router();
// Create a new announcement
router.post('/announcements', createAnnouncement);

// Update an existing announcement by ID
router.put('/announcements/:id', updateAnnouncement);

// Retrieve all announcements
router.get('/announcements', getAllAnnouncements);

export default router;