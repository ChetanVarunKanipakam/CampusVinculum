import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollmentDate: Date,
  grade: String
});

export default mongoose.model('Enrollment', enrollmentSchema);
