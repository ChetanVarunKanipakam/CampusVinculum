import express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  login,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/login',login);
router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

export default router;
