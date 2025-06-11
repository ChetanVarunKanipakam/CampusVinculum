import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  batch: {
    type: String, // e.g. "2020-2024"
    required: true,
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  mentorshipID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentorship',
  },
  dateOfAdmission: {
    type: Date,
    required: true,
  },
  academicStatus: {
    type: String,
    enum: ['Active', 'Graduated', 'Dropped'],
    default: 'Active',
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
