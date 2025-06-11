//add chatbot query
//fetch chatbot query by userId

import express from 'express';
import {addQuery} from '../controllers/chatbotController.js';
const router = express.Router();

router.post("/", addQuery)
export default router;