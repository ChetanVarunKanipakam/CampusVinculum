//add course
//get course by dept id
//update credits


import express from 'express';
import {
  addCourse,
  getCoursesByDept,
  updateCredits
} from '../controllers/courseController.js'; 
const router = express.Router();
router.post('/courses', addCourse);
router.get('/courses/department/:departmentID', getCoursesByDept);
router.put('/courses/:courseID/credits', updateCredits);


export default router;