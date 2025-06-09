import mongoose from 'mongoose';

const discussionThreadSchema = new mongoose.Schema({
  title: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
  category: { type: String, enum: ['Academics', 'Events', 'Clubs', 'Placements'] }
});

export default mongoose.model('DiscussionThread', discussionThreadSchema);
