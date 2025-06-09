import mongoose from 'mongoose';

const mentorshipSchema = new mongoose.Schema({
  alumniID: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  status: String
});

export default mongoose.model('Mentorship', mentorshipSchema);
