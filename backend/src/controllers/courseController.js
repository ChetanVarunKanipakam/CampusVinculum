import courseModel from "../models/course.model.js";
//add course
export const addCourse = async (req, res) => {
  try {
    const { title, description, credits, departmentID } = req.body;

    const newCourse = new courseModel({
      title,
      description,
      credits,
      departmentID
    });
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ message: 'Server error while adding course.' });
  }
};
// Get all courses by department ID
export const getCoursesByDept = async (req, res) => {
  try {
    const { departmentID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(departmentID)) {
      return res.status(400).json({ message: 'Invalid department ID.' });
    }
    const courses = await courseModel.find({ departmentID });
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses by department:', err);
    res.status(500).json({ message: 'Server error while getting courses.' });
  }
};
//update credits
export const updateCredits = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { credits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const updated = await courseModel.findByIdAndUpdate(
      courseID,
      { $set: { credits } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating credits:', err);
    res.status(500).json({ message: 'Server error while updating credits.' });
  }
};