import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
  title: String,
  description: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
  companyName: String,
  location: String,
  applicationDeadline: Date
});

export default mongoose.model('JobPosting', jobPostingSchema);
