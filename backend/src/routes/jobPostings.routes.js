// add job posting
// remove job posting
// update job posting
import {
  createJobPosting,
  deletePosting,
  updateJobPosting,
  getJobsByPoster,
  getAllJobs
} from '../controllers/jobPostingController.js'; 
import {verifyToken} from '../middlewares/auth.middleware.js';


import express from 'express';
const router = express.Router();
router.post('/',verifyToken, createJobPosting);
router.put('/jobs/:jobId', updateJobPosting);
router.delete('/jobs/:jobId', deletePosting);
router.get('/',verifyToken, getJobsByPoster);
router.get('/all', getAllJobs);
export default router;