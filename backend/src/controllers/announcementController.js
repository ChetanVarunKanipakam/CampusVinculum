import announcementModel from "../models/announcement.model.js";
import mongoose from "mongoose";
//create announcement
export const createAnnouncement=async(req,res)=>{
   
  const {id}=req.user;
   try{
    console.log({...req.body,
        postedBy: new mongoose.Types.ObjectId(String(id)),
        postedDate: new Date(),
        modifiedDate: new Date()
    })
     const ann=await announcementModel.create({...req.body,
        postedBy: id,
        postedDate: new Date(),
        modifiedDate: new Date()
    });
    res.status(201).json(ann);
}
catch(err){
res.status(400).json({error:err.message});
}
};

//update announcement
export const updateAnnouncement=async(req,res)=>{
    try{
        const updated=await announcementModel.findByIdAndUpdate(req.params.id,
            {...req.body,
                modifiedDate: new Date()},
                {new:true}
        );
        if(!updated)
            return res.status(404).json({error:'Not found'});
        res.json(updated);
    } catch(err){
        res.status(400).json({error:err.message});
    }
};
//fetch all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const list = await announcementModel.find()
      .populate('postedBy', 'name email')
      .sort({ postedDate: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//fetch announcement by role
export const getAnnouncementsByRole=async(req,res)=>{
    const {role}=req.params;
    if (!['Student','Faculty','Admin','Alumni'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  try {
    const list = await announcementModel.find({ targetAudience: role })
      .populate('postedBy', 'name email')
      .sort({ postedDate: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};