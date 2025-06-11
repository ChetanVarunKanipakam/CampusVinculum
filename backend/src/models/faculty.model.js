import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  designation: {
    type: String, // e.g., Assistant Professor, Associate Professor, Professor
    required: true,
  },
  qualifications: {
    type: String, // e.g., "Ph.D. in CSE", "M.Tech in ECE"
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  researchInterests: {
    type: [String], // e.g., ["Machine Learning", "Cybersecurity"]
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
