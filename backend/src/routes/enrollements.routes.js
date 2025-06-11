//enroll student
//update grade by userId
import {
  enrollStudent,
  updateGrade
} from '../controllers/enrollmentController.js';
import express from 'express';
const router = express.Router();
router.post('/enroll', enrollStudent);
router.put('/enrollments/:userID/:courseID/grade', updateGrade);
export default router;
