import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  credits: Number,
  departmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

export default mongoose.model('Course', courseSchema);
