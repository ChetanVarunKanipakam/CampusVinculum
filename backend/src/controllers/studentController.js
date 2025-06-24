// controllers/profile.controller.js
import User from "../models/student.model.js"; // assuming skill & achievement are in User
import mongoose from "mongoose";

export const addSkill = async (req, res) => {
 try{
    
  const { id } = req.user; // from auth middleware
  const { skill } = req.body;
  console.log(skill ,id);   
    const user = await User.findOneAndUpdate(
  { userID: new mongoose.Types.ObjectId(String(id)) },
  { $addToSet: { skills: skill} },
  { new: true }
);
  res.json(user.skills);
 }catch(error){
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
 }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.user;
    const { skill } = req.body;
    const user = await User.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(String(id)) },
      { $pull: { skills: skill } },
      { new: true }
    );
    res.json(user.skills);
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ message: "Failed to delete skill" });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.user;
    const { achievement } = req.body;
    const user = await User.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(String(id)) },
      { $pull: { achievements: achievement } },
      { new: true }
    );
    res.json(user.achievements);
  } catch (error) {
    console.error("Delete achievement error:", error);
    res.status(500).json({ message: "Failed to delete achievement" });
  }
};


export const addAchievement = async (req, res) => {
    try{
  const { id } = req.user;
  const { achievement } = req.body;
  const user = await User.findOneAndUpdate(
    { userID: new mongoose.Types.ObjectId(String(id)) },
    { $push: { achievements: achievement } },
    { new: true }
    );
  res.json(user.achievements);
  }catch(error){
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
 }
};

export const getProfile = async (req, res) => {
    try{
  const user = await User.findOne({ userID: new mongoose.Types.ObjectId(String(req.user.id)) },);
  res.json({
    skills: user.skills,
    achievements: user.achievements,
    clubs: user.clubs,
    clubNotifs: user.clubNotifications
  });
  }catch(error){
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
 }
};
