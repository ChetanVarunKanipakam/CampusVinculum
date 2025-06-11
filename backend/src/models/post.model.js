import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  threadID: { type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionThread' },
  content: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedDate: Date,
  modifiedDate: Date
});

export default mongoose.model('Post', postSchema);
