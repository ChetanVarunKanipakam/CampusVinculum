import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  venue: String,
  organizedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clubID: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
});

export default mongoose.model('Event', eventSchema);
