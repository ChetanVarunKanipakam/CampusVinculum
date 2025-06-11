import express from 'express';
import { addClub, getAllClubs } from "../controllers/clubController.js";

const router = express.Router();
// Route to add a new club
router.post('/add-club', addClub);

// Route to get all clubs
router.get('/clubs', getAllClubs);

export default router;
