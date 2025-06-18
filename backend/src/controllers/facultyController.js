import Faculty from '../models/faculty.model.js'; // Adjust the path as needed

// Add Faculty (POST)
export const addFaculty = async (req, res) => {
  try {
    const {
      userID,
      departmentID,
      designation,
      qualifications,
      experienceYears,
      researchInterests,
      isMentor
    } = req.body;

    const newFaculty = new Faculty({
      userID,
      departmentID,
      designation,
      qualifications,
      experienceYears,
      researchInterests,
      isMentor
    });

    const savedFaculty = await newFaculty.save();
    res.status(201).json(savedFaculty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add faculty', details: err.message });
  }
};

// Get All Faculty Details (GET)
export const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find()
      .populate('userID', 'name email')           // Populating User fields
      .populate('departmentID', 'name code');     // Populating Department fields

    res.status(200).json(facultyList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get faculty details', details: err.message });
  }
};
