import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true }, // e.g. "Monday"
  startTime: { type: String, required: true }, // e.g. "10:00"
  endTime: { type: String, required: true },
  room: { type: String }
}, { timestamps: true });

export default mongoose.model('Timetable', timetableSchema);
