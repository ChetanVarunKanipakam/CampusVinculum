import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdDate: Date,
  adminID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Club', clubSchema);
