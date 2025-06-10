import Admin from '../models/admin.model.js';
export const addAdmin = async (req, res) => {
  try {
    const { userID, designation, departmentID, officeContact } = req.body;

    const admin = new Admin({
      userID,
      designation,
      departmentID,
      officeContact,
    });

    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error('Error adding admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAdminDetails = async (req, res) => {
  try {
    const { userID } = req.params;
    const admin = await Admin.findOne({ userID })
      .populate('userID', '-password')
      .populate('departmentID');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (err) {
    console.error('Error fetching admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
