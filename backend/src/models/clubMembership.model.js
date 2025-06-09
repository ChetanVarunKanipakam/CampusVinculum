import mongoose from 'mongoose';

const clubMembershipSchema = new mongoose.Schema({
  clubID: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['Member', 'Coordinator'] },
  joinDate: Date
});

export default mongoose.model('ClubMembership', clubMembershipSchema);
