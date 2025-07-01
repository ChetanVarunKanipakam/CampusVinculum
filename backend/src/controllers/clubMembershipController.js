import clubMembershipModel from "../models/clubMembership.model.js";
import RoomUser from "../utils/socket.js";
import mongoose from "mongoose";
import clubModel from "../models/club.model.js";
//add membership
export const addMembership = async (req, res) => {
  try {
    const { clubID, user, role } = req.body;
    const newMembership = new clubMembershipModel({
      clubID,
      userID: user,
      role,
      joinDate: new Date()
    });
    const saved = await newMembership.save();
    
    const club = await clubModel.findOne({ _id: clubID });
    await RoomUser.insertOne(
      { room: club.name, username: user },
      { upsert: true }
    );
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error adding membership:', err);
    res.status(500).json({ message: 'Server error while adding membership.' });
  }
};

//fetch all members
export const getMembersByClub = async (req, res) => {
  try {
    const { clubID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
      return res.status(400).json({ message: 'Invalid club ID.' });
    }
    const members = await clubMembershipModel.find({ clubID })
      .populate('userID', 'name email role') // adjust fields as needed
      .select('userID role joinDate');
    res.status(200).json(members);
  } catch (err) {
    console.error('Error fetching club members:', err);
    res.status(500).json({ message: 'Server error while fetching members.' });
  }
};