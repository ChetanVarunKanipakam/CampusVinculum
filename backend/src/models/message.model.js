import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  createdBy: String
}, { timestamps: true });
export default mongoose.model('Room', roomSchema);