//add admin 
//get admin details
import express from 'express';
import { addAdmin, getAdminDetails } from '../controllers/adminController.js';

const router = express.Router();

router.post('/', addAdmin);
router.get('/:userID', getAdminDetails);

export default router;
