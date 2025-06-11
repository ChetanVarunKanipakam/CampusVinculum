import enrollmentModel from "../models/enrollment.model.js";
//enroll student
export const enrollStudent = async (req, res) => {
  try {
    const { userID, courseID } = req.body;
    const newEnroll = new Enrollment({
      userID,
      courseID,
      enrollmentDate: new Date(),
      grade: null
    });
    const saved = await newEnroll.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error enrolling student:', err);
    res.status(500).json({ message: 'Server error during enrollment.' });
  }
};
// updategrade  by userid
export const updateGrade = async (req, res) => {
  try {
    const { userID, courseID } = req.params;
    const { grade } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(courseID)) {
      return res.status(400).json({ message: 'Invalid IDs in request.' });
    }

    const updated = await Enrollment.findOneAndUpdate(
      { userID, courseID },
      { grade },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Enrollment not found.' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating grade:', err);
    res.status(500).json({ message: 'Server error while updating grade.' });
  }
};