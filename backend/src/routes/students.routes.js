// routes/profile.js
import express from "express";
import { addSkill, addAchievement, getProfile,deleteAchievement,deleteSkill } from "../controllers/studentController.js";
import {verifyToken} from '../middlewares/auth.middleware.js'


const router = express.Router();

router.post("/skills", verifyToken,addSkill);
router.post("/achievements",verifyToken, addAchievement);
router.get("/profile", verifyToken, getProfile);
router.delete('/skills', verifyToken, deleteSkill);
router.delete('/achievements', verifyToken, deleteAchievement);

export default router;
