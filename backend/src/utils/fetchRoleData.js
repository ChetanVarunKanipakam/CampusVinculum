// utils/fetchRoleData.js
import Student from '../models/student.model.js';
import Faculty from '../models/faculty.model.js';
import Admin from '../models/admin.model.js';
import Alumni from '../models/alumini.model.js';

export const fetchRoleData = async (user) => {
  switch (user.role) {
    case 'Student':
      return await Student.findOne({ userID: user._id })
        .populate('departmentID', 'name')
        .populate('clubs', 'name');
    case 'Faculty':
      return await Faculty.findOne({ userID: user._id })
        .populate('departmentID', 'name');
    case 'Admin':
      return await Admin.findOne({ userID: user._id })
        .populate('departmentID', 'name');
    case 'Alumni':
      return await Alumni.findOne({ userID: user._id });
    default:
      return null;
  }
};
