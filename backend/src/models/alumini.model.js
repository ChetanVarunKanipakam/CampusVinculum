import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  graduationYear: Number,
  currentPosition: String,
  company: String,
  linkedInProfile: String
});

export default mongoose.model('Alumni', alumniSchema);
