// add alumini Profiler
// get alumini details

import express from 'express';
import {
  getAllAlumini,
  getAluminiById,
  addAlumini
} from '../controllers/aluminiController.js'
const router = express.Router();
router.get('/alumini', getAllAlumini);
router.get('/alumini/:id', getAluminiById);
router.post('/alumini', addAlumini);

export default router;
