//create post
//delete post
//update post
import {createJobPosting,updateJobPosting,deletePosting} from "../controllers/jobController.js";
import express from 'express';
const router = express.Router();

router.post('/jobs', createJobPosting);
router.put('/jobs/:jobId', updateJobPosting);
router.delete('/jobs/:jobId', deletePosting);

export default router;