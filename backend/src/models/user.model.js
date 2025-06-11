import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['Student', 'Faculty', 'Admin', 'Alumni'] },
  departmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  profilePicture: String,
  contactInfo: String,
});

export default mongoose.model('User', userSchema);
