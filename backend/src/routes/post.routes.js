//create post
//delete post
//update post
//import { createPost, getPosts } from "../controllers/postController.js";
import { createPost, updatePost, deletePost } from '../controllers/postController.js';

import express from 'express';
const router = express.Router();
router.post('/', createPost);
router.put('/:postId', updatePost);

// Delete a post by post ID
router.delete('/:postId', deletePost);



export default router;