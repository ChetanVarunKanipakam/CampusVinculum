import ExamSchedule from '../models/examschedule.model.js';

export const createExam = async (req, res) => {
  try {
    const exam = await ExamSchedule.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
