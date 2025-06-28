import mongoose from 'mongoose';

const examScheduleSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  examType: { type: String, enum: ['Mid-Terms', 'Semester Exams'], required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  venue: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true }
});

export default mongoose.model('ExamSchedule', examScheduleSchema);
