import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import Faculty from '../models/faculty.model.js';
import Admin from '../models/admin.model.js';
import Alumni from '../models/alumini.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fetchRoleData } from '../utils/fetchRoleData.js';
// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: "1d" }
    );
    const roleDetails = await fetchRoleData(user);

    res.status(200).json({ token, user: { ...user.toObject(), roleDetails } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};



// 🔍 Get all users with pagination + search
export const getUsers = async (req, res) => {
  try {
    const { q = '', page = 1, limit = 5 } = req.query;
    const regex = new RegExp(q, 'i');

    const total = await User.countDocuments({ name: regex });
    const items = await User.find({ name: regex })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate({ path: 'departmentID', select: 'name' });

    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate('departmentID', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });

    let roleData = null;

    switch (user.role) {
      case 'Student':
        roleData = await Student.findOne({ userID: user._id })
          .populate('departmentID', 'name')
          .populate('clubs.clubId', 'name');
        break;

      case 'Faculty':
        roleData = await Faculty.findOne({ userID: user._id })
          .populate('departmentID', 'name');
        break;

      case 'Admin':
        roleData = await Admin.findOne({ userID: user._id })
          .populate('departmentID', 'name');
        break;

      case 'Alumni':
        roleData = await Alumni.findOne({ userID: user._id });
        break;

      default:
        return res.status(400).json({ message: 'Invalid user role' });
    }

    res.json({ ...user.toObject(), roleDetails: roleData });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const {
      name, email, password, role, departmentID, profilePicture,
      contactInfo, address, // shared
      rollNumber, year, section, // student
      designation, qualifications, experienceYears, researchInterests, isMentor, // faculty/admin
      graduationYear, currentPosition, company, linkedInProfile // alumni
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role, departmentID, profilePicture, contactInfo });
    await user.save();

    if (role === 'Student') {
      if (!rollNumber || !year || !section || !departmentID) {
        return res.status(400).json({ message: 'Missing student fields' });
      }
      await Student.create({ userID: user._id, rollNumber, year, section, departmentID, address });
    }

    if (role === 'Faculty') {
      if (!designation || !departmentID) {
        return res.status(400).json({ message: 'Missing faculty fields' });
      }
      await Faculty.create({ userID: user._id, departmentID, designation, qualifications, experienceYears, researchInterests, isMentor });
    }

    if (role === 'Admin') {
      if (!designation) {
        return res.status(400).json({ message: 'Missing admin designation' });
      }
      await Admin.create({ userID: user._id, designation, departmentID, officeContact: contactInfo });
    }

    if (role === 'Alumni') {
      await Alumni.create({ userID: user._id, graduationYear, currentPosition, company, linkedInProfile });
    }

    res.status(201).json({ message: 'User and role-based record created', user });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// ✏️ Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// ❌ Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
