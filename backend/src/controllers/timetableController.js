import Timetable from "../models/timetable.model.js";

// POST: Create a new timetable
export const createTimetable = async (req, res) => {
  const { branch, year, section, timeSlots, days, timetable } = req.body;

  try {
    const existing = await Timetable.findOne({ branch, year, section });
    if (existing) return res.status(400).json({ message: "Timetable already exists for this group." });

    const newTimetable = new Timetable({ branch, year, section, timeSlots, days, timetable });
    await newTimetable.save();
    res.status(201).json(newTimetable);
  } catch (err) {
    res.status(500).json({ message: "Failed to create timetable", error: err.message });
  }
};

// GET: Fetch timetable by group
export const getTimetableByGroup = async (req, res) => {
  const { branch, year, section } = req.query;
  console.log(req.query);
  if (!branch || !year || !section) {
    return res.status(400).json({ message: "branch, year and section are required in query." });
  }
  
  try {
    const timetable = await Timetable.findOne({ branch, year, section });
    if (!timetable) return res.status(404).json({ message: "No timetable found." });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timetable", error: err.message });
  }
};

// PUT: Update timetable by group
export const updateTimetable = async (req, res) => {
  const { branch, year, section } = req.query;
  const { timeSlots, days, timetable } = req.body;

  try {
    const updated = await Timetable.findOneAndUpdate(
      { branch, year, section },
      { timeSlots, days, timetable },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Timetable not found to update." });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update timetable", error: err.message });
  }
};

// DELETE: Remove timetable
export const deleteTimetable = async (req, res) => {
  const { branch, year, section } = req.query;

  try {
    const deleted = await Timetable.findOneAndDelete({ branch, year, section });
    if (!deleted) return res.status(404).json({ message: "Timetable not found." });

    res.json({ message: "Timetable deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete timetable", error: err.message });
  }
};
