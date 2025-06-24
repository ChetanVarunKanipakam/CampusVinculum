import Department from '../models/department.model.js';

// 🔍 Get departments with pagination & search
export const getDepartments = async (req, res) => {
  try {
    const { q = '', page = 1, limit = 5 } = req.query;
    const regex = new RegExp(q, 'i');

    const total = await Department.countDocuments({ name: regex });
    const items = await Department.find({ name: regex })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments', error: error.message });
  }
};

// ➕ Add department
export const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Department already exists' });

    const dept = new Department({ name, description });
    await dept.save();
    res.status(201).json({ message: 'Department added successfully', department: dept });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add department', error: error.message });
  }
};

// ✏️ Update department description
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updated = await Department.findByIdAndUpdate(id, { description }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Department not found' });

    res.json({ message: 'Department updated', department: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// ❌ Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};
