//create post
//delete post
//update post
import postController from "../controllers/postControllers.js"
import express from 'express';
const router = express.Router();

router.post('/jobs', createJobPosting);
router.put('/jobs/:jobId', updateJobPosting);
router.delete('/jobs/:jobId', deleteJobPosting);

export default router;