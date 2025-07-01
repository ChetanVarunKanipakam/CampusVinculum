//add membership to student ,faculty
//fetch all members of club by clubId

import express from 'express';
import {
  addMembership,
  getMembersByClub
} from '../controllers/clubMembershipController.js';

const router = express.Router();
router.post('/', addMembership);
router.get('/:clubID', getMembersByClub);

export default router;