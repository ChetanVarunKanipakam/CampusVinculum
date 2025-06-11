import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true, // e.g., Registrar, Director, HOD
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  officeContact: {
    type: String,
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
