import clubModel from "../models/club.model.js";
import RoomUser from "../utils/socket.js";
import User from "../models/user.model.js";
import clubMembershipModel from "../models/clubMembership.model.js";
import mongoose from "mongoose";
//add club
export const addClub = async (req, res) => {
  try {
    const { name, description, adminID } = req.body;

    const existingClub = await clubModel.findOne({ name: name.trim() });
    if (existingClub) {
      return res.status(400).json({ message: 'A club with this name already exists.' });
    }

    const user = await User.findById(adminID).populate('departmentID', 'name');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const newClub = new clubModel({
      name: name.trim(),
      description,
      createdDate: new Date(),
      adminID,
    });

    const savedClub = await newClub.save();
    await RoomUser.insertOne(
      { room: 'clubsecretkey' + savedClub._id, username: user.email },
      { upsert: true }
    );
    const newMembership = new clubMembershipModel({
          clubID:  savedClub._id,
          userID: user.email,
          role:"FacultyCoordinator",
          joinDate: new Date()
        });
    const saved = await newMembership.save();
    res.status(201).json(savedClub);

  } catch (error) {
    console.error('Error adding club:', error);
    res.status(500).json({ message: 'Server error while adding club.' });
  }
};

export const getNormalRoomsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const normalRooms = await RoomUser.find({
      username,
      room: { $regex: '^roomsecretkey' }
    }).select('room -_id');

    if (normalRooms.length === 0) {
      return res.status(404).json({ message: 'No normal rooms found for this username.' });
    }

    const roomNames = normalRooms.map((entry) => entry.room);
    res.status(200).json({ normalRooms: roomNames });
  } catch (error) {
    console.error('Error fetching normal rooms:', error);
    res.status(500).json({ message: 'Server error while fetching normal rooms.' });
  }
};

export const getClubByName = async (req, res) => {
  const { name } = req.params;

  try {
    const club = await clubModel.findOne({ name });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  } catch (error) {
    console.error('Error fetching club by name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getClubRoomsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Step 1: Get club-related room entries
    const clubRoomEntries = await RoomUser.find({
      username,
      room: { $regex: '^clubsecretkey' }
    }).select('room -_id');

    if (clubRoomEntries.length === 0) {
      return res.status(200).json({ clubs:[] });
    }

    // Step 2: Extract club IDs by stripping the prefix
    const clubIds = clubRoomEntries.map(entry =>
      entry.room.replace('clubsecretkey', '')
    );

    // Step 3: Validate ObjectIds (optional)
    const validClubObjectIds = clubIds.filter(id => mongoose.Types.ObjectId.isValid(id));

    // Step 4: Fetch full club details
    const clubs = await clubModel.find({ _id: { $in: validClubObjectIds } });

    res.status(200).json({ clubs });
  } catch (error) {
    console.error('Error fetching club details:', error);
    res.status(500).json({ message: 'Server error while fetching clubs' });
  }
};

//get all clubs
export const getAllClubs=async(req,res)=>{
    try{
        const clubs=await clubModel.find();
        res.status(200).json(clubs);
    }
    catch (error) {
    console.error('Error retrieving clubs:', error);
    res.status(500).json({ message: 'Server error while retrieving clubs.' });
  }
};