import mongoose from 'mongoose';
const roomUserSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  username: String
}, { timestamps: true });
export default mongoose.model('RoomUser', roomUserSchema);