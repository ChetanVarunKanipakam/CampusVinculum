import express from 'express';
import {addFaculty,getAllFaculty} from "../controllers/facultyController.js";

import express from 'express';
const router = express.Router();
router.post('/', addFaculty);

// Get faculty details
router.get('/', getAllFaculty);



export default router;