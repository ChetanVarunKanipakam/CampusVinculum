import mongoose from 'mongoose';

const examScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  examType: { type: String, enum: ['Midterm', 'Final', 'Quiz'], required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  venue: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ExamSchedule', examScheduleSchema);
