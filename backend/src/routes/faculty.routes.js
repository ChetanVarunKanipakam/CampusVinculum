import express from 'express';
const router = express.Router();
import {assignCourse,createAnnouncement,hostLiveSession} from '../controllers/facultyController';

router.post('/assign-course', assignCourse);
router.post('/create-announcement', createAnnouncement);
router.post('/host-session', hostLiveSession);

export default router;