// add job posting
// remove job posting
// update job posting
import {
  createJobPosting,
  deletePosting,
  updateJobPosting
} from '../controllers/jobPostingController.js'; 

import express from 'express';
const router = express.Router();
router.post('/', createJobPosting);
router.put('/jobs/:jobId', updateJobPosting);
router.delete('/jobs/:jobId', deletePosting);
export default router;