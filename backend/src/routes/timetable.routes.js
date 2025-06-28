import express from "express";
import {
  createTimetable,
  getTimetableByGroup,
  updateTimetable,
  deleteTimetable
} from "../controllers/timetableController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createTimetable);
router.get("/", getTimetableByGroup); // ?branch=CSE&year=2§ion=A
router.put("/", updateTimetable);     // same query param
router.delete("/", deleteTimetable);  // same query param

export default router;
