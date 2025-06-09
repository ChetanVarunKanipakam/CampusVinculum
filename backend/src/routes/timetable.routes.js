import express from 'express';
const router = express.Router();
import {createTimetable,getTimetables,getTimetablesByCourse,deleteTimetable} from '../controllers/timetableController.js';
import { verifyToken, isRole } from '../middlewares/auth.middleware.js';

router.post('/create', verifyToken, isRole(['Faculty', 'Admin']), createTimetable);
router.get('/all', verifyToken, getTimetables);
router.get('/course/:courseId', verifyToken, getTimetablesByCourse);
router.delete('/:id', verifyToken, isRole(['Admin']), deleteTimetable);

export default router;
