
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  clubs: {type:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
    }  
  ],
  default:[]},
  skills: {
    type: [String],
    default: [],
  },
  achievements: {
    type: [String],
    default: [],
  },
  clubNotifications: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  address: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Student', studentSchema);
