import ExamSchedule from '../models/examschedule.model.js';

// Create exam schedule
export const createExamSchedule = async (req, res) => {
  try {
    console.log(req.body);
    const newExam = new ExamSchedule(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get exams by branch and year
export const getExamsByBranchYear = async (req, res) => {
  const { branch, year } = req.params;
  console.log(req.params);
  try {
    const exams = await ExamSchedule.find({ branch, year:parseInt(year) });
    res.status(200).json(exams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllExams = async (req, res) => {
  try {
    const exams = await ExamSchedule.find().populate('course');
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExamsByCourse = async (req, res) => {
  try {
    const exams = await ExamSchedule.find({ course: req.params.courseId });
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    await ExamSchedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
