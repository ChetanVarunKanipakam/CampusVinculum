//add dept
//change description of dept
//get deptId
import {addDepartment,updateDepartmentDescription,getDepartmentById} from "../controllers/departmentController.js";
import express from 'express';
const router = express.Router();

router.post('/adddept',addDepartment);

export default router;