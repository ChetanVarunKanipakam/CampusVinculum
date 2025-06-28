import express from 'express';
import { addClub, getAllClubs,getClubRoomsByUsername,getNormalRoomsByUsername,getClubByName } from "../controllers/clubController.js";

const router = express.Router();
// Route to add a new club
router.post('/', addClub);
router.get('/:username', getClubRoomsByUsername);
router.get('/rooms/:username', getNormalRoomsByUsername);
// Route to get all clubs
router.get('/clubs', getAllClubs);
router.get('/name/:name', getClubByName);

export default router;
