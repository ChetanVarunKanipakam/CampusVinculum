import express from 'express';
import {addFaculty,getAllFaculty} from "../controllers/facultyController.js";
const router = express.Router();
router.post('/', addFaculty);

// Get faculty details
router.get('/', getAllFaculty);



export default router;