import eventModel from "../models/event.model.js";
export const addEvent=async(req,res)=>{
    try{
    const { title,description,date,time,venue,organizedBy,clubID}=req.body;
    const newEvent=new eventModel({
        title,description,date: newDate(date),
        time,venue,organizedBy,clubID
    });
    const saved=await newEvent.save();
    res.status(201).json(saved);
}catch(err){
    console.error("Error adding event:",err);
    res.status(500).json({message:'Server error while adding event'});
}
};
// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find()
      .populate('organizedBy', 'name email')
      .populate('clubID', 'name');
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};
// Get events by club ID
export const getEventsByClub = async (req, res) => {
  try {
    const { clubID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
      return res.status(400).json({ message: 'Invalid club ID.' });
    }
    const events = await eventModel.find({ clubID })
      .populate('organizedBy', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching club events:', err);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};