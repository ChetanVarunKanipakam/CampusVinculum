import express from 'express';
const router = express.Router();
import {getAllExams,getExamsByCourse,deleteExam} from '../controllers/examscheduleController.js';
import { verifyToken, isRole } from '../middlewares/auth.middleware.js';
import {
  createExamSchedule,
  getExamsByBranchYear
} from '../controllers/examscheduleController.js';

router.post('/', createExamSchedule);
router.get('/:branch/:year', getExamsByBranchYear);
router.get('/all', verifyToken, getAllExams);
router.get('/course/:courseId', verifyToken, getExamsByCourse);
router.delete('/:id', verifyToken, isRole(['Admin']), deleteExam);

export default router;
