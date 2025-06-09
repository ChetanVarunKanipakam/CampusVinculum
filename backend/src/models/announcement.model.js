import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedDate: Date,
  targetAudience: String
});

export default mongoose.model('Announcement', announcementSchema);
