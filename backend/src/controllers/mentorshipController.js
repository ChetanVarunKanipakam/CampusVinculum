import mentorshipModel from "../models/mentorship.model.js";
export const addMentorship=async(requestAnimationFrame, res)=>{
    try{
        const{ aluminiID, studentID,startDate, endDate,status}=req.body;
        const mentorship=new mentorshipModel({aluminiID,studentID,startDate,endDate,status});
        await mentorship.save();
        res.status(200).json({message:"Mentorship successfully added", mentorship});
    }
    catch(error){
        res.status(500).json({message:'Failed to add mentorship',error:error.message});
    }
};
export const removeMentorship = async (req, res) => {
  try {
    const { id } = req.params;
    const mentorship = await mentorshipModel.findByIdAndDelete(id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.json({ message: 'Mentorship removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove mentorship', error: error.message });
  }
};
export const updateMentorshipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const mentorship = await mentorshipModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.json({ message: 'Status updated successfully', mentorship });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};
