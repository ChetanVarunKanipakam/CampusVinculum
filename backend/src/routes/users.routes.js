import express from 'express';
const router = express.Router();
import {login , logout , updateProfile} from '../controllers/userController.js'


router.post('/login', login);
router.put('/update/:id', updateProfile);
router.get('/logout' , logout);


export default router;