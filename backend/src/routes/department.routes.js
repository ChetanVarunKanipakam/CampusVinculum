//add dept
//change description of dept
//get deptId
import {addDepartment,updateDepartmentDescription,getDepartmentById} from "../controllers/departmentController.js";
import express from 'express';
const router = express.Router();
router.post('/', addDepartment);

// Update the department's description by ID
router.put('/:deptId/description', updateDepartmentDescription);

// Get a single department by ID
router.get('/:deptId', getDepartmentById);
export default router;