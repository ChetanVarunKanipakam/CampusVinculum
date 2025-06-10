//add dept
//change description of dept
//get deptId
import {adddepartment,updateDepartmentDescription,getDepartmentById} from "../controllers/departmentController.js";
import express from 'express';
const router = express.Router();

router.post('/adddept',adddepartment);

export default router;