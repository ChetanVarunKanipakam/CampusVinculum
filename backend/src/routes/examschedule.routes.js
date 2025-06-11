import express from 'express';
const router = express.Router();
import {createExam,getAllExams,getExamsByCourse,deleteExam} from '../controllers/examscheduleController.js';
import { verifyToken, isRole } from '../middlewares/auth.middleware.js';

router.post('/create', verifyToken, isRole(['Faculty', 'Admin']), createExam);
router.get('/all', verifyToken, getAllExams);
router.get('/course/:courseId', verifyToken, getExamsByCourse);
router.delete('/:id', verifyToken, isRole(['Admin']), deleteExam);

export default router;
