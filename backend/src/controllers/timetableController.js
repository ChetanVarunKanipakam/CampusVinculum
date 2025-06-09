import Timetable from '../models/timetable.model.js';

export const createTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.create(req.body);
    res.status(201).json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate('course faculty');
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTimetablesByCourse = async (req, res) => {
  try {
    const timetables = await Timetable.find({ course: req.params.courseId });
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
